import { Router } from 'express';
// import { countryRoute } from './country';
import userRoute from './user';

const router = Router();

router.use('/user', userRoute);

export default router;