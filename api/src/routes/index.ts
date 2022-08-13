import { Router } from 'express';
// import { countryRoute } from './country';
import userRoute from './user';
import mercadopagoRoute from './mercadopago';

const router = Router();

router.use('/user', userRoute);
router.use('/mercadopago', mercadopagoRoute);

export default router;