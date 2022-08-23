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

function verifyToken(token1, token2){
    token1 === token2 ?  true : false
}

sendMail.get("/sendmail", async (req, res, next) => {
    const {tokenClient} = req.body
    let tokenIs = verifyToken(tokenClient, tokenValid)
    res.send(tokenIs)
})


sendMail.post("/sendmail", (req, res) => {
   tokenValid = token()

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3>--> STARCARDS <--</h3>

        <h3>TOKEN:</h3>
        ${tokenValid}
        <h4>No comparta esta informacion con NADIE. TOKEN de acceso UNICO</h4>
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "elzeva12@gmail.com", //El email del servicio SMTP que va a utilizar (en este caso Gmail)
        pass: "odrirfkiagzdeqhq" // La contraseña de dicho SMTP
      }
    });

    let mailOptions = {
      from: "STARCARDS@gmail.com", // Quien manda el email
      // to: req.body.email, // El email de destino
      to: req.body.email, // El email de destino
      replyTo: "STARCARDS@gmail.com",
      subject: req.body.asunto, // El asunto del email
      text: req.body.mensaje, // El mensaje
      html: htmlEmail // La parte HTML del email
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Mensaje enviado");
    });
  });
});

module.exports = sendMail;