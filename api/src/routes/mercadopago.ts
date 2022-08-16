import { Router, Request, Response, NextFunction } from 'express'

import mp from 'mercadopago'
const mercadopagoRoute = Router()
const dotenv = require('dotenv').config()

mp.configure({ 
  access_token: dotenv.ACCESS_TOKEN 
})

mercadopagoRoute.post('/checkout', (req: Request, res: Response, next: NextFunction) => {
  const items = req.body.map((item: any) => {
    return {
      title: item.name,
      unit_price: item.price,
      quantity: 1
    }
  })
  console.log(items)
  const preference = {
    items,
    back_urls:{
      success: "https://www.google.com/",
      failure: "https://gmail.com/",
      pending: "https://www.smn.gob.ar/"
    }
  }
  mp.preferences
    .create(preference)
    .then((response) => { // espacio para trabajar con la respuesta de MP por la compra del producto
      console.log(response)
      return res.redirect(response.body.init_point)
    })
    .catch((error) => {
      return next(error)
    })
})

export default mercadopagoRoute
