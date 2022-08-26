const { Router } = require("express");
const db = require("../db");
const userCards = require("../models/userCards");

const { User, Deck, Card } = db;

const userDecksRoute = Router();

userDecksRoute.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { deckId } = req.query;
        const user = await User.findByPk(userId, { include: Deck });
        if (!user) return res.json({ error: "El usuario no existe" });
        if (!deckId) {
            let promisedDecks = user.Decks.map(e => {
                return Deck.findByPk(e.id, { include: Card });

            });
            const decks = await Promise.all(promisedDecks);
            // const decks = await Promise.all(promisedDecks);
            return res.json(decks);
        }
        const deckFound = await Deck.findByPk(deckId, { include: Card });
        if (!deckFound) return res.json({ error: 'El mazo no existe' });
        return res.json(deckFound);
    } catch (err) {
        next(err);
    }
});
userDecksRoute.post('/:userId', async (req, res, next) => {
    const { newDeckCards, name, race } = req.body;
    const userId = req.params.userId;
    const exists =await Deck.findOne({where:{name}});
    if(exists)return res.json({error: 'El mazo ya existe'});
    // if (newDeckCards.length !== 20) return res.json({ error: "El mazo debe tener al menos 20 cartas" });
    try {

        const newDeck = await Deck.create({ name, race }, { include: [Card] });
        newDeckCards.forEach(async e => {
            const card = await Card.findByPk(e.id, { include: [Deck] });
            console.log(newDeck);
            await card.addDeck(newDeck);
            await newDeck.addCard(card);
            await card.save();
            await newDeck.save();
        })
        const user = await User.findByPk(userId, { include: Deck });
        user.addDeck(newDeck);
        user.save();

        res.json(user);
    } catch (err) {
        next(err);
    }
});

userDecksRoute.put(async (req, res, next) => {
    const { userId, oldDeckId } = req.params;
    const { newDeck } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.json({ error: 'El usuario no existe' });
    try {
        const oldDeck = await Deck.findByPk(oldDeckId);
        if (!oldDeck) return res.json({ error: 'El mazo a remplazar no existe' });
        user.removeDeck(oldDeck);


    } catch (err) {
        next(err);
    }
})



module.exports = userDecksRoute;