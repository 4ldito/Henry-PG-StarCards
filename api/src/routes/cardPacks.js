/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");

const { CardPacks, User } = db;
const packsRoute = Router();

packsRoute.get("/all", async (req, res, next) => {
  try {
    const packs = await CardPacks.findAll();
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

packsRoute.post('/buy', async (req, res, next) => {
  // const user = await User.findOne() // user hardcodeado x ahora jeje
  try {
    const { id, quantity } = req.body;
    // const pack = await CardPacks.findByPk(id);
    const [user, pack] = await Promise.all([User.findOne(), CardPacks.findByPk(id)])
    const total = quantity * pack.price;

    if (user.stars < total) return res.send({ error: 'stars insuficientes!!!!!!!!!!!!!' });
    if (pack.stock < quantity ) return res.send({error: 'Stock insuficente'})

    user.stars = user.stars - total;
    pack.stock = pack.stock - quantity;
    await Promise.all([user.save(), pack.save()])
  
    res.send({ msg: `Compraste ${quantity} del pack ${pack.name} correctamente` });
  } catch (error) {
    console.log(error)
    res.send(error)
  }

});

packsRoute.get("/:status", async (req, res, next) => {
  const { status } = req.params;
  try {
    const packs = await CardPacks.findAll({
      where: { StatusId: status },
    });
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

module.exports = packsRoute;
