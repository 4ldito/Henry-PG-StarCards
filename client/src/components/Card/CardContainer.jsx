import React, { useState } from "react";
import SaleCard from "../Shop/SaleCard/SaleCard";
import Card from "./Card";

export function CardContainer({ card, repeat }) {
  const [viewCard, setViewCard] = useState(false);

  function handleViewCard() {
    setViewCard(!viewCard);
  }
  
  return (
    <>
      {repeat > 1 && <label style={{ fontSize: "50px" }}>x{repeat}</label>}
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
      <button onClick={handleViewCard}>{card.userCard.statusId === 'active' ? 'Vender' : 'Quitar de en venta'}</button>
      {viewCard && (
        <SaleCard
          handleViewCard={handleViewCard}
          cardId={card.id}
          name={card.name}
          image={card.image}
        />
      )}
    </>
  );
}
