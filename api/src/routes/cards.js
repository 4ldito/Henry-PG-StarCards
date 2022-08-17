/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require('express')
const db = require('../db')

const { Card } = db
const cardsRoute = Router()

const getAllCards = async () => {
  const allPacksDB = await Card.findAll()
  return allPacksDB
}

cardsRoute.get('/', async (req, res, next) => {
  try {
    const packs = await getAllCards()
    return res.send(packs)
  } catch (error) {
    return next(error)
  }
})

module.exports = cardsRoute
