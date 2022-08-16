/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, NextFunction, Router } from 'express'
import db from './../db'
const { StarsPack } = db

const starsPackRoute = Router()

interface StarsPackAttributes {
  id: number
  price: number
  stars: number
}

const getAllStarsPack = async (): Promise<StarsPackAttributes[]> => {
  const allPacksDB = await StarsPack.findAll()
  return allPacksDB
}

starsPackRoute.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const packs = await getAllStarsPack()
    return res.send(packs)
  } catch (error) {
    return next(error)
  }
})

export default starsPackRoute
