const { Router } = require("express");
const db = require("../db");

const { UserCards } = db;
const userCardsRoute = Router();

userCardsRoute.post("/", async (req, res, next) => {
  const { cardsId, userId } = req.body;

  try {
    const createdUserCards = [];
    const cardsArray = cardsId.map(async (cardId)=>{
      const userCard = await UserCards.create();
      createdUserCards.push(userCard);
      const addUserCard = [
        userCard.setStatus("active"),
        userCard.setUser(userId),
        userCard.setCard(cardId),
      ];
  
      return Promise.all(addUserCard);
    })

    await Promise.all(cardsArray)

    return res.send(createdUserCards);
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
