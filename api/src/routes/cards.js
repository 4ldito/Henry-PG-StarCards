/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");

const { Card } = db;
const cardsRoute = Router();

cardsRoute.get("/all", async (req, res, next) => {
  try {
    const cards = await Card.findAll();
    return res.send(cards);
  } catch (error) {
    return next(error);
  }
});

cardsRoute.get("/:status", async (req, res, next) => {
  const { status } = req.params;
  try {
    const cards = await Card.findAll({ where: { StatusId: status } });
    return res.send(cards);
  } catch (error) {
    return next(error);
  }
});

module.exports = cardsRoute;
