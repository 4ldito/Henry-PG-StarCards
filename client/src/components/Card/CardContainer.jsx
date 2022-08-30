import React, { useState } from "react";
import Card from "./Card";
// import { useDispatch } from "react-redux";
import SaleCard from './../UserProfile/Inventory/SaleCard/SaleCard';
import css from './CardContainer.module.css'
export function CardContainer({ card,repeat, addButton, addCardToDeck, inDeck, tamanho,maxT,removeCardFromDeck}) {
  // const dispatch = useDispatch();
  const [viewCard, setViewCard] = useState(false);

  function handleViewCard() {
    setViewCard(!viewCard);
  }
  // console.log(repeat);
  // console.log(card.repeat)
  return (
    <div className={css.container}>
      {repeat > 1 && <label style={{ fontSize: "50px" }}>{repeat}</label>}
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
      {inDeck && <button onClick={()=>{removeCardFromDeck(card.id)}}>Sacar del mazo</button>}
      {viewCard && (
        <SaleCard
          handleViewCard={handleViewCard}
          card={card}
        />
      )}
    </div>
  );
}
