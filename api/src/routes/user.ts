import { Router } from 'express';
// const { Country, Activity, cache } = require('../db');

// const axios = require('axios');
// const API_ALL_URL = 'https://restcountries.com/v3/all';

const userRoute = Router();

userRoute.get('/', async (_: any, res: any) => {
    res.send('<h1>Hola user!</h1>');
});

export default userRoute;