const { Router } = require("express");
const userRoute = require("./user");
const mercadopagoRoute = require("./mercadopago");
const starsPackRoute = require("./starsPacks");
const cardsRoute = require("./cards");
const packsRoute = require("./cardPacks");

const router = Router();

router.use("/user", userRoute);
router.use("/mercadopago", mercadopagoRoute);
router.use("/stars-pack", starsPackRoute);
router.use("/cards", cardsRoute);
router.use("/packs", packsRoute);

module.exports = router;
