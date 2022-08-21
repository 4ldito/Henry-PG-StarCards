const { Router } = require('express')
const mp = require('../utils/mercadopago')
const db = require("../db");
const { User } = db;

const mercadopagoRoute = Router()

mercadopagoRoute.post('/checkout/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) return res.status(404).send({ error: 'User not found'});

  const payer = { name: user.id }
  const items = req.body.map((item) => {
    return {
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      description: item.stars.toString(),
      service: item.name,
      currency_id: 'ARS'
    }
  });

  const preference = {
    items,
    payer,
    additional_info: 'olacomotas',
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
