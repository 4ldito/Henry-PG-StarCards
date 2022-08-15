/* eslint-disable @typescript-eslint/no-misused-promises */
import { Response, Router } from 'express'
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

starsPackRoute.get('/', async (_req: Request, res: any): Promise<Response> => {
  const packs = await getAllStarsPack()
  return res.send(packs)
})

export default starsPackRoute
