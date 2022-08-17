/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require('express');
const  db = require('../db')
const { StarsPack } = db

const starsPackRoute = Router()

const getAllStarsPack = async () => {
  const allPacksDB = await StarsPack.findAll()
  return allPacksDB
}

starsPackRoute.get('/', async (req, res, next) => {
  try {
    const packs = await getAllStarsPack()
    return res.send(packs)
  } catch (error) {
    return next(error)
  }
})

export default starsPackRoute
