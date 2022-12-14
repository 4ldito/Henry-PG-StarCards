const { Router } = require("express");
const logInRoutes = require("./logIn");
const userRoute = require("./user");
const mercadopagoRoute = require("./mercadopago");
const starsPackRoute = require("./starsPacks");
const cardsRoute = require("./cards");
const packsRoute = require("./cardPacks");
const userCardsRoute = require("./userCards");
const opinionRoute = require("./opinion");
const favPacksRoute = require("./favPacks");
const shopCartRoute = require("./shopCart");
const sendMail = require("./sendMail");
const transactionRoute = require("./transaction");
const userDecksRoute = require("./userDecks");
const chatRoute = require("./privateChat");
const createuserRoute = require("./RegisterGoogle");
const userFriends = require("./userFriends");
const router = Router();

router.use("/userDecks", userDecksRoute);
router.use("/login", logInRoutes);
router.use("/user", userRoute);
router.use("/mercadopago", mercadopagoRoute);
router.use("/stars-pack", starsPackRoute);
router.use("/cards", cardsRoute);
router.use("/packs", packsRoute);
router.use("/userCards", userCardsRoute);
router.use("/opinion", opinionRoute);
router.use("/", sendMail);
router.use("/shopcart", shopCartRoute);
router.use("/favPacks", favPacksRoute);
router.use("/transaction", transactionRoute);
router.use("/chat", chatRoute);
router.use("/createuser", createuserRoute);
router.use("/userFriends", userFriends);

module.exports = router;