import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cleanMsgUserCards } from "../../redux/actions/cards/userCards";

import Card from "./Card";
import SaleCard from './../UserProfile/Inventory/SaleCard/SaleCard';

import css from './CardContainer.module.css'

export function CardContainer({ card, uCard, repeat, addButton, addCardToDeck, inDeck, removeCardFromDeck, creatingDeck, newDeckCards }) {
  const dispatch = useDispatch();
  const selectedDeck = useSelector(state => state.userReducer.selectedDeck);
  const [viewCard, setViewCard] = useState(false);
  const [userCard, setUserCard] = useState(null);
  const [cardRepeats,setCardRepeats] = useState(1);
  const msg = useSelector((state) => state.album.msg);

  useEffect(() => {

    if (creatingDeck) {
      setUserCard(newDeckCards.find(el => el.id === card.id));
    } else {
      
      if(selectedDeck && selectedDeck.cardRepeats && uCard){
        setCardRepeats(JSON.parse(selectedDeck?.cardRepeats)); 
      }
      
    }
    
  }, [selectedDeck,newDeckCards]);
  useEffect(()=>{
    
    if(cardRepeats)console.log(cardRepeats);
    // setUserCard(cardRepeats?.find(el => el.userCardId === uCard.id));

  },[cardRepeats]);

  function handleViewCard() {
    setViewCard(!viewCard);
  }

  return (
    <div className={css.container}>
      {repeat > 1 && <label style={{ fontSize: "50px" }}>{userCard && !inDeck ? repeat - cardRepeats : repeat}</label>}
      {addButton && <button onClick={() => addCardToDeck(card)}>Añadir al mazo</button>}
      <Card
        id={card.id}
        name={card.name}
        image={card.image}
        cost={card.cost}
        Gdmg={card.Gdmg}
        Admg={card.Admg}
        life={card.life}
        ability={card.ability}
        abilities={card.abilities}
        race={card.race}
        movement={card.movement}
      />
      {!inDeck && <button onClick={handleViewCard}>{'Vender'}</button>}
      {inDeck && <button onClick={() => { removeCardFromDeck(card.id) }}>Sacar del mazo</button>}
      {viewCard && (
        <SaleCard
          handleViewCard={handleViewCard}
          card={card}
        />
      )}
    </div>
  );
}
