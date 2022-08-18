/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");
const { StarsPack } = db;

const starsPackRoute = Router();

const getAllStarsPack = async () => {
  const allPacksDB = await StarsPack.findAll();
  return allPacksDB;
};

starsPackRoute.get("/all", async (req, res, next) => {
  try {
    const packs = await getAllStarsPack();
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

starsPackRoute.get("/:status", async (req, res, next) => {
  const { status } = req.params;
  try {
    const packs = await getAllStarsPack({ where: { StatusId: status } });
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

module.exports = starsPackRoute;
