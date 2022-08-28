const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");
const routes = require("./routes/index");
const cors = require("cors");

const server = express();
const socketIoServer = require("http").createServer(server);

const io = require("socket.io")(socketIoServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
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
    const msg = emitter.username + ": " + message,
      emitterId = emitter.id;
    const currentReceiver = userSockets.find((u) => u.userId === receiver.id);
    if (currentReceiver)
      io.to(currentReceiver.socket).emit("privateMessage", emitterId, msg);

    const currentUser = userSockets.find((u) => u.userId === emitter.id);
    io.to(currentUser.socket).emit("privateMessage", emitterId, msg);

    await axios.patch("chat", {
      emiterId: emitter.id,
      receiverId: reveicer.id,
      msg,
    });

    const receiverNotificationSocket = usersNotificationSocket.find(
      (u) => u.userId === receiver.id
    );
    const notificationFlag = true;
    io.to(receiverNotificationSocket).emit(
      "chatNotification",
      notificationFlag
    );
  });

  ///////////////////////////////////////////////////////////////////////////////
  // PUBLIC CHAT
  let nombre;

  socket.on("conectado", (nomb) => {
    nombre = nomb;
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      socketIoServer: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  });
});

//////////////////////////////////////

// server.name = 'API';
// TENEMOS QUE CREARLE LA CATEGORIA HATER PARA FRANCO
server.use(
  cookieSession({
    name: "session",
    keys: ["secretKey"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(cors());
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  return next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, _req, res, _next) => {
  const status = err.status !== undefined ? err.status : 500;
  const message = err.message !== undefined ? err.message : err;
  console.error(err);
  res.status(status).json({ message });
});

module.exports = socketIoServer;
