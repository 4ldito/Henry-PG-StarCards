const server = require("./src/socketServer");
const db = require("./src/db");
const users = require("./src/seeders/users");
const rols = require("./src/seeders/rols");
const status = require("./src/seeders/status");
const starsPack = require("./src/seeders/starsPack");
const cardPacks = require("./src/seeders/cardPacks");
const { zergCards, terranCards, protossCards } = require("./src/seeders/cards");

// ARREGLAR EN CARDSPACKS

const { User, Rol, StarsPack, Card, CardPacks, Status, UserCards } = db;

const forceFlag = false;

const PORT = process.env.PORT !== undefined ? process.env.PORT : 3001;

const createAllCards = async () => {
  const allCards = [];
  for (const card of zergCards) {
    allCards.push(Card.create(card));
  }

  for (const card of terranCards) {
    allCards.push(Card.create(card));
  }

  for (const card of protossCards) {
    allCards.push(Card.create(card));
  }
  return await Promise.all(allCards);
};

const createAllCardPacks = async () => {
  const allPacks = [];
  for (const pack of cardPacks) {
    allPacks.push(CardPacks.create(pack));
  }
  return await Promise.all(allPacks);
};

const createAllStarPacks = async () => {
  const allPacks = [];
  for (const pack of starsPack) {
    allPacks.push(StarsPack.create(pack));
  }
  return await Promise.all(allPacks);
};

const createAllUsers = async () => {
  const allUsers = [];
  for (const user of users) {
    allUsers.push(User.create(user));
  }
  return await Promise.all(allUsers);
};

const createRols = async () => {
  for (const rol of rols) {
    await Rol.create(rol);
  }
};

const createStatus = async () => {
  for (const stat of status) {
    await Status.create(stat);
  }
};

db.sequelize.sync({ force: forceFlag }).then(async () => {
  if (forceFlag) {
    await createRols();
    await createStatus();

    const packs = await createAllCardPacks();
    const packsStatus = packs.map(
      async (pack) => await pack.setStatus("active")
    );

    const cards = await createAllCards();
    const cardsStatus = cards.map(async (card) => card.setStatus("active"));

    const starsPacks = await createAllStarPacks();
    const starsPacksStatus = starsPacks.map(async (starPack) =>
      starPack.setStatus("active")
    );

    const superadmins = await createAllUsers();
    const adminCards = [];
    const userSuperadmin = superadmins.map(async (user) => {
      cards.forEach(async (card) => {
        for (let i = 0; i < 1; i++) {
          const userCard = await UserCards.create();

          const addUserCard = [
            userCard.setStatus("active"),
            userCard.setUser(user.id),
            userCard.setCard(card.id),
          ];

          adminCards.push(Promise.all(addUserCard));
        }
      });
      return [user.setRol("superadmin"), user.setStatus("active")];
    });

    await Promise.all([
      Promise.all(packsStatus),
      Promise.all(cardsStatus),
      Promise.all(userSuperadmin),
      Promise.all(adminCards),
      Promise.all(starsPacksStatus),
    ]);
  }

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
