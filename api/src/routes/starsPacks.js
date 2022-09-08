/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const sequelize = require("sequelize");
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
    const packs = await StarsPack.findAll({ where: { StatusId: status }, order: [['price', 'ASC']] });
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

starsPackRoute.patch("/:id", async (req, res, next) => {
  console.log(req.body)
  const { id } = req.params;
  const { StatusId, price, stars, name } = req.body;

  try {
    const pack = await StarsPack.findByPk(id);
    
    if (!pack) return res.status(404).send({ error: "pack not found" });

    await pack.update({
      StatusId,
      price,
      stars,
      name
    });
    res.json(pack);
    
  } catch (error) {
      next(error)
  }
})
module.exports = starsPackRoute;
