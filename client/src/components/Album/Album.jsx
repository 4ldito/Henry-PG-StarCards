import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getAllCards from "../../redux/actions/cards/getAllCards";
import Card from "../Card/Card";

import css from "./Album.module.css";

export default function Album() {
  const allCards = useSelector((state) => state.album.filteredCards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCards());
  }, []);

  return (
    <div className={css.cartas}>
      {allCards.map((card, index) => {
        return (
          <Card
            tamanho={1}
            key={card.id}
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
        );
      })}
    </div>
  );
}
