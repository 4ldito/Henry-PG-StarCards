import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SelectedDeck from "./SelectedDeck";
import { deleteDeck, createDeck, getUserDecks, setActiveDeck, setNewSelectedDeck } from '../../../../redux/actions/user'
import { CardContainer } from "../../../Card/CardContainer";
import css from './DeckList.module.css'

let justCreated = false;
let justCreatedName = '';
let justDeletedId = null;

function DeckList({ userId, selectedDeck, enableAddButton, bothStacks, showCards,
    newDeckCards, removeCardFromDeck, setNewDeckCards, creatingDeck, setCreatingDeck,
    changeDeckName, setUpdatingdeck, updatingDeck, updateSelectedDeck,actualCost, setActualCost }) {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.userReducer.decks);
    const cards = useSelector(state => state.album.cards);
    const activeDeck = useSelector(state => state.userReducer.activeDeck);
    const [newDeckName, setNewDeckName] = useState();
    const [creationErrors, setCreationErrors] = useState({});


    useEffect(() => {

        if (!justCreated && selectedDeck?.name && decks.length) {
            if (!decks.find(e => e.id === selectedDeck?.id)) {

                let selDeckInd = decks.findIndex(e => e.id === selectedDeck?.id);
                if (activeDeck?.name) {
                    dispatch(setNewSelectedDeck(activeDeck))
                    document.querySelector('#newDeckName').value = activeDeck.name;

                } else {
                    if (selDeckInd === decks.length - 1) {
                        const deck = decks[--selDeckInd]
                        dispatch(setNewSelectedDeck(deck));
                        document.querySelector('#newDeckName').value = deck.name;

                    } else {
                        const deck = decks[++selDeckInd]
                        dispatch(setNewSelectedDeck(deck))
                        document.querySelector('#newDeckName').value = deck.name;

                    }
                }
            } else {

            }
        };
        if (justCreated) {
            const deck = decks.find(e => e.name === justCreatedName);
            dispatch(setNewSelectedDeck(deck));
        }
        setCreationErrors({});
        justCreated = false
    }, [decks, activeDeck]);
    useEffect(() => { setCreationErrors({}) }, [selectedDeck]);

    function createNewDeck(userId, deck, name) {
        setActualCost(0);
        if (name && deck.length > 1) {
            const isValidDeck = deck.reduce((prev, curr) => curr.race === deck[0].race && prev ? true : false, true);
            const deckCosts = deck.map(e => e.cost * e.repeat);
            const totalCost = deckCosts.reduce((prev, curr) => prev + curr);
            console.log(totalCost)
            if (decks.find(e => e.name === name)) {
                setCreationErrors({ error: 'You Cant Repeat names' });
            } else if (totalCost > 20000) {
                setCreationErrors({ error: `You can't exceed the max cost 20000` });
            } else {
                if (isValidDeck) {
                    dispatch(createDeck(userId, deck, name));
                    setNewDeckCards([]);
                    setCreatingDeck(false);
                    justCreatedName = name;
                    justCreated = true;
                } else {
                    setCreationErrors({ error: 'All cards must to be the same race' });
                }
            };
        } else {
            
            if (!name && !(deck.length)) {
                setCreationErrors({ error: 'Add some cards to your deck and give it a name' });
            } else if (!name && deck.length>1) {
                setCreationErrors({ error: 'Name your deck' });
            } else if(!(deck.length)) {
                setCreationErrors({ error: 'Add some cards' });
            }else{
                setCreationErrors({ error: 'Add some more cards' });
            }

        }

    }

    function removeDeck(userId, deckId) {
        if (decks.length >= 2) {
            if (activeDeck.id == deckId) dispatch(setActiveDeck({id: null}, userId));
            if (selectedDeck.id === deckId) {

                dispatch(setNewSelectedDeck({}));
                dispatch(setNewDeckCards(activeDeck));
            };
            dispatch(deleteDeck(userId, deckId))
            // dispatch(setNewSelectedDeck({}));
            justDeletedId = deckId;
        }
    }

    function findSelectedDeck(id, userDecks) {
        const deck = userDecks.find(e => id == e.id);
        dispatch(setNewSelectedDeck(deck));
        setCreatingDeck(false);
        setUpdatingdeck({});
        document.querySelector('#newDeckName').value = deck.name;
    }

    function openNewDeckTemplate() {
        setActualCost(0);
        if (!bothStacks) showCards('cartas');
        setCreatingDeck(true);
        enableAddButton(true);
        setNewDeckCards([]);
        dispatch(setNewSelectedDeck({}));
        setNewDeckName('');
        document.querySelector('#newDeckName').value = '';
    }

    return <div className={css.allContainer}>

        {/* LISTADO DE MAZOS */}

        <ul className={css.deckListContainer}>
            {decks?.map((e, i) => <div key={i}><div onClick={(e) => findSelectedDeck(e.target.id, decks)} id={e.id}>{e.name}
            </div>
                <button key={i} id={e.id} onClick={(e) => { removeDeck(userId, e.target.id) }}>delete</button>
            </div>
            )}
            <button onClick={() => openNewDeckTemplate()}>
                Nuevo mazo
            </button>
        </ul>

        {/* CREACION DE MAZO */}
        <div className={css.actualDeckContainer}>
            <input id='newDeckName' onChange={(e) => {  setNewDeckName(e.target.value) 
            }} placeholder="Name you deck"></input>
            <div style={{color:"black"}} className={css.cardsContainer}>
                {actualCost}
                {creatingDeck ? newDeckCards?.map((e, i) => {
                    return (
                    <div className={css.card}>
                        <CardContainer
                            newDeckCards={newDeckCards}
                            creatingDeck={creatingDeck}
                            removeCardFromDeck={removeCardFromDeck}
                            key={i}
                            inDeck={true}
                            repeat={e.repeat}
                            card={e} />
                    </div>
                )}) : updatingDeck.cards ?
                    updatingDeck?.cards?.map((card, i) => {
                        return <CardContainer
                            removeCardFromDeck={removeCardFromDeck}
                            key={i}
                            inDeck={true}
                            card={card}
                            repeat={card.repeat}
                            updatingDeck={updatingDeck}
                        />

                    }) :
                    <div>
                        {
                        
                        selectedDeck?.UserCards?.map((e, i, array) => {
                            let card = cards.find(el => el.id === e.CardId);
                            return <CardContainer
                                removeCardFromDeck={removeCardFromDeck}
                                key={i}
                                inDeck={true}
                                card={card}
                                uCard={e}
                                repeat={e.repeat} />
                                
                        })}
                    </div>
                }
                {(!creatingDeck && activeDeck?.id !== selectedDeck?.id) && <button onClick={() => { dispatch(setActiveDeck(selectedDeck, userId)) }}>Usar</button>}
            </div>
            <button onClick={() => {
                if (updatingDeck.cards || updatingDeck.name) {
                    setUpdatingdeck({});
                    updateSelectedDeck(userId, selectedDeck.id, updatingDeck);
                } else {
                    createNewDeck(userId, newDeckCards, newDeckName);
                }
            }}>Guardar</button>
            {creationErrors.error && <div>{creationErrors.error}</div>}
        </div>


        {/* BOTON DE CREACION DE NUEVO MAZO */}

    </div>

}

export default DeckList;