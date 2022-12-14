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

cardsRoute.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const card = await Card.findOne({ where: { id } });
    return res.json(card);
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

cardsRoute.post("/", async(req,res, next)=>{
  const {name, Gdmg, Admg, life, ability, abilities, race, cost, movement, image} = req.body;
  //name:name.charAt(0).toUpperCase()+name.slice(1);
  try {
    const newCard = await Card.create({
      name,
      Gdmg,
      Admg,
      life,
      ability,
      abilities,
      race,
      cost,
      movement,
      image
    });
    newCard.setStatus("active");
    return res.status(201).send(newCard);
  } catch (error) {
    return next(error)
  }
})


module.exports = cardsRoute;
