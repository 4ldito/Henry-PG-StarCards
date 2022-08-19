const { Router } = require("express");
const logInRoutes = require("./logIn");
const userRoute = require("./user");
const mercadopagoRoute = require("./mercadopago");
const starsPackRoute = require("./starsPacks");
const cardsRoute = require("./cards");
const packsRoute = require("./cardPacks");
const userCardsRoute = require("./userCards");
onst opinionRoute = require ("./opinion")

const router = Router();

router.use("/login", logInRoutes);
router.use("/user", userRoute);
router.use("/mercadopago", mercadopagoRoute);
router.use("/stars-pack", starsPackRoute);
router.use("/cards", cardsRoute);
router.use("/packs", packsRoute);
router.use("/userCards", userCardsRoute);
router.use("/opinion", opinionRoute);

module.exports = router;
