import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { detailCard } from "../../redux/actions/cards/detailCard";
import getAllCards from "../../redux/actions/cards/getAllCards";
// import { getOpinions } from "../../redux/actions/cards/getOpinions";
import Card from "../Card/Card";
// import DetailPopUp from "../Detail/DetailPopUp";

import css from "./Album.module.css";

const Album = () => {
  const cardsPerPage = 4;
  const [limit, setLimit] = useState({ min: 0, max: cardsPerPage - 1 });
  const allCards = useSelector((state) => state.album.filteredCards);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(detailCard(null));
  //   dispatch(getOpinions(null));
  // }, []);

  useEffect(() => {
    dispatch(getAllCards());
  }, []);

  useEffect(() => {
    setLimit({ min: 0, max: cardsPerPage - 1 });
  }, [allCards]);

  function pag(e) {
    e.preventDefault();
    const valuePag = Number(e.target.innerText);
    let min = (valuePag - 1) * cardsPerPage;
    let max = valuePag * cardsPerPage - 1;
    if (valuePag === 1) {
      min = 0;
      max = cardsPerPage - 1;
    }
    setLimit({ min, max });
  }

  function pagBack(e) {
    e.preventDefault();
    let min = limit.min - cardsPerPage;
    let max = limit.max - cardsPerPage;
    if (min < 0) {
      min = 0;
      max = cardsPerPage - 1;
    }
    setLimit({ min, max });
  }

  function pagNext(e) {
    e.preventDefault();

    let last = Math.ceil(allCards.length / cardsPerPage) * cardsPerPage - 1;

    let min = limit.min + cardsPerPage;
    let max = limit.max + cardsPerPage;

    if (limit.max >= last && limit.min >= last - cardsPerPage) {
      min = limit.min;
      max = limit.max;
    }

    setLimit({ min, max });
  }

  function paginated() {
    const TotalPag = allCards.length / cardsPerPage;
    const button = [];
    button.push(
      <button className={css.pag} key="back" onClick={pagBack}>
        {"<"}
      </button>
    );
    for (let i = 0; i < TotalPag; i++) {
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
    <>
      <div>
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

        <div className={css.paginated}>{paginated()}</div>
      </div>
    </>
  );
};

export default Album;
