/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");
const { ShopCart } = db;

const shopCartRoute = Router();

shopCartRoute.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const starsPacks = await ShopCart.findAll({
            where: { UserId: id, packTypes: 'starsPack', StatusId: 'active' }
        });

        const cardsPacks = await ShopCart.findAll({
            where: { UserId: id, packTypes: 'cardsPack', StatusId: 'active' }
        });
        
        return res.send({ shopCart: { starsPacks, cardsPacks } });

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
