import { Router } from 'express'
import db from '../db'
const { User } = db
// const { Country, Activity, cache } = require('../db');

// const axios = require('axios');
// const API_ALL_URL = 'https://restcountries.com/v3/all';

const userRoute = Router()

userRoute.get('/', async (req, res) => {
  const users = await User.findAll()
  users && res.json(users)
  return res.json(new Error('error'))
})

userRoute.post('/', async (req, res) => {
  const { password, username, email } = req.body
  const newUser = await User.findOrCreate({ where: { password, username, email } })
  if (newUser[1]) {
    res.json(newUser)
  } else {
    res.status(400).json('user alredy exists')
  }
})

userRoute.delete('/:id', async (req, res) => {
  const { id } = req.body.params
  if (!id) return res.send('error')
  const userDeleted = await User.findOne({ where: { id } })
  if (userDeleted) {
    User.destroy({ id })
    res.json('user removed')
  }
})
// userRoute.patch()

export default userRoute
