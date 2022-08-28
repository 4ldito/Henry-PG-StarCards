import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SelectedDeck from "./SelectedDeck";
import { deleteDeck, createDeck, getUserDecks,setActiveDeck } from '../../../../redux/actions/user'
import { CardContainer } from "../../../Card/CardContainer";



function DeckList({ userId, enableAddButton, bothStacks, showCards, newDeckCards,setNewDeckCards, creatingDeck, setCreatingDeck }) {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.userReducer.decks);
    const activeDeck = useSelector(state => state.userReducer.activeDeck);
    const [selectedDeck, setSelectedDeck] = useState([]);
    const [newDeckName, setNewDeckName] = useState();

    useEffect(() => {
        setSelectedDeck(activeDeck)
    },[])
    useEffect(() => {
        if (selectedDeck && !decks.includes(e => e.id === selectedDeck.id)) setSelectedDeck([]);

    }, [decks]);

    function createNewDeck(userId, deck, name) {
 
        if (name && deck.length) {
            dispatch(createDeck(userId, deck, name));
            setNewDeckCards([]);
            setCreatingDeck(false);
            setSelectedDeck(activeDeck);
            // document.querySelector('#newDeckName').value = '';
            // dispatch(getUserDecks(userId));
        }
    }
    function removeDeck(userId,deckId){
        if(selectedDeck.id===deckId)setSelectedDeck(activeDeck);
        dispatch(deleteDeck(userId, deckId))
    }
    function findSelectedDeck(id, userDecks) {
        const deck = userDecks.find(e => id == e.id);
        setSelectedDeck(deck);
        setCreatingDeck(false);
    }

    function openNewDeckTemplate() {
        if (!bothStacks) showCards('cartas');
        setCreatingDeck(true);
        enableAddButton(true);
        setNewDeckCards([]);
        setSelectedDeck([]);
    }


    return <div style={{ height: '100px', width: '200px', backroundColor: '#333', color: 'white' }}>

        {/* CREACION DE MAZO */}
        <div>
            <input id='newDeckName' onChange={(e) => setNewDeckName(e.target.value)} placeholder="Nombra el mazo"></input>
            {creatingDeck ? newDeckCards?.map((e, i) => <CardContainer key={i} inDeck={true} card={e}></CardContainer>) :
                selectedDeck?.Cards?.map((e, i) => <CardContainer key={i} inDeck={true} card={e}></CardContainer>)}
            {!creatingDeck&& <button onClick={()=>{dispatch(setActiveDeck(selectedDeck))}}>Usar</button>}
            <button onClick={() => { createNewDeck(userId, newDeckCards, newDeckName) }}>Guardar</button>
        </div>

        {/* LISTADO DE MAZOS */}

        <ul>
            {decks?.map((e, i) => <div key={i}><div key={i} onClick={(e) => findSelectedDeck(e.target.id, decks)} id={e.id}>{e.name}
            </div>
                <button id={e.id} onClick={(e) => { removeDeck(userId, e.target.id) }}>delete</button>
            </div>
            )}
        </ul>

        {/* BOTON DE CREACION DE NUEVO MAZO */}
        <div onClick={() => openNewDeckTemplate()}>
            Nuevo mazo
        </div>

    </div>

}

export default DeckList;