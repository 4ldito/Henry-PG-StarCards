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
    changeDeckName, setUpdatingdeck, updatingDeck, updateSelectedDeck, actualCost,
    setActualCost, actualStackToShow }) {
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

                } else {
                    if (selDeckInd === decks.length - 1) {
                        const deck = decks[--selDeckInd]
                        dispatch(setNewSelectedDeck(deck));

                    } else {
                        const deck = decks[++selDeckInd]
                        dispatch(setNewSelectedDeck(deck))

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
        if (name && deck.length && ( deck.length > 1 || deck[0].repeat>1)) {
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
                    setActualCost(0);
                } else {
                    setCreationErrors({ error: 'All cards must to be the same race' });
                }
            };
        } else {
            
            if (!name && !(deck.length)) {
                setCreationErrors({ error: 'Add some cards to your deck and give it a name' });
            } else if (!name && deck.length > 1) {
                setCreationErrors({ error: 'Name your deck' });
            } else if (!(deck.length)) {
                setCreationErrors({ error: 'Add some cards' });
            } else{
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
    }

    function openNewDeckTemplate() {
        setActualCost(0);
        if (!bothStacks) showCards('cartas');
        setCreatingDeck(true);
        enableAddButton(true);
        setNewDeckCards([]);
        dispatch(setNewSelectedDeck({}));
        setNewDeckName('');
        if (document.querySelector('#newDeckName')) {
            document.querySelector('#newDeckName').value = '';
        }
    }

    return <div className={css.deckList}>
        <div className={bothStacks ? css.allContainerWhenBothStacks : css.allContainerWhenOnlyDecks}>

            {/* LISTADO DE MAZOS */}

            <ul className={css.deckListContainer}>
           
                {decks?.map((e, i) => <div 
                className={selectedDeck?.name===e.name?css.selectedButtonAndDeckNameContainer: css.buttonAndDeckNameContainer} 
                key={i}><div className={css.deckName} onClick={(e) => findSelectedDeck(e.target.id, decks)} id={e.id}>{e.name}
                </div>
                    <button className={selectedDeck?.name===e.name?css.deleteButton + " material-symbols-outlined":css.hidden} key={i} id={e.id} onClick={(e) => { removeDeck(userId, e.target.id) }}>delete</button>
                </div>
                )}
        
                {!creatingDeck&&<button className={css.addButton+" material-symbols-outlined"} onClick={() => openNewDeckTemplate()}>
                    add
                </button>}
            </ul>
            {creatingDeck ? <div className={css.inputAndCost}>
                <input id='newDeckName' autoComplete="off" className={css.nameInput} onChange={(e) => {
                    setNewDeckName(e.target.value)
                }} placeholder="Name you deck"></input>
                Total cost: {' '+ creatingDeck && actualCost}
            </div> : !selectedDeck?.name && <label>{ 'Create a deck'}</label>}
            {/* CREACION DE MAZO */}
            <div className={css.actualDeckContainer}>
                <div style={{ color: "black" }} className={css.cardsContainer}>

                    {creatingDeck ?
                        <div className={css.creatingDeckContainer}>
                            {newDeckCards?.map((e, i) => {
                                return (

                                    <CardContainer
                                        actualStackToShow={actualStackToShow}
                                        newDeckCards={newDeckCards}
                                        creatingDeck={creatingDeck}
                                        removeCardFromDeck={removeCardFromDeck}
                                        key={i}
                                        inDeck={true}
                                        repeat={e.repeat}
                                        card={e} />

                                )
                            })}
                        </div> : updatingDeck.cards ?
                            updatingDeck?.cards?.map((card, i) => {
                                return <CardContainer
                                    actualStackToShow={actualStackToShow}
                                    removeCardFromDeck={removeCardFromDeck}
                                    key={i}
                                    inDeck={true}
                                    card={card}
                                    repeat={card.repeat}
                                    updatingDeck={updatingDeck}
                                />

                            }) :
                            <div className={css.selectedDeckContainer}>
                                {

                                    selectedDeck?.UserCards?.map((e, i, array) => {
                                        let card = cards.find(el => el.id === e.CardId);
                                        return <CardContainer
                                            actualStackToShow={actualStackToShow}
                                            removeCardFromDeck={removeCardFromDeck}
                                            key={i}
                                            inDeck={true}
                                            card={card}
                                            uCard={e}
                                            repeat={e.repeat} />

                                    })}
                            </div>
                    }
                </div>
            </div>
            <div className={css.saveAndUseButtons}>
                {(!creatingDeck && activeDeck?.id !== selectedDeck?.id) && <button className={css.useButton}  onClick={() => { dispatch(setActiveDeck(selectedDeck)) }}>Use</button>}
                <button className={css.saveButton} onClick={() => {
                    if (updatingDeck.cards || updatingDeck.name) {
                        setUpdatingdeck({});
                        updateSelectedDeck(userId, selectedDeck.id, updatingDeck);
                    } else {
                        createNewDeck(userId, newDeckCards, newDeckName);
                    }
                }}>Save</button>

            </div>
            {creationErrors.error && <div>{creationErrors.error}</div>}


            {/* BOTON DE CREACION DE NUEVO MAZO */}

        </div>
    </div>

}

export default DeckList;