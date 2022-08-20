const { Router } = require("express");
const db = require("../db");

const { UserCards } = db;
const userCardsRoute = Router();

userCardsRoute.post("/", async (req, res, next) => {
  const { cardId, userId } = req.body;

  try {
    const userCard = await UserCards.create();
    const addUserCard = [
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

// Get user cards:
// all from /userCards
// query ?userId and/or ?statusId to filter
userCardsRoute.get("/", async (req, res, next) => {
  const { userId, statusId } = req.query;
  const findConfig =
    userId && statusId
      ? {
          where: { UserId: userId, StatusId: statusId },
        }
      : userId
      ? { where: { UserId: userId } }
      : { where: { StatusId: statusId } };
  try {
    const cards = await UserCards.findAll(
      userId || statusId ? findConfig : undefined
    );
    return res.send(cards);
  } catch (error) {
    return next(error);
  }
});

module.exports = userCardsRoute;
