const server = require("./app");
// const axios = require("axios");

const socketIoServer = require("http").createServer(server);

const db = require("./db");
const { User, PrivateChat, Message } = db;

const io = require("socket.io")(socketIoServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

let userSockets = [];
let usersNotificationSocket = [];

//Funcionalidad de socket.io en el socketIoServer
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

  ///////////////////////////////////////////////////////////////////////////////
  // PUBLIC CHAT
  let nombre;

  socket.on("conectado", (nomb) => {
    nombre = nomb;
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: ` ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje) => {
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    if (nombre)
      io.emit("mensajes", {
        socketIoServer: "Servidor",
        mensaje: `${nombre} ha abandonado la sala`,
      });
  });
});

module.exports = socketIoServer;
