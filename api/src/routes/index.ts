import { Router } from 'express'
// import { countryRoute } from './country';
import userRoute from './user'
import mercadopagoRoute from './mercadopago'
import starsPackRoute from './starsPacks'

const router = Router()

router.use('/user', userRoute)
router.use('/mercadopago', mercadopagoRoute)
router.use('/stars-pack', starsPackRoute)

export default router
