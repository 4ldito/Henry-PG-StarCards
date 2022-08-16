import { Router, Request, Response, NextFunction } from 'express'
import mp from '../utils/mercadopago'

const mercadopagoRoute = Router()

mercadopagoRoute.post('/checkout', (req: Request, res: Response, next: NextFunction) => {
  const items = req.body.map((item: any) => {
    return {
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      description: item.name
    }
  })
  // console.log(items)
  const preference = {
    items,
    back_urls: {
      success: 'http://localhost:5173/shopcart?state=success',
      failure: 'http://localhost:5173/shopcart?state=failure',
      pending: 'http://localhost:5173/shopcart?state=pending'
    }
  }

  mp.preferences
    .create(preference)
    .then((response) => { // espacio para trabajar con la respuesta de MP por la compra del producto
      console.log(response)
      return res.json({ id: response.body.id })
    })
    .catch((error) => {
      return next(error)
    })
})

export default mercadopagoRoute
