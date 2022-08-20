import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllCards from "../../redux/actions/cards/getAllCards";
import Card from "../Card/Card";
import FilterByRace from "../Inventory/Filter";
import SearchCard from "../Inventory/SearchCard";
import SortCards from "../Inventory/sort";

import css from "./About.module.css";

export default function About() {
  const [limit, setLimit] = useState({ min: 0, max: 2 });
  const allCards = useSelector((state) => state.inventory.filteredCards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCards());
    // eslint-disable-next-line
  }, []);

  function pag(e) {
    e.preventDefault();
    const valuePag = Number(e.target.innerText);
    let min = (valuePag - 1) * 3;
    let max = valuePag * 3 - 1;
    if (valuePag === 1) {
      min = 0;
      max = 2;
    }
    setLimit({ min, max });
    console.log(limit);
  }

  function pagBack(e) {
    e.preventDefault();
    let min = limit.min - 3;
    let max = limit.max - 3;
    if (min < 0) {
      min = 0;
      max = 2;
    }
    setLimit({ min, max });
    console.log(limit);
  }

  function pagNext(e) {
    e.preventDefault();

    let last = Math.ceil(allCards.length / 3) * 3 - 1;

    let min = limit.min + 3;
    let max = limit.max + 3;

    if (limit.max >= last && limit.min >= last - 3) {
      min = limit.min;
      max = limit.max;
    }

    setLimit({ min, max });
    console.log(last);
  }

  function paginado() {
    const TotalPag = allCards.length / 3;
    const button = [];
    button.push(
      <button className={css.pag} key="back" onClick={pagBack}>
        {"<"}
      </button>
    );
    for (let i = 0; i < TotalPag; i++) {
      //Creo un "button" por cada paginado y lo pusheo al array "button"
      button.push(
        <button className={css.pag} key={i} onClick={pag}>
          {i + 1}
        </button>
      );
    }
    button.push(
      <button className={css.pag} key="next" onClick={pagNext}>
        {">"}
      </button>
    );
    return button;
  }
  return (
    <div className={css.about}>
      <div className={css.secciones}>
        <button className={css.seccion}>Album</button>
        <button className={css.seccion}>Reglas</button>
        <button className={css.seccion}>Equipo</button>
      </div>
      <div className={css.seccionesLow}>
        <div className={css.filtros}>
          <SearchCard />
          <SortCards />
          <FilterByRace />
        </div>
        <div className={css.inventario}>
          <div className={css.cartas}>
            {allCards.map((card, index) => {
              if (index <= limit.max && index >= limit.min) {
                return (
                  <Card
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
              }
            })}
          </div>
          <div className={css.paginado}>{paginado()}</div>
        </div>
      </div>
    </div>
  );
}
