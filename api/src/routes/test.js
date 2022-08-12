const { Router } = require('express');
// const { Country, Activity, cache } = require('../db');

const testRoute = Router();

testRoute.get('/', async (req, res, next) => {
    res.send('<h1>hola</h1>')
});

module.exports = { testRoute };
