import React, { useEffect, useRef, useState } from "react";
import getAllCards from "../../redux/actions/cards/getAllCards";

import logo from "../../img/logo-15.png";
import nave1 from "../../img/nave.png";
import nave2 from "../../img/nave2.png";
import nave3 from "../../img/nave3.png";
import prev from "../../img/prev.svg";
import next from "../../img/next.svg";

import css from "./landingPage.module.css";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";

export default function LandingPage() {
  const nave1ref = useRef(null);
  const [tamaño, setTamaño] = useState("50.5%");
  const allCards = useSelector((state) => state.album.filteredCards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCards());
  }, []);

  useEffect(() => {
    function handleScroll() {
      const nave = nave1ref.current;
      const { y } = nave.getBoundingClientRect();
      console.log(y);

      const cambioTamaño = y < 341 ? "50%" : "50.5%";
      setTamaño(cambioTamaño);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={css.containerLandingPage}>
        <div className={css.LandingPage}>
          <img className={css.logo} src={logo} alt="Logo" />
          <div>
            <h1>EL JUEGO DE CARTAS DEL UNIVERSO STARCRAFT</h1>
          </div>
          <div className={css.divBtn}>
            <button>JUGAR</button>
          </div>
        </div>
        <img
          ref={nave1ref}
          style={{ width: tamaño }}
          className={css.nave1}
          src={nave1}
          alt=""
        />
        <img className={css.nave3} src={nave3} alt="" />
      </div>
      <div className={css.container}>
        <div className={css.containerTitle}>
          <img className={css.nave2} src={nave2} alt="" />
          <h1>
            JUGA ONLINE CONTRA OTROS JUGADORES USANDO TUS PERSONAJES FAVORITOS
          </h1>
        </div>
        <div className={css.containerCardsTo}>
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
        </div>
        <div className={css.containerTitleDown}>
          <h1>ELEGÍ PROTOSS, TERRAN O ZERG PARA ARMAR TU MAZO Y COMPETIR</h1>
        </div>
        <div className={css.containerCards}></div>
      </div>
    </>
  );
}
