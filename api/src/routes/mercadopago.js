const {Router} = require('express');
const mp = require('../utils/mercadopago')

const mercadopagoRoute = Router();

mercadopagoRoute.post('/checkout', (req, res, next) => {
    const items = req.body.map((item) => {
        return {
            title: item.name,
            unit_price: item.price,
            quantity: item.quantity,
            description: item.name,
            service: item.name,
            currency_id: 'ARS'
        };
    });
    // console.log(items)
    const preference = {
        items,
        back_urls: {
            success: 'www.google.com.ar',
            failure: 'http://localhost:5173/shopcart?state=failure',
            pending: 'http://localhost:5173/shopcart?state=pending'
        }
    };
    mp.preferences
        .create(preference)
        .then((response) => {
        return res.json({ id: response.body.id });
    })
        .catch((error) => {
        return next(error);
    });
});
export default mercadopagoRoute;