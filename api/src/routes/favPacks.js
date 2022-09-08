/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");

const { CardPacks, User, FavPacks } = db;
const favPacksRoute = Router();

favPacksRoute.get("/", async (req, res, next) => {
    const { userId } = req.body;
    try {
        const cardPacks = await User.findByPk(userId, { include: CardPacks });
        return res.send(cardPacks);
    } catch (error) {
        return next(error);
    }
});

favPacksRoute.post("/", async (req, res, next) => {
    try {
        let { userId, packId } = req.body;
        let cardPackId = await CardPacks.findOne({ where: { id: packId } });
        let favUserId = await User.findOne({ where: { id: userId } });

        await cardPackId.addUser(favUserId)
        console.log(cardPackId);
        const cardPacks = await User.findByPk(userId, { include: CardPacks });
        return res.send(cardPacks)
    } catch (error) {
        next(error)
    }
})

favPacksRoute.delete("/", async (req, res, next) => {
    try {
        let { userId, packId } = req.body;
        let cardPackId = await CardPacks.findOne({ where: { id: packId } });
        let favUserId = await User.findOne({ where: { id: userId } });

        await cardPackId.removeUser(favUserId);
        console.log(cardPackId);
        const cardPacks = await User.findByPk(userId, { include: CardPacks });
        return res.send(cardPacks)
    } catch (error) {
        next(error)
    }
})
module.exports = favPacksRoute;