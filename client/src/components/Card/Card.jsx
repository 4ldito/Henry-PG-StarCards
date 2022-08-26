import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailCard } from "../../redux/actions/cards/detailCard.js";
import { getOpinions } from "../../redux/actions/cards/opinion.js";
// import { getUserCards } from "../../redux/actions/cards/userCards.js";
import DetailPopUp from "../Detail/DetailPopUp.jsx";

import css from "./Card.module.css";

export default function Card({ id, name, image, cost, Gdmg, Admg, life, ability, abilities, race, movement }) {
  const dispatch = useDispatch();
  // const allCards = useSelector((state) => state.album.filteredCards);
  // const cards = useSelector((state) => state.album.cards);
  // const user = useSelector((state) => state.userReducer.user);
  // const card = allCards.find((c) => c.id === id);
  // const userCards = useSelector((state) => state.album.userCards);
  const [viewDetail, setViewDetail] = useState(false);
  // const [haveCard, setHaveCard] = useState(false);

  // useEffect(() => {
  //   if (user.id) {
  //     dispatch(getUserCards(user.UserCards, cards));
  //     userCards?.forEach((card) => {
  //       if (card.id === id) {
  //         setHaveCard(true);
  //       }
  //     });
  //   }
  // }, [cards]);

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
        {/* {haveCard ? (
          <span className={css.haveCard}>You have this card</span>
        ) : (
          <span className={css.haveCard}>You don't have this card</span>
        )} */}
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
      {viewDetail && <DetailPopUp handleDetail={ver} />}
    </>
  );
}
