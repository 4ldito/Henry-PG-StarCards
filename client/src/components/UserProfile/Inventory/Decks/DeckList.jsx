import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SelectedDeck from "./SelectedDeck";
import { deleteDeck, createDeck, getUserDecks, setActiveDeck } from '../../../../redux/actions/user'
import { CardContainer } from "../../../Card/CardContainer";
import css from './DeckList.module.css'

let justCreated = false;

function DeckList({ userId, enableAddButton, bothStacks, showCards, newDeckCards,removeCardFromDeck, setNewDeckCards, creatingDeck, setCreatingDeck }) {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.userReducer.decks);
    const activeDeck = useSelector(state => state.userReducer.activeDeck);
    const [selectedDeck, setSelectedDeck] = useState([]);
    const [newDeckName, setNewDeckName] = useState();
    
    useEffect(() => {
        setSelectedDeck(activeDeck)
        document.querySelector('#newDeckName').value = activeDeck.name;
    }, [])

    useEffect(() => {
        if (!justCreated && selectedDeck && !decks.includes(e => e.id === selectedDeck.id)) {
            setSelectedDeck(activeDeck)
        };
        justCreated = false
    }, [decks, activeDeck]);

    function createNewDeck(userId, deck, name) {
        if (name && deck.length) {
            dispatch(createDeck(userId, deck, name));
            const newDeck = { Cards: deck, name };
            setNewDeckCards([]);
            setCreatingDeck(false);
            setSelectedDeck(newDeck);
            justCreated = true;
        }
    }

    function removeDeck(userId, deckId) {
        if (activeDeck.id == deckId) dispatch(setActiveDeck({}));
        if (selectedDeck.id === deckId) setSelectedDeck(activeDeck[0]);
        document.querySelector('#newDeckName').value = activeDeck.name;
        dispatch(deleteDeck(userId, deckId))
    }

    function findSelectedDeck(id, userDecks) {
        const deck = userDecks.find(e => id == e.id);
        setSelectedDeck(deck);
        setCreatingDeck(false);
        document.querySelector('#newDeckName').value = deck.name;
    }

    function openNewDeckTemplate() {
        if (!bothStacks) showCards('cartas');
        setCreatingDeck(true);
        enableAddButton(true);
        setNewDeckCards([]);
        setSelectedDeck([]);
        setNewDeckName('');
        document.querySelector('#newDeckName').value = '';
    }

    return <div className={css.allContainer}>

        {/* CREACION DE MAZO */}
        <div>
            <input id='newDeckName' onChange={(e) => setNewDeckName(e.target.value)} placeholder="Nombra el mazo"></input>
            <div className={css.actualDeckContainer}>
                {creatingDeck ? newDeckCards?.map((e, i) => <CardContainer removeCardFromDeck={removeCardFromDeck} key={i} inDeck={true} repeat={e.repeat} card={e}></CardContainer>) :
                    selectedDeck?.Cards?.map((e, i) => {
                    return <CardContainer key={i} inDeck={true} card={e} repeat={e.repeat}></CardContainer>})}
            
                {(!creatingDeck && activeDeck.id !== selectedDeck.id) && <button onClick={() => { dispatch(setActiveDeck(selectedDeck)) }}>Usar</button>}
            </div>
            <button onClick={() => { createNewDeck(userId, newDeckCards, newDeckName) }}>Guardar</button>
        </div>

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

        {/* BOTON DE CREACION DE NUEVO MAZO */}

    </div>

}

export default DeckList;