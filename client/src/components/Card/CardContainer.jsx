import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cleanMsgUserCards } from "../../redux/actions/cards/userCards";

import Card from "./Card";
import SaleCard from './../UserProfile/Inventory/SaleCard/SaleCard';

import css from './CardContainer.module.css'

export function CardContainer({ card, repeat, addButton, addCardToDeck, inDeck, removeCardFromDeck, creatingDeck, newDeckCards }) {
  const dispatch = useDispatch();
  const selectedDeck = useSelector(state => state.userReducer.selectedDeck);
  const [viewCard, setViewCard] = useState(false);
  const msg = useSelector((state) => state.album.msg);

  function handleViewCard() {
    setViewCard(!viewCard);
  }

  let userCard;
  if(creatingDeck){
    userCard = newDeckCards.find(el => el.id === card.id)
  }else{
    userCard = selectedDeck?.UserCards?.find(el => el.CardId === card.id);
  }
  console.log(userCard?.repeat);
  const repeatToShow = repeat;

  return (
    <div className={css.container}>
      {repeat > 1 && <label style={{ fontSize: "50px" }}>{userCard && !inDeck ? repeatToShow - userCard?.repeat : repeat}</label>}
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
