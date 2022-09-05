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
    const isValidDeck = newDeckCards.reduce((prev, curr) => curr.race === newDeckCards[0].race && prev ? true : false, true);
    const deckCosts = newDeckCards.map(e=>e.cost * e.repeat);
    const totalCost = deckCosts.reduce((prev, curr) =>  prev + curr);
    if (totalCost>20000) return res.json({ error: 'max cost is 20000'});
    if (!isValidDeck) return res.json({ error: 'All cards must be the same race' });
    if (!name) return res.json({ error: 'Deck must have a name' });
    // const alreadyExists = await Deck.findOne({where:{name, UserId:userId}});
    // if(alreadyExists) return res.json({error:'Deck already exists'});
    try {
        const newDeck = await Deck.create({ name });
        const cardRepeats = [];
        for (const deckCard of newDeckCards) {
            const userCard = await UserCards.findOne({ where: { CardId: deckCard.id, StatusId: 'active', UserId: userId } });

            await newDeck.addUserCards(userCard);

            cardRepeats.push({ userCard: userCard, repeat: deckCard.repeat });
        }


        newDeck.cardRepeats = JSON.stringify(cardRepeats);
        newDeck.totalCost = totalCost;
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

userDecksRoute.put('/:userId/:id', async (req, res, next) => {
    const { userId, id } = req.params;
    const { name, cards } = req.body;
    console.log(cards);
    const user = await User.findByPk(userId);

    if (!user) return res.json({ error: 'El usuario no existe' });
    try {
        const oldDeck = await Deck.findByPk(id, { include: UserCards });
        if (!oldDeck) return res.json({ error: 'El mazo a remplazar no existe' });
        if (name) await oldDeck.update({ name });
        let i = 0;
        const cardRepeats = [];
        // for (const card of cards) {
        //     const userCard = await UserCards.findOne({ where: { CardId: card.id, StatusId: 'active', UserId: userId } });
        //     if (i === 0) {
        //         await oldDeck.setUserCards(userCard);
        //         await oldDeck.save();

        //     } else {
        //         await oldDeck.addUserCards(userCard);
        //         await oldDeck.save();

        //     }
        //     i++;
        //     cardRepeats.push({ userCard: userCard, repeat: card.repeat });
        // }
        const promisedChanges = cards.map(async card => {
            console.log('entra ... veces');
            const userCard = await UserCards.findOne({ where: { CardId: card.id, StatusId: 'active', UserId: userId } });
            cardRepeats.push({ userCard: userCard, repeat: card.repeat });
            if (i === 0) {
                i++;
                console.log('aca deberia entrar 1na sola vez');
                return await oldDeck.setUserCards(userCard);
            } else {
                console.log('aca deberia entrar las restantes');
                return await oldDeck.addUserCards(userCard);
            }
        });
        await Promise.all(promisedChanges);
        oldDeck.cardRepeats = JSON.stringify(cardRepeats);
        await oldDeck.save();
        const returnDeck = await Deck.findByPk(oldDeck.id, { include: UserCards });
        // console.log(returnDeck);
        res.json(returnDeck);
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