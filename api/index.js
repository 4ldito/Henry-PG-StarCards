/* eslint-disable @typescript-eslint/no-misused-promises */


const server = require("./src/app");
const db = require("./src/db");
const users = require("./src/seeders/users");
const rols = require("./src/seeders/rols");
const status = require("./src/seeders/status");
const starsPack = require("./src/seeders/starsPack");
const { zergCards, terranCards, protossCards } = require("./src/seeders/cards");
// const cardsPack = require("./src/seeders/cardsPack");

// ARREGLAR EN CARDSPACKS

const { User, Rol, StarsPack, Card, CardsPack, Status } = db;


const PORT = process.env.PORT !== undefined ? process.env.PORT : 3000

const createAllCards = async () => {
  const allCards = []
  for (const card of zergCards) {
    allCards.push(Card.create(card))
  }

  for (const card of terranCards) {
    allCards.push(Card.create(card))
  }

  for (const card of protossCards) {
    allCards.push(Card.create(card))
  }
  return await Promise.all(allCards)
}

const createRols = async () => {
  for (const rol of rols) {
    await Rol.create(rol)
  }
}

const createStatus = async () => {
  for (const stat of status) {
    await Status.create(stat);
  }
};

const getSuperAdminRol = async () => {
  try {
    const superAdmin = await Rol.findOne({ where: { rol: 'superadmin' } })
    return superAdmin
  } catch (error) {
    console.log(error)
  }
}


db.sequelize.sync({ force: true }).then(async () => {
  await createRols();
  await createStatus();

  const cards = await createAllCards();
  const cardsStatus = cards.map(async (card) => await card.setStatus("active"));
  await Promise.all(cardsStatus);


  const superAdminRol = await getSuperAdminRol()
  users.forEach(async (u) => {
    const user = await User.create(u)
    user.setRol(superAdminRol)
  })

  starsPack.forEach(async (sp) => {
    await StarsPack.create(sp)
  })

  // for (const cp of cardsPack) {
  //   const zergCards = cards.filter((card) => card.race === "Zerg");

  //   zergCards.forEach((zergCard) => {
  //     cp.cards.push([zergCard, Math.random()]);
  //   });
  //   // await CardsPack.create(cp).then((cp: any) => console.log(cp)).catch((err: any) => console.log(err))
  //   await CardsPack.create(cp);
  // }

  // const allCardsPack = await CardsPack.findAll();
  // console.log(allCardsPack[0].cards);
  // // const test = CardsPack.create()

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
