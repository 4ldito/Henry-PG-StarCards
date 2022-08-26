import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saleCard } from "../../redux/actions/cards/userCards";
import SaleCard from "../Shop/SaleCard/SaleCard";
import Card from "./Card";

export function CardContainer({ card, repeat }) {
  const dispatch = useDispatch();
  const [viewCard, setViewCard] = useState(false);

  function handleViewCard() {
    setViewCard(!viewCard);
  }

  function Sale() {
    dispatch(
      saleCard({
        id: card.id,
        status: "onSale",
      })
    );
  }
  return (
    <>
      {repeat > 1 && <label style={{ fontSize: "50px" }}>{repeat}</label>}

      <Card
        id={card?.id}
        name={card?.name}
        image={card?.image}
        cost={card?.cost}
        Gdmg={card?.Gdmg}
        Admg={card?.Admg}
        life={card?.life}
        ability={card?.ability}
        abilities={card?.abilities}
        race={card?.race}
        movement={card?.movement}
      />
      <button onClick={handleViewCard}>Sale</button>

      {viewCard && (
        <SaleCard
          handleViewCard={handleViewCard}
          id={card.id}
          name={card.name}
          image={card.image}
        />
      )}
    </>
  );
}
