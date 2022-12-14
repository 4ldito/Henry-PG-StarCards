const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");
const routes = require("./routes/index");
const cors = require("cors");

const server = express();

// server.name = 'API';

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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
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

module.exports = server;
