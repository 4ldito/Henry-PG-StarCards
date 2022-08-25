const { Router } = require("express");
const db = require("../db");

const { User, Deck } = db;

const userDecksRoute = Router();

userDecksRoute.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const user = await User.findByPk(id, { include: Deck });

        res.json(user.Decks);
    } catch (err) {
        next(err);
    }
});
userDecksRoute.post('/', async (req, res, next) => {
    try{

    }catch(err){
        next(err);
    }
});

module.exports = userDecksRoute;