const { Router } = require("express");
const db = require("../db");
const { ShopCart, StarsPack, CardPacks } = db;

const shopCartRoute = Router();

shopCartRoute.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const starsPacksIds = await ShopCart.findAll({
            where: { UserId: id, packTypes: 'starsPack', StatusId: 'active' }
        });

        const cardsPacksIds = await ShopCart.findAll({
            where: { UserId: id, packTypes: 'cardsPack', StatusId: 'active' }
        });

        const starsPacksPromises = starsPacksIds.map(async (sp) => {
            return StarsPack.findByPk(sp.product);
        });

        const cardsPacksPromises = cardsPacksIds.map(async (cp) => {
            return CardPacks.findByPk(cp.product);
        });

        const starsPacks = await Promise.all(starsPacksPromises);
        const cardsPacks = await Promise.all(cardsPacksPromises);

        const infoStarsPacks = {};
        starsPacksIds.forEach((sp) => {
            infoStarsPacks[sp.product] = { quantity: sp.quantity }
        });

        const infoCardsPacks = {};
        cardsPacksIds.forEach((cp) => {
            infoCardsPacks[cp.product] = { quantity: cp.quantity }
        });

        const starPacksQuantities = starsPacks.map((sp) => {
            sp.dataValues.quantity = infoStarsPacks[sp.id].quantity;
            return sp;
        })

        const cardsPacksQuantities = cardsPacks.map((cp) => {
            cp.dataValues.quantity = infoCardsPacks[cp.id].quantity;
            return cp;
        })

        // return res.send({ cardsPacksQuantities, starPacksQuantities });

        return res.send({ shopCart: { starsPacks: starPacksQuantities, cardsPacks: cardsPacksQuantities } });

    } catch (error) {
        return next(error);
    }
});

shopCartRoute.post("/add/:id", async (req, res, next) => {
    const { info: { product, quantity, packTypes } } = req.body;
    const { id } = req.params;
    try {
        const [newShopCart, created] = await ShopCart.findOrCreate({
            where: { product: product.id, UserId: id, StatusId: 'active', packTypes },
            defaults: { quantity }
        });

        if (!created) {
            await newShopCart.update({
                quantity: newShopCart.quantity + quantity
            })
        }

        return res.send(newShopCart);
    } catch (error) {
        return next(error);
    }
});

shopCartRoute.patch("/disable/:id", async (req, res, next) => {
    const { info: { product, packTypes } } = req.body;
    const { id } = req.params;

    try {
        const itemShopCart = await ShopCart.findOne({
            where: { product, UserId: id, packTypes, StatusId: 'active' }
        });

        if (itemShopCart) {
            await itemShopCart.update({ StatusId: 'inactive' });
            return res.send('Item eliminado');
        }

        return res.send('No se encontró el item =(');
    } catch (error) {
        return next(error);
    }
});

module.exports = shopCartRoute;
