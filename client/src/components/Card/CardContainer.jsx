import React from "react";
import Card from "./Card";
export function CardContainer({ card, repeat }) {
  return <>

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


  </>
}