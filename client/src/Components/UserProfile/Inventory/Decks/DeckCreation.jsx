import React from "react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { CardContainer } from "../../../Card/CardContainer";
function DeckCreation({card}){
  

    return <div>
        {
            newDeckCards?.map((e,i)=>{<CardContainer card={card} key={i}></CardContainer>})
        }

    </div>
}