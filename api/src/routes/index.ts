import { Router } from 'express'
import userRoute from './user'
import mercadopagoRoute from './mercadopago'
import starsPackRoute from './starsPacks'
import cardsRoute from './cards'

const router = Router()

router.use('/user', userRoute)
router.use('/mercadopago', mercadopagoRoute)
router.use('/stars-pack', starsPackRoute)
router.use('/cards', cardsRoute)

export default router
