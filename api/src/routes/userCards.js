const { Router } = require("express");
const db = require("../db");

const { UserCards } = db;
const userCardsRoute = Router();

userCardsRoute.post("/usercard", async (req, res, next) => {
  const { cardId, userId } = req.body;
  let userCard, addUserCard;
  try {
    userCard = await UserCards.create();
    addUserCard = [
      await userCard.setStatus("active"),
      await userCard.setUser(userId),
      await userCard.setCard(cardId),
    ];

    await Promise.all(addUserCard);

    return res.send(userCard);
  } catch (error) {
    return next(error);
  }
});

module.exports = userCardsRoute;
