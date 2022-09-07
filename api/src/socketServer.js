const server = require("./app");

const socketIoServer = require("http").createServer(server);

const db = require("./db");
const { User, Deck, UserCards, Card, Game, PrivateChat, Message } = db;

const io = require("socket.io")(socketIoServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const gameFunction = require("./controllers/gameFunction");

let userSockets = [];
let usersNotificationSocket = [];

let playersQueue = [];
let gameUserSockets = [];
// let gameUsersNotificationSocket = [];

io.on("connection", (socket) => {
  //////////////////////////////////////////////
  // Chat notifications
  socket.on("connectUserNotifications", (userId) => {
    const currentUser = usersNotificationSocket.findIndex(
      (u) => u.userId === userId
    );

    if (currentUser === -1)
      usersNotificationSocket.push({ userId, sockets: [socket.id] });
    else usersNotificationSocket[currentUser].sockets = [socket.id];
  });

  socket.on("disconnectUserNotifications", (userId) => {
    const newArray = usersNotificationSocket.filter((u) => u.userId !== userId);
    usersNotificationSocket = [...newArray];
  });

  ////////////////////////////////////////////////
  // Private chats
  socket.on("connectPrivateSocket", (userId) => {
    const currentUser = userSockets.findIndex((u) => u.userId === userId);

    if (currentUser === -1) userSockets.push({ userId, socket: socket.id });
    else userSockets[currentUser].socket = socket.id;
  });

  socket.on("disconnectPrivateSocket", (userId) => {
    const newArray = userSockets.filter((u) => u.userId !== userId);
    userSockets = [...newArray];
  });

  socket.on("privateMessage", async (emitter, receiver, message) => {
    // await axios.post("chat/db", { emitter, receiver, message });
    try {
      const [emitterProm, receiverProm, messageProm] = await Promise.all([
        User.findOne({
          where: { id: emitter.id },
          include: [
            {
              model: PrivateChat,
              include: User,
            },
          ],
        }),
        User.findOne({
          where: { id: receiver.id },
          include: [
            {
              model: PrivateChat,
              include: User,
            },
          ],
        }),
        Message.create({ message, emitter }),
      ]);

      let privChat = emitterProm.PrivateChats.find(
        (pc) =>
          pc.Users.find((u) => u.id === emitter.id) &&
          pc.Users.find((u) => u.id === receiver.id)
      );

      if (privChat) await privChat.addMessage(messageProm);
      else {
        privChat = await PrivateChat.create({
          lastSeen: [
            { user: emitter.id, msgNum: 0 },
            { user: receiver.id, msgNum: 0 },
          ],
        });
        await privChat.addMessage(messageProm);
        await Promise.all([
          emitterProm.addPrivateChat(privChat),
          receiverProm.addPrivateChat(privChat),
        ]);
      }

      const currentReceiver = userSockets.find((u) => u.userId === receiver.id);
      if (currentReceiver)
        io.to(currentReceiver.socket).emit(
          "privateMessage",
          emitter,
          message,
          privChat.id
        );

      // const currentUser = userSockets.find((u) => u.userId === emitter.id);
      // io.to(currentUser.socket).emit(
      //   "privateMessage",
      //   receiver,
      //   message,
      //   privChat.id
      // );
    } catch (error) {
      console.error("StarCards error: " + error);
    }

    const receiverNotificationSocket = usersNotificationSocket.find(
      (u) => u.userId === receiver.id
    );

    if (receiverNotificationSocket?.sockets[0])
      io.to(receiverNotificationSocket.sockets[0]).emit(
        "chatNotification",
        true
      );
    else {
      const receiverUser = await User.findByPk(receiver.id);
      if (receiverUser) await receiverUser.update({ notifications: true });
    }
  });

  ///////////////////////////////////////////////////////////////////////////////
  // PUBLIC CHAT
  // let userName;

  // socket.on("connectPublicChat", (username) => {
  //   userName = username;
  //   socket.broadcast.emit("messages", {
  //     username,
  //     message: ` has joined the room.`,
  //   });
  // });

  socket.on("publicMessage", (username, message) => {
    io.emit("messages", { username, message });
  });

  // socket.on("disconnect", () => {
  //   if (userName)
  //     io.emit("messages", {
  //       socketIoServer: "Server",
  //       message: `${userName} has left the room.`,
  //     });
  // });

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  // GAME
  ///////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////
  // // Game notifications
  // socket.on("connectPlayerNotifications", (userId) => {
  //   const currentUser = usersNotificationSocket.findIndex(
  //     (u) => u.userId === userId
  //   );

  //   if (currentUser === -1)
  //     usersNotificationSocket.push({ userId, sockets: [socket.id] });
  //   else usersNotificationSocket[currentUser].sockets = [socket.id];
  // });

  // socket.on("disconnectPlayerNotifications", (userId) => {
  //   const newArray = usersNotificationSocket.filter((u) => u.userId !== userId);
  //   usersNotificationSocket = [...newArray];
  // });

  ////////////////////////////////////////////////
  // Game
  socket.on("connectGameSocket", (userId) => {
    const currentUser = gameUserSockets.findIndex((u) => u.userId === userId);

    if (currentUser === -1) gameUserSockets.push({ userId, socket: socket.id });
    else gameUserSockets[currentUser].socket = socket.id;
  });

  socket.on("disconnectGameSocket", (userId) => {
    const newArray = gameUserSockets.filter((u) => u.userId !== userId);
    gameUserSockets = [...newArray];
  });

  socket.on("playRequest", async (playerId) => {
    try {
      let [p1, p2] = [],
        [p1Socket, p2Socket] = [],
        [p1Deck, p2Deck] = [{}, {}];

      const newPlayer = await User.findOne({
        where: { id: playerId },
        attributes: ["id", "username", "onGame", "defaultDeck"],
      });

      if (!newPlayer.onGame) {
        await newPlayer.update({ onGame: true });
        playersQueue.push(newPlayer);

        if (playersQueue.length >= 2) {
          [p1, p2] = [playersQueue.shift(), playersQueue.shift()];
          [p1Socket, p2Socket] = [
            gameUserSockets.find((e) => e.userId === p1.id)?.socket,
            gameUserSockets.find((e) => e.userId === p2.id)?.socket,
          ];

          let [p1DeckC, p2DeckC] = await Promise.all([
            Deck.findOne({
              where: { id: p1.defaultDeck },
              include: [
                { model: UserCards, include: [{ model: Card }] },
                { model: User },
              ],
            }),
            Deck.findOne({
              where: { id: p2.defaultDeck },
              include: [
                { model: UserCards, include: [{ model: Card }] },
                { model: User },
              ],
            }),
          ]);

          let [p1DeckP, p2DeckP] = await Promise.all([
            Promise.all(p1DeckC.UserCards.map((c) => Card.findByPk(c.CardId))),
            Promise.all(p2DeckC.UserCards.map((c) => Card.findByPk(c.CardId))),
          ]);

          [p1Deck.id, p2Deck.id] = [p1DeckC.id, p2DeckC.id];
          [p1Deck.userId, p2Deck.userId] = [p1.id, p2.id];

          [p1Deck.cards, p2Deck.cards] = [
            p1DeckP.map((c) => c.dataValues),
            p2DeckP.map((c) => c.dataValues),
          ];

          function gameExe(p1Deck, p2Deck) {
            return new Promise((resolve, reject) => {
              const gameInfo = gameFunction(p1Deck, p2Deck);
              gameInfo.player1 = {
                userId: p1.id,
                username: p1.username,
                race: p1Deck.cards[0].race,
              };
              gameInfo.player2 = {
                userId: p2.id,
                username: p2.username,
                race: p2Deck.cards[0].race,
              };
              resolve(gameInfo);
            });
          }

          gameExe(p1Deck, p2Deck).then(async (gameInfo) => {
            const game = await Game.create({ info: gameInfo });

            await Promise.all([
              Promise.all([p1.addGame(game), p2.addGame(game)]),
              Promise.all([
                p1.update({ onGame: false }),
                p2.update({ onGame: false }),
              ]),
            ]);

            if (p1Socket) io.to(p1Socket).emit("gameResults", "Game finished");
            if (p2Socket) io.to(p2Socket).emit("gameResults", "Game finished");
          });
        }
      }
    } catch (error) {
      console.error("StarCards error: " + error);
    }
  });
});

module.exports = socketIoServer;
