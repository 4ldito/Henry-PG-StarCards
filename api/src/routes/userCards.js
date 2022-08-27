const { Router } = require("express");
const db = require("../db");

const { UserCards, Card, User } = db;
const userCardsRoute = Router();

userCardsRoute.post("/", async (req, res, next) => {
  const { cardsId, userId } = req.body;

  try {
    const createdUserCards = [];
    const cardsArray = cardsId.map(async (cardId) => {
      const userCard = await UserCards.create();
      createdUserCards.push(userCard);
      const addUserCard = [
        userCard.setStatus("active"),
        userCard.setUser(userId),
        userCard.setCard(cardId),
      ];

      return Promise.all(addUserCard);
    });

    await Promise.all(cardsArray);

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
        where: { UserId: userId, StatusId: statusId }, include: [Card, User]
      }
      : userId
        ? { where: { UserId: userId }, include: [Card, User] }
        : { where: { StatusId: statusId }, include: [Card, User] };
  try {
    const cards = await UserCards.findAll(
      userId || statusId ? findConfig : undefined
    );
    return res.send(cards);
  } catch (error) {
    return next(error);
  }
});

userCardsRoute.patch("/", async (req, res, next) => {
  try {
    const { userId, userCardsIdsToSale, status, price } = req.body;

    const userCards = await Promise.all(userCardsIdsToSale.map((userCard) => {
      return UserCards.findOne({
        where: { UserId: userId, id: userCard }, include: Card,
      });
    }));

    const updatedUserCards = await Promise.all(userCards.map((userCard) => {
      return userCard.update({ price, StatusId: status });
    }));

    return res.json(updatedUserCards);
  } catch (error) {
    console.log(error);
  }
});

module.exports = userCardsRoute;
