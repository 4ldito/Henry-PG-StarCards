/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");

const { Opinion, User, Card } = db;
const opinionRoute = Router();

// GET OPINION CARTA
opinionRoute.get("/all", async (req, res, next) => {
  try {
    const opinions = await Opinion.findAll();
    return res.send(opinions);
  } catch (error) {
    return next(error);
  }
});

opinionRoute.get("/:cardId", async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const opinions = await Opinion.findAll({
      where: { CardId: cardId },
      include: User,
    });

    return res.json(opinions);
  } catch (error) {
    return next(error);
  }
});

opinionRoute.get("/:status", async (req, res, next) => {
  const { status } = req.params;
  try {
    const opinions = await Opinion.findAll({ where: { StatusId: status } });
    return res.send(opinions);
  } catch (error) {
    return next(error);
  }
});

// POST Opinion
opinionRoute.post("/", async (req, res, next) => {
  try {
    let { comment, score, userId, cardId } = req.body;

    const [newOpinion, opinionUser, opinionCard] = await Promise.all([
      Opinion.create({
        comment,
        score,
      }),
      User.findOne({
        where: {
          id: userId,
        },
      }),
      Card.findOne({
        where: {
          id: cardId,
        },
      }),
    ]);

    await Promise.all([
      newOpinion.setUser(opinionUser.id),
      newOpinion.setCard(opinionCard.id),
      newOpinion.setStatus("active"),
    ]);

    res.status(200).json({ msg: "Opinion posted" });
  } catch (error) {
    next(error);
  }
});

// PUT Opinion
opinionRoute.patch("/", async (req, res, next) => {
  try {
    let { comment, score, userId, cardId } = req.body;

    const opinion = await Opinion.findOne({
      where: {
        UserId: userId,
        CardId: cardId,
      },
    });

    await opinion.update({ comment, score });

    res.status(200).json({ msg: "Opinion modified" });
  } catch (error) {
    next(error);
  }
});

// PATCH
module.exports = opinionRoute;
