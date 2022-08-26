import React from "react";
import {useSelector,useDispatch} from 'react-redux'



function DeckList(){
    const decks = useSelector(state=>state.userReducer.decks);
    return <div style={{height:'100px', width: '200px', backroundColor:'#333', color:'white'}}>
        <ul>
            {decks?.map(e=><li name={e.name}>{e.name}</li>)}
        </ul>
    </div>
}

export default DeckList;