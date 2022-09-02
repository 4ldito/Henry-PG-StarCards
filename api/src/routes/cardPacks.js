const { Router } = require("express");
const db = require("../db");
const axios = require('axios');

const { CardPacks, User, Card, Transaction } = db;
const packsRoute = Router();

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
    });
    return res.send(packs);
  } catch (error) {
    return next(error);
  }
});

packsRoute.post('/', async(req,res,next)=>{
  const {name, amount, price, stock, race, cards, image} = req.body;
  try {
    if (name) {
      const ispack = await CardPacks.findOne({where: {name}});
      if (ispack) {
        return res.status(404).send('no jodas xD exist')
      }
      if(!ispack){
        const newpack = await CardPacks.findOrCreate(
          {where:{
          name,
          amount,
          price,
          stock,
          race,
          image,
          cards
        }});
        return res.status(201).send(newpack)
      }
      return res.status(404).send('name exist');
    }
    
  } catch (error) {
    return next(error);
  }
})


packsRoute.patch('/buy', async (req, res, next) => {
  try {
    const { data, userId } = req.body;

    const info = {};

    for (const pack of data) {
      info[pack.name] = { quantity: pack.quantity }
      if (pack.stock < pack.quantity) return res.send({ error: 'Stock insuficente' });
      pack.subTotal = pack.quantity * pack.price;
    }

    const total = data.reduce((acc, currentValue) => acc + currentValue.subTotal, 0);

    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

    const transaction = await Transaction.create({ type: 'stars', priceStars: total });
    await Promise.all([transaction.setUser(userId), transaction.setStatus('active')]);

    if (user.stars < total) return res.send({ error: 'Stars insuficientes!' });

    user.stars = user.stars - total;

    const packsId = data.map((elem) => CardPacks.findByPk(elem.id));
    const packs = await Promise.all(packsId);
    const updatedPacks = packs.map(pack => {
      pack.stock = pack.stock - info[pack.name].quantity;
      transaction.addCardPacks(pack.id);
      return pack.save();
    });

    let updatedInfo = await Promise.all([user.save(), ...updatedPacks]);
    const updatedUser = updatedInfo.shift();

    const cardsPerPack = await Promise.all(updatedInfo.map(async (cardPack) => {
      let chosenArray = [];

      while (info[cardPack.name].quantity !== 0) {
        let acc = 0;
        const probabilityArray = cardPack.cards.map((card) => {
          acc = acc + Number(card[1]);
          return acc;
        })

        let chosenCardIndex = probabilityArray.length - 1;
        for (let i = 0; i < cardPack.amount; i++) {
          const prob = Math.random();

          for (let j = probabilityArray.length - 1; j >= 0; j--) {
            if (prob < probabilityArray[j]) chosenCardIndex = j;
          }
          const chosenCardName = cardPack.cards[chosenCardIndex][0];
          chosenArray.push(Card.findOne({ where: { name: chosenCardName, StatusId: "active" } }));
        }

        info[cardPack.name].quantity--;
      }
      return Promise.all(chosenArray);
    }))

    let cardsId = []
    cardsPerPack.forEach(cardPack => {
      cardPack.forEach(card => {
        cardsId.push(card.id)
      })
    });

    await axios.post('http://localhost:3001/userCards', { userId: updatedUser.id, cardsId });
    return res.send({ msg: `Compra realizada correctamente. Total: ${total}`, updatedInfo, updatedUser });
  } catch (error) {
    console.error(error)
    return res.send(error)
  }

});

module.exports = packsRoute;
