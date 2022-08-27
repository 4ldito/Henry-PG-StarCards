import React from "react";
import { useDispatch } from "react-redux";
import { saleCard } from "../../redux/actions/cards/userCards";
import Card from "./Card";

export function CardContainer({ card, repeat,addButton,addCardToDeck}) {
  const dispatch = useDispatch();
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
      {addButton && <button onClick={()=>addCardToDeck(card)}>Añadir al mazo</button>}
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
      <button onClick={Sale}>Sale</button>
      
    </>
  );
}
