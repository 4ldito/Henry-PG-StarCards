const { Router } = require("express");
const db = require("../db");
const userCards = require("../models/userCards");

const { User, Deck, UserCards } = db;

const userDecksRoute = Router();

userDecksRoute.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { deckId } = req.query;
        const user = await User.findByPk(userId, { include: Deck });
        if (!user) return res.json({ error: "El usuario no existe" });
        if (!deckId) {
            let promisedDecks = user.Decks.map(async e => {
                return Deck.findByPk(e.id, { include: UserCards });
            });
            const decks = await Promise.all(promisedDecks);
            return res.json(decks);
        }
        const deckFound = await Deck.findByPk(deckId, { include: UserCards });
        if(!deckFound)return res.json({error:'El mazo no existe'});
        return res.json(deckFound);
    } catch (err) {
        next(err);
    }
});
userDecksRoute.post('/:userId', async (req, res, next) => {
    const { newDeckCards, name, race } = req.body;
    const userId = req.params.userId;
    if (newDeckCards.length !== 20) return res.json({ error: "El mazo debe tener al menos 20 cartas" });
    try {

        const newDeck = await Deck.create({ name, race }, { include: [UserCards] });
        newDeckCards.forEach(async e => {
            const userCard = await UserCards.findByPk(e.id, { include: [Deck] });
            await userCard.addDeck(newDeck);
            await newDeck.addUserCards(userCard);
            await userCard.save();
            await newDeck.save();
        })
        const user = await User.findByPk(userId, { include: Deck });
        user.addDeck(newDeck);
        user.save();
        res.json('creado');
    } catch (err) {
        next(err);
    }
});

userDecksRoute.put((req,res,next)=>{
    try{

    }catch(err){
        next(err);
    }
})



module.exports = userDecksRoute;