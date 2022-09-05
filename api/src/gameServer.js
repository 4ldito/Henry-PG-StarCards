const server = require("./app");

const socketIoServer = require("http").createServer(server);

const io = require("socket.io")(socketIoServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

const db = require("./db");
const { User, Deck, Card, Game } = db;

const gameFunction = require("./controllers/gameFunction");

let playersQueue = [];
let userSockets = [];
let usersNotificationSocket = [];

io.on("gameConnection", (socket) => {
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
    const currentUser = userSockets.findIndex((u) => u.userId === userId);

    if (currentUser === -1) userSockets.push({ userId, socket: socket.id });
    else userSockets[currentUser].socket = socket.id;
  });

  socket.on("disconnectGameSocket", (userId) => {
    const newArray = userSockets.filter((u) => u.userId !== userId);
    userSockets = [...newArray];
  });

  socket.on("playRequest", async (playerId) => {
    try {
      let [p1, p2] = [],
        [p1Socket, p2Socket] = [],
        [p1Deck, p2Deck] = [];

      const newPlayer = await User.findOne({
        where: { id: playerId },
        attributes: ["id", "onGame", "defaultDeck"],
      });

      if (!newPlayer.onGame) {
        await newPlayer.update({ onGame: true });
        playersQueue.push(newPlayer);

        if (playersQueue.length >= 2) {
          [p1, p2] = [playersQueue.shift(), playersQueue.shift()];
          [p1Socket, p2Socket] = [
            userSockets.find((e) => e.userId === p1.id)?.socket,
            userSockets.find((e) => e.userId === p2.id)?.socket,
          ];
          [p1Deck, p2Deck] = await Promise.all([
            Deck.findOne({
              where: { id: p1.defaultDeck },
              include: [{ model: Card }, { model: User }],
            }),
            Deck.findOne({
              where: { id: p2.defaultDeck },
              include: [{ model: Card }, { model: User }],
            }),
          ]);

          function gameExe(p1Deck, p2Deck) {
            return new Promise((resolve, reject) => {
              const gameInfo = gameFunction(p1Deck, p2Deck);
              gameInfo.player1 = { userId: p1.id, race: p1Deck[0].race };
              gameInfo.player2 = { userId: p2.id, race: p2Deck[0].race };
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
