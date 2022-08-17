const db = require('../db')
const { User } = db

const { Router } = require('express')
const userRoute = Router()
/// /////////////////////////////////////////////////////////////////////////////////////////////
userRoute.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    if (users) return res.json(users)
    return res.json(new Error('error'))
  } catch (error) {
    next(error)
  }
})

userRoute.post('/', async (req, res, next) => {
  try {
    const { password, username, email } = req.body
    const newUser = await User.findOrCreate({ where: { password, username, email } })
    if (newUser[1]) {
      res.json(newUser)
    } else {
      res.status(400).json({ msg: 'user alredy exists' })
    }
  } catch (error) {
    next(error)
  }
})

userRoute.delete('/', async (req, res, next) => {
  try {
    const id = req.query.id
    console.log(id)
    if (!id) return res.send({ err: 'error' })
    const userDeleted = await User.findOne({ where: { id } })
    if (userDeleted) {
      User.destroy({ where: { id } })
      res.json({ msg: 'user removed' })
    } else {
      return res.status(400).send({ msg: 'user does not exist' })
    }
  } catch (error) {
    next(error)
  }
})

/// ////////////////////Routes Modify Profile//////////////////////////////////////////

userRoute.patch('/', async (req, res, next) => {
  try {
    const { username } = req.body
    await User.update(User, {
      where: {
        username: username
      }
    })
    res.json({ msg: 'Username Updated!' })
  } catch (error) {
    next(error)
  }
})

userRoute.patch('/', async (req, res, next) => {
  try {
    const { email } = req.body
    await User.update(User, {
      where: {
        email: email
      }
    })
    res.json({ msg: 'Email Updated!' })
  } catch (error) {
    next(error)
  }
})

userRoute.patch('/', async (req, res, next) => {
  try {
    const password = req.body
    await User.update(User, {
      where: {
        password: password
      }
    })
    res.json({ msg: 'Password Updated!' })
  } catch (error) {
    next(error)
  }
})

userRoute.patch('/', async (req, res, next) => {
  try {
    const { profileImg } = req.body
    await User.update(User, {
      where: {
        profileImg: profileImg
      }
    })
    res.json({ msg: 'Profile Image Updated!' })
  } catch (error) {
    next(error)
  }
})

userRoute.patch('/', async (req, res, next) => {
  try {
    const { coverImg } = req.body
    await User.update(User, {
      where: {
        coverImg: coverImg
      }
    })
    res.json({ msg: 'Cover Image Updated!' })
  } catch (error) {
    next(error)
  }
})
module.exports = userRoute
