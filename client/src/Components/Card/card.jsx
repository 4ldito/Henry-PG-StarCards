import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { detailCard } from "../../redux/actions/cards/detailCard.js";
import { getOpinions } from "../../redux/actions/cards/getOpinions.js";
import DetailPopUp from "../Detail/DetailPopUp.jsx";

import css from "./Card.module.css";

export default function Card({ id }) {
  const allCards = useSelector((state) => state.album.filteredCards);
  const card = allCards.find((c) => c.id === id);
  const [viewDetail, setViewDetail] = useState(false);
  // const handleSeeDetail = (e) => {
  //   setViewDetail(!viewDetail);
  // };

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailCard(null));
  }, []);

  function handleDetail() {
    dispatch(detailCard(id));
    dispatch(getOpinions(id));
    setViewDetail(!viewDetail);
  }

  const cardCss =
    card?.race === "Zerg"
      ? css.zergCard
      : card?.race === "Terran"
      ? css.terranCard
      : css.protossCard;

  return (
    <>
      <div
        className={`${cardCss} ${css.cardContainer}`}
        onClick={handleDetail}
      >
        <div className={css.nameContainer}>
          <h3 className={css.name}>{card?.name}</h3>
          <span className={css.cost}>{card?.cost}</span>
        </div>
        <img className={css.img} src={card?.image} alt={card?.image} />
        <span className={css.movement}>{card?.movement}</span>
        <p className={css.ability}>{card?.ability}</p>
        <div className={css.stats}>
          <span className={css.life}>{card?.life}</span>
          <span className={css.dmg}>
            {card?.Gdmg}/{card?.Admg}
          </span>
        </div>
      </div>
      {viewDetail && <DetailPopUp handleDetail={handleDetail} />}
    </>
  );
}
