import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SelectedDeck from "./SelectedDeck";
import {deleteDeck} from '../../../../redux/actions/user'
import { CardContainer } from "../../../Card/CardContainer";



function DeckList({userId,enableAddButton,bothStacks,showCards,newDeckCards}) {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.userReducer.decks);
    const [selectedDeck, setSelectedDeck] = useState(null);
    function findSelectedDeck(id,userDecks) {
        const deck = userDecks.find(e =>id == e.id);
        setSelectedDeck(deck);
    }

    function openNewDeckTemplate(){
        if(!bothStacks)showCards('cartas');
        enableAddButton(true)
    }
    
    return <div style={{ height: '100px', width: '200px', backroundColor: '#333', color: 'white' }}>
        <div>
            {newDeckCards?.map((e,i)=><CardContainer key={i} card={e}></CardContainer>)}
        </div>
        <ul>
            {decks?.map((e, i) => <div key={i}><div key={i} onClick={(e) => findSelectedDeck(e.target.id,decks)} id={e.id}>{e.name}
            </div>
            <button id= {e.id} onClick={(e)=>{dispatch(deleteDeck(userId, e.target.id))}}>delete</button>
            </div>
            )}
        </ul>
        <div onClick={()=>openNewDeckTemplate()}>
            Nuevo mazo
        </div>

        {selectedDeck&&<>
        <SelectedDeck deck={selectedDeck}></SelectedDeck>
        </>
        }
    </div>      
}

export default DeckList;