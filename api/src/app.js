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
