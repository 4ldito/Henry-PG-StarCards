const { Router } = require("express");
const db = require("../db");

const { User, Deck, Card, UserCards } = db;

const userDecksRoute = Router();

userDecksRoute.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { deckId } = req.query;
        const user = await User.findByPk(userId, { include: Deck });
        if (!user) return res.json({ error: "El usuario no existe" });
        if (!deckId) {
            let promisedDecks = user.Decks.map(e => {
                return Deck.findByPk(e.id, { include: UserCards });
            });
            const decks = await Promise.all(promisedDecks);
            return res.json(decks);
        }
        const deckFound = await Deck.findByPk(deckId, { include: UserCards });
        if (!deckFound) return res.json({ error: 'El mazo no existe' });
        return res.json(deckFound);
    } catch (err) {
        next(err);
    }

});
userDecksRoute.post('/:userId', async (req, res, next) => {
    const { newDeckCards, name } = req.body;
    const userId = req.params.userId;

    try {
        const newDeck = await Deck.create({ name });
        const cardRepeats = [];
        
        for (const deckCard of newDeckCards) {
            const userCard = await UserCards.findOne({ where: { CardId: deckCard.id, StatusId: 'active', UserId: userId } });
            await newDeck.addUserCards(userCard);
            console.log(userCard, deckCard.repeat);
            cardRepeats.push({ userCardId: userCard.id, repeat: deckCard.repeat });
        }
        
        // await newDeckCards.forEach(async e => {
        //     let newUserCard = await UserCards.findOne({ where: { CardId: e.id, StatusId: 'active', UserId: userId } });
        //     await newDeck.addUserCards(newUserCard);
        //     console.log(newUserCard, e.repeat);
        //     cardRepeats.push({ UserCard: newUserCard, repeat: e.repeat });
        // });
        console.log(cardRepeats);
        
        newDeck.cardRepeats = JSON.stringify(cardRepeats);
        newDeck.save();

        const user = await User.findByPk(userId, { include: Deck });
        await user.addDeck(newDeck);
        user.save();

        const returnDeck = await Deck.findByPk(newDeck.id, { include: UserCards });
        res.json(returnDeck);
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
    const { id, userId } = req.params
    const user = await User.findByPk(userId, { include: Deck });
    if (!user) return res.json({ error: 'El usuario no existe' });
    const deckToRemove = user.Decks.find((e) => e.id == id);
    if (!deckToRemove) return res.json({ error: 'El mazo no existe' });
    try {
        await user.removeDeck(deckToRemove)
        await user.save()
        Deck.destroy({ where: { id: parseInt(id) } })
        res.json({ message: 'Mazo eliminado correctamente', deckToRemove });
    } catch (err) {
        next(err)
    }
});



module.exports = userDecksRoute;