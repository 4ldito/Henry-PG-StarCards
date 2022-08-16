/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, NextFunction, Router } from 'express'
import db from './../db'
const { Card } = db

const cardsRoute = Router()

interface CardAttributes {
  id: number
  name: string
  dmg: number
  life: string
  ability: string
  abilities: string[]
  race: string
  cost: number
  canAttack: 'enum'
  flying: boolean
}

const getAllCards = async (): Promise<CardAttributes[]> => {
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

export default cardsRoute