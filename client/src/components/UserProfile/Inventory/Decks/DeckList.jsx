import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SelectedDeck from "./SelectedDeck";
import {deleteDeck, createDeck, getUserDecks} from '../../../../redux/actions/user'
import { CardContainer } from "../../../Card/CardContainer";



function DeckList({userId,enableAddButton,bothStacks,showCards,newDeckCards,creatingDeck,setCreatingDeck}) {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.userReducer.decks);
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [newDeckName, setNewDeckName] = useState();

    function createNewDeck(userId,deck,name){
       
        if(name && deck.length){
            dispatch(createDeck(userId,deck,name));
            // dispatch(getUserDecks(userId));
        }
    }

    function findSelectedDeck(id,userDecks) {
        const deck = userDecks.find(e =>id == e.id);
        setSelectedDeck(deck);
    }

    function openNewDeckTemplate(){
        if(!bothStacks)showCards('cartas');
        setCreatingDeck(true);
        enableAddButton(true)
    }

    
    return <div style={{ height: '100px', width: '200px', backroundColor: '#333', color: 'white' }}>

        {/* CREACION DE MAZO */}
        <div>
            <input onChange={(e)=>setNewDeckName(e.target.value)} placeholder="Nombra el mazo"></input>
            {newDeckCards?.map((e,i)=><CardContainer key={i} inDeck={true} card={e}></CardContainer>)}
            <button onClick={()=>{createNewDeck(userId,newDeckCards,newDeckName)}}>Guardar</button>
        </div>

        {/* LISTADO DE MAZOS */}

        <ul>
            {decks?.map((e, i) => <div key={i}><div key={i} onClick={(e) => findSelectedDeck(e.target.id,decks)} id={e.id}>{e.name}
            </div>
            <button id= {e.id} onClick={(e)=>{dispatch(deleteDeck(userId, e.target.id))}}>delete</button>
            </div>
            )}
        </ul>

        {/* BOTON DE CREACION DE NUEVO MAZO */}
        <div onClick={()=>openNewDeckTemplate()}>
            Nuevo mazo
        </div>

        {selectedDeck&&<>
        <SelectedDeck  deck={selectedDeck}></SelectedDeck>
        </>
        }
    </div>      

}

export default DeckList;