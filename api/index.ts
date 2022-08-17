/* eslint-disable @typescript-eslint/no-misused-promises */
import server from './src/app'
import db from './src/db'
import { users } from './src/seeders/users'
import { rols } from './src/seeders/rols'
import { starsPack } from './src/seeders/starsPack'
import { zergCards, terranCards, protossCards } from './src/seeders/cards'
import { cardsPack } from './src/seeders/cardsPack'

// ARREGLAR EN CARDSPACKS

const { User, Rol, StarsPack, Card, CardsPack } = db

const PORT: number | string = process.env.PORT !== undefined ? process.env.PORT : 3000

const createRols = async (): Promise<void> => {
  for (const rol of rols) {
    await Rol.create(rol)
  }
}

const createAllCards = async (): Promise<any[]> => {
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

const getSuperAdminRol = async (): Promise<any> => {
  try {
    const superAdmin = await Rol.findOne({ where: { rol: 'superadmin' } })
    return superAdmin
  } catch (error) {
    console.log(error)
  }
}

db.sequelize.sync({ force: true }).then(async () => {
  await createRols()

  const superAdminRol = await getSuperAdminRol()
  users.forEach(async u => {
    const user = await User.create(u)
    user.setRol(superAdminRol)
  })

  starsPack.forEach(async (sp) => {
    await StarsPack.create(sp)
  })

  const cards = await createAllCards()
  // console.log(cards)

  for (const cp of cardsPack) {
    const zergCards = cards.filter(card => card.race === 'Zerg')

    zergCards.forEach((zergCard) => {
      cp.cards.push([zergCard, Math.random()])
    })
    // await CardsPack.create(cp).then((cp: any) => console.log(cp)).catch((err: any) => console.log(err))
    await CardsPack.create(cp)
  }

  const allCardsPack = await CardsPack.findAll()
  console.log(allCardsPack[0].cards)
  // const test = CardsPack.create()

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}).catch((err: any) => console.log(err))
