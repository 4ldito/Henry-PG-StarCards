import React from "react";
import Card from "../../../Card/Card";
import { CardContainer } from "../../../Card/CardContainer";


function SelectedDeck({deck}){
    
    return <div>
        {deck.Cards?.map((e,i)=><CardContainer inDeck={true} key={i} card={e}></CardContainer>)}

    </div>
}

export default SelectedDeck;