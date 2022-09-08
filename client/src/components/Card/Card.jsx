import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { detailCard } from "../../redux/actions/cards/detailCard.js";
import { getOpinions } from "../../redux/actions/cards/opinion.js";
import DetailPopUp from "../Detail/DetailPopUp.jsx";

import css from "./Card.module.css";

export default function Card({
  id,
  name,
  image,
  cost,
  Gdmg,
  Admg,
  life,
  ability,
  abilities,
  race,
  movement,
}) {
  const dispatch = useDispatch();
  const [viewDetail, setViewDetail] = useState(false);

  function handleDetail() {
    dispatch(detailCard(id));
    dispatch(getOpinions(id));
  }

  function ver() {
    setViewDetail(!viewDetail);
  }

  function todo() {
    handleDetail();
    ver();
  }

  const cardCss =
    race === "Zerg"
      ? css.zergCard
      : race === "Terran"
      ? css.terranCard
      : css.protossCard;

  return (
    <>
      <div className={css.Card}>
        <div className={`${cardCss} ${css.cardContainer}`} onClick={todo}>
          <div className={css.nameContainer}>
            <h3 className={css.name}>{name}</h3>
            <span className={css.cost}>{cost}</span>
          </div>
          <img className={css.img} src={image} alt={image} />
          <span className={css.movement}>{movement}</span>
          <p className={css.ability}>{ability}</p>
          <div className={css.stats}>
            <span className={css.life}>{life}</span>
            <span className={css.dmg}>
              {Gdmg}/{Admg}
            </span>
          </div>
        </div>
      </div>
      {viewDetail && (
        <DetailPopUp
          handleDetail={ver}
          id={id}
          name={name}
          image={image}
          cost={cost}
          Gdmg={Gdmg}
          Admg={Admg}
          life={life}
          ability={ability}
          abilities={abilities}
          race={race}
          movement={movement}
        />
      )}
    </>
  );
}
