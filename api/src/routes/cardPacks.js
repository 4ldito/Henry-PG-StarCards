/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");

const { cardPacks } = db;
const packsRoute = Router();

packsRoute.get("/all", async (req, res, next) => {
  try {
    const packs = await cardPacks.findAll();
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

packsRoute.get("/:status", async (req, res, next) => {
  const { status } = req.params;
  try {
    const packs = await cardPacks.findAll({
      where: { StatusId: status },
    });
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

module.exports = packsRoute;
