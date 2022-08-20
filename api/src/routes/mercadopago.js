const { Router } = require('express')
const mp = require('../utils/mercadopago')
const db = require("../db");
const { User } = db;

const mercadopagoRoute = Router()

mercadopagoRoute.post('/checkout', async (req, res, next) => {

  const user = await User.findOne();
  // console.log(user);
  console.log('a')

  const payer = {id: user.id, name: user.username, email: user.email}

  console.log(payer)
  const items = req.body.map((item) => {
    return {
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      description: item.name,
      service: item.name,
      currency_id: 'ARS'
    }
  });

  const preference = {
    items,
    payer,
    back_urls: {
      success: 'http://localhost:5173/purchase-completed?state=success',
      failure: 'http://localhost:5173/purchase-completed?state=failure',
      pending: 'http://localhost:5173/purchase-completed?state=pending'
    }
  }
  mp.preferences
    .create(preference)
    .then((response) => {
      return res.json({ id: response.body.id })
    })
    .catch((error) => {
      return next(error)
    })
})
module.exports = mercadopagoRoute
