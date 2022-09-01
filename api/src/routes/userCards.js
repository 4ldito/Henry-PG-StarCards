const { Router } = require("express");
// const { sequelize } = require("../db");
const db = require("../db");

const { UserCards, Card, User, Transaction } = db;
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
        where: { UserId: userId, StatusId: statusId },
        include:
          [
            { model: Card },
            { model: User, attributes: ["id", "username"] }
          ]
      }
      : userId
        ? {
          where: { UserId: userId }, include:
            [
              { model: Card },
              { model: User, attributes: ["id", "username"] }
            ]
        }
        : {
          where: { StatusId: statusId }, include:
            [
              { model: Card },
              { model: User, attributes: ["id", "username"] }
            ]
        };
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
    const { userId, userCardsIdsToUpdate, status, price } = req.body;

    const userCards = await Promise.all(userCardsIdsToUpdate.map((userCard) => {
      return UserCards.findOne({
        where: { UserId: userId, id: userCard }, include: Card,
      });
    }));

    const updatedUserCards = await Promise.all(userCards.map((userCard) => {
      return userCard.update({ price, StatusId: status });
    }));

    return res.json(updatedUserCards);
  } catch (error) {
    next(error)
  }
});

userCardsRoute.patch("/buy/:userCardId", async (req, res, next) => {
  try {
    const { buyerUserId } = req.body;
    const { userCardId } = req.params;

    const userCard = await UserCards.findByPk(userCardId, { include: Card });

    const [buyerUser, sellerUser] = await Promise.all([
      User.findByPk(buyerUserId, { attributes: { exclude: ["password"] } }),
      User.findByPk(userCard.UserId, { attributes: { exclude: ["password"] } }) //sellerUser
    ]);

    if (buyerUser.stars < userCard.price) return res.send({ error: 'Stars insuficientes.' });

    const transaction = await Transaction.create({ type: 'stars', priceStars: userCard.price });
    await Promise.all([transaction.setUser(buyerUser.id), transaction.setStatus('active')]);

    transaction.addUserCards(userCard.id);

    const [buyerUserUpdated, sellerUserUpdated, userCardUpdated] = await Promise.all([
      buyerUser.update({ stars: buyerUser.stars - userCard.price }),
      sellerUser.update({ stars: sellerUser.stars + userCard.price }),
      userCard.update({ UserId: buyerUser.id, StatusId: 'active', DeckId: null })
    ]);

    return res.send({ buyerUser: buyerUserUpdated, sellerUser: sellerUserUpdated, userCard: userCardUpdated });
  } catch (error) {
    next(error);
  }

});

// userCardsRoute.get("/repeat", async (req, res, next) => {
//   const { userId, statusId } = req.query;
//   try {
//     const cards = await UserCards.findAll({
//       where: { UserId: userId, StatusId: statusId },
//       attributes: ['CardId', [sequelize.fn('count', sequelize.col('CardId')), 'repeat']],
//       group: ['CardId', 'Card.id', 'User.id'],
//       include:
//         [
//           { model: Card },
//           { model: User, attributes: ["id", "username"] }
//         ]
//     });
//     return res.send(cards);
//   } catch (error) {
//     return next(error);
//   }
// });


module.exports = userCardsRoute;
