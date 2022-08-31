import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cleanMsgUserCards } from "../../redux/actions/cards/userCards";

import Card from "./Card";
import SaleCard from './../UserProfile/Inventory/SaleCard/SaleCard';

import Swal from "sweetalert2";
import css from './CardContainer.module.css'

export function CardContainer({ card, repeat, addButton, addCardToDeck, inDeck, tamanho, maxT, removeCardFromDeck }) {
  const dispatch = useDispatch();

  console.log('render');

  const [viewCard, setViewCard] = useState(false);
  const msg = useSelector((state) => state.album.msg);

  function handleViewCard() {
    setViewCard(!viewCard);
  }

  // useEffect(() => {
  //   console.log("msg")
  //   if (msg.type) {
  //     dispatch(cleanMsgUserCards());
  //     Swal.fire({
  //       title: msg.title,
  //       text: msg.info,
  //       icon: msg.type,
  //     });
  //     if (msg.type === 'success') setViewCard(false);
  //   }
  // }, [msg]);

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
