const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sendMail = express();

///////////////////////////////////////////////////////////
let tokenValid;

sendMail.use(bodyParser.json());
sendMail.use(bodyParser.urlencoded({ extended: false }));

function token() {
  return Math.random().toString().substr(2);
};

///////////////////////////////////Verificacion de Token//////////////////////////////////////////////

sendMail.get("/sendmail/:token", (req, res, next) => {
  try {
    console.log("body", req.params);

    const { token } = req.params;
    if (Number(token) === Number(tokenValid)) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  } catch (error) {
    next(error);
  }
})

///////////////////////////////////Envio de Token//////////////////////////////////////////////
sendMail.post("/sendmail", (req, res, next) => {
  tokenValid = token();
  nodemailer.createTestAccount((err, account) => {
    try {
      const htmlEmail = `
          <img src="https://i.ibb.co/SfKhMg2/Sin-t-tulo-1-Mesa-de-trabajo-1.png" width="1100" height="200" title="Logo">
          <h3 style="text-align:center">--> STARCARDS <--</h3>

          <h3 style="text-align:center">TOKEN:</h3>
          <h2 style="text-align:center; border: 1px solid red; height: 200; background-color: rgba(0, 0, 0, 0.167)
          ;
          " >${tokenValid}</h2>
          <h4 style="text-align:center">No comparta esta informacion con NADIE. TOKEN de acceso UNICO</h4>
        `;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "elzeva12@gmail.com", //El email del servicio SMTP que va a utilizar (en este caso Gmail)
          pass: "houhxlzmssscrgha" // La contraseña de dicho SMTP
        }
      });

      let mailOptions = {
        from: "STARCARDS@gmail.com", // Quien manda el email
        to: req.body.email, // El email de destino
        replyTo: "STARCARDS@gmail.com",
        // subject: req.body.asunto, // El asunto del email
        // text: req.body.mensaje, // El mensaje
        html: htmlEmail // La parte HTML del email
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log('err');
        }
        res.send(tokenValid)
        console.log("Mensaje enviado");
      }); 
  } catch (error) {
        next(error)
    }
        
  });
});

///////////////////////////////////Envio de Token//////////////////////////////////////////////

sendMail.post("/sendmailpurchase", (req, res, next) => {
  
 nodemailer.createTestAccount((err, account) => {
 try {
         const htmlEmail = `
         <img src="https://i.ibb.co/SfKhMg2/Sin-t-tulo-1-Mesa-de-trabajo-1.png" width="1100" height="200" title="Logo">
         <h3 style="text-align:center">--> STARCARDS <--</h3>

         <h3 style="text-align:center">TOKEN:</h3>
         
         <h4 style="text-align:center">No comparta esta informacion con NADIE. TOKEN de acceso UNICO</h4>
       `;
     let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,
       tls: {
        rejectUnauthorized: false
      },
       auth: {
         user: "elzeva12@gmail.com", //El email del servicio SMTP que va a utilizar (en este caso Gmail)
         pass: "houhxlzmssscrgha" // La contraseña de dicho SMTP
       }
     });

     let mailOptions = {
       from: "STARCARDS@gmail.com", // Quien manda el email
       to: req.body.email, // El email de destino
       replyTo: "STARCARDS@gmail.com",
       // subject: req.body.asunto, // El asunto del email
       // text: req.body.mensaje, // El mensaje
       html: htmlEmail // La parte HTML del email
     };

     transporter.sendMail(mailOptions, (err, info) => {
       if (err) {
         return console.log('err');
       }
       res.send(tokenValid)
       console.log("Mensaje enviado");
     }); 
 } catch (error) {
       next(error)
   }
       
 });
});
module.exports = sendMail;