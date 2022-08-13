const express = require('express');
const app = express();
const mercadopago = require("mercadopago");
// const bodyParser = require('body-parser'); //es para la respuesta de MP


//middleware
app.use(express.urlencoded({ extended: false }))

// Agrega credenciales
mercadopago.configure({ //cuenta produccion acces token test 1 (TETE8284659    qatest1769)
  access_token: "APP_USR-6913287203050942-081213-9ae4b41c5f23db785ed7c59bdbb34d5e-1178359030", //PROD_ACCESS_TOKEN
});


//routes
app.post('/checkout', (req,res)=>{

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
      
      mercadopago.preferences
        .create(preference)
        .then(function (response) { //espacio para trabajar con la respuesta de MP por la compra del producto

            res.redirect(response.body.init_point)

        })
        .catch(function (error) {
          console.log(error);
        });
})



//server
app.listen(3000, ()=>{
    console.log('server en puerto 3000')
})