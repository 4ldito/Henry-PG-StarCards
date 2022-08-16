import { Router, Request, Response, NextFunction } from 'express'

import mp from 'mercadopago'
const mercadopagoRoute = Router()

mp.configure({ // cuenta produccion acces token test 1 (TETE8284659    qatest1769)
  access_token: 'APP_USR-6913287203050942-081213-9ae4b41c5f23db785ed7c59bdbb34d5e-1178359030' // PROD_ACCESS_TOKEN
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
    items
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
