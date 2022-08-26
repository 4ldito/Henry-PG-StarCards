import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saleCard } from "../../redux/actions/cards/userCards";
import Card from "./Card";

export function CardContainer({ card, repeat }) {

  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.id);

  function handleCardSale(status) {
    dispatch(saleCard({ userId, userCardId: card.userCard.id, status })
    );
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
      {card.userCard.statusId === 'active' ? <button onClick={() => handleCardSale('onSale')}>Sale</button>
        : <button onClick={() => handleCardSale('active')}>Quitar de en venta</button>}
    </>
  );
}
