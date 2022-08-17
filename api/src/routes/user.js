const { Router } = require("express");
// const { Country, Activity, cache } = require('../db');

// const axios = require('axios');
// const API_ALL_URL = 'https://restcountries.com/v3/all';

const userRoute = Router();

///////////////////////Routes Profile//////////////////////////////////////////

userRoute.get("/", (req, res) => {
try {
    return res.send("<h1>Hola user!</h1>");
  
} catch (error) {
  
}});

module.exports = userRoute;
