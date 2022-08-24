//Servidor con express
const express = require("express");
const http = require("http");
const server = express();
const socketIoServer = http.createServer(server);
const cors = require("cors");

//Inicializamos socketio
const socketio = require("socket.io");
const io = socketio(socketIoServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.use(cors());

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

// Error catching endware.
server.use((err, _req, res, _next) => {
  const status = err.status !== undefined ? err.status : 500;
  const message = err.message !== undefined ? err.message : err;
  console.error(err);
  res.status(status).json({ message });
});

//Funcionalidad de socket.io en el socketIoServer
io.on("connection", (socket) => {
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

// socketIoServer.listen(5000, () => console.log("Servidor inicializado"));

module.exports = socketIoServer;
