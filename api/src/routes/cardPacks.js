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
    const { data } = req.body;
    // console.log(data)
    // const packsId = data.map((elem) => CardPacks.findByPk(elem.pack));
    // const allPacks = await Promise.all(packsId);

    // // console.log(allPacks)
    // const infoPurchase = []
    const info = {};
    for (const p of data) {
      const { pack } = p;
      info[pack.name] = { quantity: pack.quantity }
      if (pack.stock < pack.quantity) return res.send({ error: 'Stock insuficente' });
      pack.subTotal = pack.quantity * pack.price;
    }

    const total = data.reduce(
      (acc, currentValue) => acc + currentValue.pack.subTotal,
      0
    );
    const [user] = await Promise.all([User.findOne()])

    if (user.stars < total) return res.send({ error: 'Stars insuficientes!' });

    user.stars = user.stars - total;

    const packsId = data.map((elem) => CardPacks.findByPk(elem.pack.id));
    const packs = await Promise.all(packsId);
    const updatedPacks = packs.map(pack => {
      pack.stock = pack.stock - info[pack.name].quantity;
      return pack.save();
    });

    const updatedInfo = await Promise.all([user.save(), ...updatedPacks]);
    
    return res.send({ msg: `Compra realizada correctamente. Total: ${total}`, updatedInfo });
  } catch (error) {
    console.log(error)
    return res.send(error)
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
