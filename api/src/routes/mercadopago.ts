import { Router } from 'express'

import mp from 'mercadopago'
const mercadopagoRoute = Router()
const dotenv = require('dotenv').config()

mp.configure({ 
  access_token: dotenv.ACCESS_TOKEN 
})

mercadopagoRoute.post('/checkout', (req: any, res: any) => {
  const preference = {
    items: [ 
      {
        title: req.body.title,
        unit_price: parseInt(req.body.price), // le llega como string
        quantity: 1
      }
    ],
    back_urls:{
      success: "https://www.google.com/",
      failure: "https://gmail.com/",
      pending: "https://www.smn.gob.ar/"
    }
  }
  mp.preferences
    .create(preference)
    .then(function (response) { // espacio para trabajar con la respuesta de MP por la compra del producto
      return res.redirect(response.body.init_point)
    })
    .catch(function (error) {
      console.log(error)
    })
})

export default mercadopagoRoute
