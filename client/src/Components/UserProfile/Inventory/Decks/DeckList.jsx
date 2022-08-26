import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SelectedDeck from "./SelectedDeck";


function DeckList() {
    const decks = useSelector(state => state.userReducer.decks);
    const [selectedDeck, setSelectedDeck] = useState(null);
    useEffect(() => { console.log(decks[3].Cards) }, [decks]);
    function findSelectedDeck(id,userDecks) {
        const deck = userDecks.find(e =>id == e.id);
        setSelectedDeck(deck);
    }
    
    return <div style={{ height: '100px', width: '200px', backroundColor: '#333', color: 'white' }}>
        <ul>
            {decks?.map((e, i) => <div key={i} onClick={(e) => findSelectedDeck(e.target.id,decks)} id={e.id}>{e.name}</div>)}
        </ul>
        {selectedDeck&&<SelectedDeck deck={selectedDeck}></SelectedDeck>}
    </div>
}

export default DeckList;