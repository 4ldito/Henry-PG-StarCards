const { Router } = require('express')
const mp = require('../utils/mercadopago')
const db = require("../db");
const { User } = db;
const { purchaseCompletedURL } = process.env;


const mercadopagoRoute = Router()

mercadopagoRoute.post('/checkout/:id', async (req, res, next) => {
  const { id } = req.params;
  if (id === 'null') return res.status(404).send({ error: 'User not found' });
  const user = await User.findByPk(id);

  if (!user) return res.status(404).send({ error: 'User not found' });

  const payer = { name: user.id }
  const items = req.body.map((item) => {
    return {
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      description: item.stars.toString(),
      service: item.name,
      id: item.id,
      currency_id: 'ARS'
    }
  });

  console.log(purchaseCompletedURL);

  const preference = {
    items,
    payer,
    back_urls: {
      success: `${purchaseCompletedURL}?state=success`,
      failure: `${purchaseCompletedURL}?state=failure`,
      pending: `${purchaseCompletedURL}?state=pending`
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
