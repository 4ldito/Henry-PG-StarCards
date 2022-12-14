const { Router } = require("express");
const db = require("../db");
const axios = require("axios");
require("dotenv").config();

const { CardPacks, User, Card, Transaction, ShopCart } = db;
const packsRoute = Router();

const url = process.env.URL_BACK || "http://localhost:3001";

packsRoute.get("/all", async (req, res, next) => {
  try {
    const packs = await CardPacks.findAll();
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

packsRoute.get("/:status", async (req, res, next) => {
  const { status } = req.params;
  try {
    const packs = await CardPacks.findAll({
      where: { StatusId: status },
      order: [["price", "ASC"]],
    });
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

packsRoute.post("/", async (req, res, next) => {
  let { name, amount, price, stock, race, cards, image } = req.body;
  console.log(req.body);
  try {
    const newpack = await CardPacks.create({
      name,
      amount,
      price,
      stock,
      race,
      image,
      cards,
    });
    newpack.setStatus("active");
    return res.status(201).send(newpack);
  } catch (error) {
    return next(error);
  }
});

packsRoute.patch("/buy", async (req, res, next) => {
  try {
    const { data, userId, clearShopcart } = req.body;

    const info = {};

    for (const pack of data) {
      info[pack.name] = { quantity: pack.quantity };
      if (pack.stock < pack.quantity)
        return res.send({ error: "Not enough stock!" });
      pack.subTotal = pack.quantity * pack.price;
    }

    const total = data.reduce(
      (acc, currentValue) => acc + currentValue.subTotal,
      0
    );

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    const transaction = await Transaction.create({
      type: "stars",
      priceStars: total,
    });
    await Promise.all([
      transaction.setUser(userId),
      transaction.setStatus("active"),
    ]);

    if (clearShopcart)
      await ShopCart.destroy({
        where: { UserId: userId, packTypes: "cardsPack" },
      });

    if (user.stars < total)
      return res.send({ error: "You dont have enough stars!" });

    user.stars = user.stars - total;

    const packsId = data.map((elem) => CardPacks.findByPk(elem.id));
    const packs = await Promise.all(packsId);
    const updatedPacks = packs.map((pack) => {
      pack.stock = pack.stock - info[pack.name].quantity;
      transaction.addCardPacks(pack.id);
      return pack.save();
    });

    let updatedInfo = await Promise.all([user.save(), ...updatedPacks]);
    const updatedUser = updatedInfo.shift();

    const cardsPerPack = await Promise.all(
      updatedInfo.map(async (cardPack) => {
        let chosenArray = [];

        while (info[cardPack.name].quantity !== 0) {
          let acc = 0;
          const probabilityArray = cardPack.cards.map((card) => {
            acc = acc + Number(card[1]);
            return acc;
          });

          let chosenCardIndex = probabilityArray.length - 1;
          for (let i = 0; i < cardPack.amount; i++) {
            const prob = Math.random();

            for (let j = probabilityArray.length - 1; j >= 0; j--) {
              if (prob < probabilityArray[j]) chosenCardIndex = j;
            }
            const chosenCardName = cardPack.cards[chosenCardIndex][0];
            chosenArray.push(
              Card.findOne({
                where: { name: chosenCardName, StatusId: "active" },
              })
            );
          }

          info[cardPack.name].quantity--;
        }
        return Promise.all(chosenArray);
      })
    );

    let cardsId = [];
    cardsPerPack.forEach((cardPack) => {
      cardPack.forEach((card) => {
        cardsId.push(card.id);
      });
    });

    await axios.post(`${url}/userCards`, { userId: updatedUser.id, cardsId });
    return res.send({
      msg: `Purchase completed successfully. Total: ${total}`,
      updatedInfo,
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

packsRoute.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { StatusId, stock } = req.body;

  try {
    const pack = await CardPacks.findByPk(id);

    if (!pack) return res.status(404).send({ error: "pack not found" });

    await pack.update({
      StatusId,
      stock,
    });
    res.json(pack);
  } catch (error) {
    next(error);
  }
});

module.exports = packsRoute;
