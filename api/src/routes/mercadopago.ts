const { Router } = require('express');
const mp = require("mercadopago");
const mercadopago = Router();
require('dotenv').config();
const PROD_ACCESS_TOKEN = process.env.ACCESS_TOKEN

mp.configure({ //cuenta produccion access token test 1 (TETE8284659    qatest1769)
    access_token: PROD_ACCESS_TOKEN, //PROD_ACCESS_TOKEN
  });

mercadopago.post('/checkout', (req,res)=>{

    let preference = {
        items: [  //pueden ser varios items
        {
          title: req.body.title,
          unit_price: parseInt(req.body.price), //le llega como string
          quantity: 1,
        },
          // {
          //   title: "stars",
          //   unit_price: 1200,
          //   quantity: 4,
          // },
        ],
      };
      
      mp.preferences
        .create(preference)
        .then(function (response) { //espacio para trabajar con la respuesta de MP por la compra del producto

            res.redirect(response.body.init_point)

        })
        .catch(function (error) {
          console.log(error);
        });
})

module.exports = { mercadopago };