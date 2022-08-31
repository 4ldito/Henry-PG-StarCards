import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllCards from "../../redux/actions/cards/getAllCards";

import logo from "../../img/logo-15.png";
import prev from "../../img/prev.svg";
import next from "../../img/next.svg";

import css from "./landingPage.module.css";
import Card from "../Card/Card";

export default function LandingPage() {
  // const [limit, setLimit] = useState({ min: 0, max: 3 });
  const allCards = useSelector((state) => state.album.filteredCards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCards());
  }, []);
  return (
    <>
      <div className={css.containerLandingPage}>
        <div className={css.LandingPage}>
          <img className={css.logo} src={logo} alt="Logo" />
          <div>
            <h1>EL JUEGO DE CARTAS DEL UNIVERSO STARCRAFT</h1>
          </div>
          <button>JUGAR</button>
        </div>
      </div>
      <div className={css.container}>
        <div className={css.containerTitle}>
          <h1>
            JUGA ONLINE CONTRA OTROS JUGADORES USANDO TUS PERSONAJES FAVORITOS
          </h1>
        </div>
        <div className={css.containerCards}>
          <div className={css.arrow}>
            <img src={prev} alt="" />
          </div>
          <div className={css.cards}>
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
          <div className={css.arrow}>
            <img src={next} alt="" />
          </div>
        </div>
        <div className={css.containerTitle}>
          <h1>
            ELEGÍ PROTOSS, TERRAN O ZERG PARA ARMAR TU MAZO Y COMPETIR
          </h1>
        </div>
        <div className={css.containerCards}>
          
        </div>
      </div>
    </>
  );
}
