const server = require("./app");

const socketIoServer = require("http").createServer(server);

const io = require("socket.io")(socketIoServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

const db = require("./db");
const { User, Deck } = db;

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
      const [player, deck] = await User.findOne({
        where: { id: playerId },
        attributes: ["id", "defaultDeck"],
      }).then(async (player) => {
        const deck = await Deck.findByPk(player.defaultDeck);
        return [player, deck];
      });

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
      console.error(error);
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
});

module.exports = socketIoServer;
