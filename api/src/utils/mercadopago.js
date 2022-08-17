const mp = require("mercadopago");

require("dotenv").config();

mp.configure({
  access_token:
    process.env.ACCESS_TOKEN,
});

module.exports = mp;
