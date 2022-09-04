import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SelectedDeck from "./SelectedDeck";
import { deleteDeck, createDeck, getUserDecks, setActiveDeck, setNewSelectedDeck } from '../../../../redux/actions/user'
import { CardContainer } from "../../../Card/CardContainer";
import css from './DeckList.module.css'

let justCreated = false;

function DeckList({ userId, selectedDeck, enableAddButton, bothStacks, showCards,
    newDeckCards, removeCardFromDeck, setNewDeckCards, creatingDeck, setCreatingDeck,setUpdatingdeck}) {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.userReducer.decks);
    const cards = useSelector(state => state.album.cards);
    const activeDeck = useSelector(state => state.userReducer.activeDeck);
    const [newDeckName, setNewDeckName] = useState();

    useEffect(() => {
        // setSelectedDeck(activeDeck)
        document.querySelector('#newDeckName').value = activeDeck.name;
    }, [])

    useEffect(() => {
        if (!justCreated && selectedDeck && !decks.includes(e => e.id === selectedDeck.id)) {
            dispatch(setNewSelectedDeck(activeDeck))
        };
        justCreated = false
    }, [decks, activeDeck]);

    function createNewDeck(userId, deck, name) {
        if (name && deck.length) {
            dispatch(createDeck(userId, deck, name));
            setNewDeckCards([]);
            setCreatingDeck(false);
            dispatch(setNewSelectedDeck({}));

            // setSelectedDeck(newDeck);
            justCreated = true;
        }
    }

    function removeDeck(userId, deckId) {
        if (activeDeck.id == deckId) dispatch(setActiveDeck({}));
        if (selectedDeck.id === deckId) {
            // setSelectedDeck(activeDeck);
            dispatch(setNewSelectedDeck({}));
            dispatch(setNewDeckCards(activeDeck));
        };
        document.querySelector('#newDeckName').value = activeDeck.name;
        dispatch(deleteDeck(userId, deckId))
        dispatch(setNewSelectedDeck({}));
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
            <input id='newDeckName' onChange={(e) => setNewDeckName(e.target.value)} placeholder="Nombra el mazo"></input>
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
                )) :
                    selectedDeck?.UserCards?.map((e, i, array) => {
                        let card = cards.find(el => el.id === e.CardId);
                        return <CardContainer removeCardFromDeck={removeCardFromDeck} key={i} inDeck={true} card={card} uCard={e} repeat={e.repeat}></CardContainer>
                    })}

                {(!creatingDeck && activeDeck?.id !== selectedDeck?.id) && <button onClick={() => { dispatch(setActiveDeck(selectedDeck)) }}>Usar</button>}
            </div>
            <button onClick={() => { createNewDeck(userId, newDeckCards, newDeckName) }}>Guardar</button>
        </div>


        {/* BOTON DE CREACION DE NUEVO MAZO */}

    </div>

}

export default DeckList;