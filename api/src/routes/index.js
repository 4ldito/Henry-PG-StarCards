const { Router } = require('express')
const logInRoutes = require('./logIn');
const userRoute = require('./user')
const mercadopagoRoute = require('./mercadopago')
const starsPackRoute = require('./starsPacks')
const cardsRoute = require('./cards')

const router = Router()
router.use('/login', logInRoutes)
router.use('/user', userRoute)
router.use('/mercadopago', mercadopagoRoute)
router.use('/stars-pack', starsPackRoute)
router.use('/cards', cardsRoute)

module.exports = router
