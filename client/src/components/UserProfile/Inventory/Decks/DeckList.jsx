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
    changeDeckName, setUpdatingdeck, updatingDeck, updateSelectedDeck }) {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.userReducer.decks);
    const cards = useSelector(state => state.album.cards);
    const activeDeck = useSelector(state => state.userReducer.activeDeck);
    const [newDeckName, setNewDeckName] = useState();
    const [creationErrors, setCreationErrors] = useState({});

    useEffect(() => {
        // setSelectedDeck(activeDeck)
        document.querySelector('#newDeckName').value = activeDeck.name;
    }, [])

    useEffect(() => {
        
        if (!justCreated && selectedDeck) {
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
        
        if (name && deck.length) {
            const isValidDeck = deck.reduce((prev,curr)=>curr.race === deck[0].race && prev?true:false,true);
            const deckCosts = deck.map(e=>e.cost * e.repeat);
            const totalCost = deckCosts.reduce((prev, curr) =>  prev + curr);
            console.log(totalCost)
            if(decks.find(e=>e.name===name)){
                setCreationErrors({error: 'Ya hay un mazo con ese nombre'});
            } else if (totalCost>20000){
                setCreationErrors({error:'El coste maximo es de 20.000 unidades'});
            }else{
                if(isValidDeck){
                    dispatch(createDeck(userId, deck, name));
                    setNewDeckCards([]);
                    setCreatingDeck(false);
                    justCreatedName = name;
                    justCreated = true;
                }else{
                    setCreationErrors({ error: 'Todas las cartas deben ser de la misma raza'});
                }
            };
        } else {
            if (!name && !deck.length) {
                setCreationErrors({ error: 'Añadile cartas a tu mazo y nombralo' });
            } else if (!name && deck.length) {
                setCreationErrors({ error: 'Nombrá tu mazo' });
            } else {
                setCreationErrors({ error: 'Añadile cartas a tu mazo' });
            }

        }
    
    }

    function removeDeck(userId, deckId) {
        if (decks.length >= 2) {
            if (activeDeck.id == deckId) dispatch(setActiveDeck({}));
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
            {decks?.map((e, i) => <div key={i}><div key={i} onClick={(e) => findSelectedDeck(e.target.id, decks)} id={e.id}>{e.name}
            </div>
                <button id={e.id} onClick={(e) => { removeDeck(userId, e.target.id) }}>delete</button>
            </div>
            )}
            <button onClick={() => openNewDeckTemplate()}>
                Nuevo mazo
            </button>
        </ul>

        {/* CREACION DE MAZO */}
        <div className={css.actualDeckContainer}>
            <input id='newDeckName' onChange={(e) => {
                creatingDeck ?
                    setNewDeckName(e.target.value) :
                    changeDeckName(e.target.value)
            }} placeholder="Nombra el mazo"></input>
            <div className={css.cardsContainer}>
                {creatingDeck ? newDeckCards?.map((e, i) => (
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
                )) : updatingDeck.cards ?
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

                {(!creatingDeck && activeDeck?.id !== selectedDeck?.id) && <button onClick={() => { dispatch(setActiveDeck(selectedDeck)) }}>Usar</button>}
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