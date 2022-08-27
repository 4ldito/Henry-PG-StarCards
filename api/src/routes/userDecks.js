const { Router } = require("express");
const db = require("../db");

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
    const { newDeckCards, name} = req.body;
    const userId = req.params.userId;

    try {

        const newDeck = await Deck.create({ name });
        newDeckCards.forEach(async e => {
            const card = await Card.findByPk(e.id);
            // console.log(card);
            await newDeck.addCard(card);
            newDeck.save();

        })
        const user = await User.findByPk(userId,{include:Deck});
        await user.addDeck(newDeck);
        await user.save();
        res.json(newDeck);
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

userDecksRoute.delete('/:id/:userId', async (req, res, next) => {
    console.log('entra');
    const { id, userId } = req.params
    const user = await User.findByPk(userId, { include: Deck });
    if (!user) return res.json({ error: 'El usuario no existe' });
    const deckToRemove = user.Decks.find((e) => e.id == id);
    if (!deckToRemove) return res.json({ error: 'El mazo no existe' });
    try {
        await user.removeDeck(deckToRemove)
        await user.save()
        Deck.destroy({where:{id:parseInt(id)}})
        const newDecks = user.Decks.filter(e => e.id !== parseInt(id));
        res.json({ message: 'Mazo eliminado correctamente', newDeckList: newDecks || 'holaa' });
    } catch (err) {
        next(err)
    }
});



module.exports = userDecksRoute;