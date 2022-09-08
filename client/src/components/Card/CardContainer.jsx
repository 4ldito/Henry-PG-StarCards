import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";
import SaleCard from "./../UserProfile/Inventory/SaleCard/SaleCard";

import css from "./CardContainer.module.css";
import { CardContainerDetail } from "./CardContainerDetail.jsx";

export function CardContainer({
  bothStacks,
  card,
  uCard,
  repeat,
  addButton,
  addCardToDeck,
  inDeck,
  removeCardFromDeck,
  creatingDeck,
  updatingDeck,
  newDeckCards,
  actualStackToShow,
}) {
  const selectedDeck = useSelector((state) => state.userReducer.selectedDeck);
  const [viewCard, setViewCard] = useState(false);
  const [thisCardRepeats, setThisCardRepeats] = useState(0);
  const [
    newRepeatForThoseWichAreNotInDeck,
    setNewRepeatForThoseWichAreNotInDeck,
  ] = useState(0);
  const [cardsRepeat, setcardsRepeat] = useState(null);
  const [justPassin, setJustPassin] = useState(null);
  const [viewDetail, setViewDetail] = useState(false);

  useEffect(() => {
    if (creatingDeck) {
      // setUserCard(newDeckCards?.find(el => el.id === card.id));
    } else {
      if (selectedDeck && selectedDeck.cardRepeats) {
        setcardsRepeat(JSON.parse(selectedDeck?.cardRepeats));
      }
    }

    if (!inDeck) {
      // console.log('hola afuera');
      if (!creatingDeck) {
        if (updatingDeck?.cards) {
          const cardToAdd = updatingDeck.cards.find((e) => e.id === card.id);
          setNewRepeatForThoseWichAreNotInDeck(
            cardToAdd ? repeat - cardToAdd.repeat : repeat
          );
        } else if (selectedDeck?.UserCards) {
          // console.log('esta entrando aca si');
          const cardRepeats = JSON.parse(selectedDeck.cardRepeats);
          const cuca = cardRepeats.find((e) => e.userCard.CardId === card.id);
          setNewRepeatForThoseWichAreNotInDeck(
            cuca ? repeat - cuca.repeat : repeat
          );
        }
      } else {
        const cardInDeckRepeats = newDeckCards?.find((e) => e.id === card.id);
        setNewRepeatForThoseWichAreNotInDeck(
          cardInDeckRepeats ? repeat - cardInDeckRepeats.repeat : repeat
        );
      }
    }
  }, [selectedDeck, newDeckCards, updatingDeck?.cards]);

  useEffect(() => {
    if (inDeck) {
      setNewRepeatForThoseWichAreNotInDeck(1);
    }
    if (newRepeatForThoseWichAreNotInDeck >= 1) {
      setJustPassin(false);
    }
  }, [newRepeatForThoseWichAreNotInDeck]);

  useEffect(() => {
    let userCardRepeats = {};
    if (cardsRepeat && uCard)
      userCardRepeats = cardsRepeat?.find((el) => el.userCard.id === uCard.id);

    setThisCardRepeats(userCardRepeats?.repeat);
    // console.log(cardsRepeat);
  }, [cardsRepeat]);

  useEffect(() => {
    if (!inDeck) {
      setJustPassin(true);
    }
  }, []);

  function handleViewCard() {
    setViewCard(!viewCard);
  }

  function ver() {
    setViewDetail(!viewDetail);
  }

  return (
    (newRepeatForThoseWichAreNotInDeck || justPassin) && (
      <>
        <div className={bothStacks ? css.cardsAnDeckContainer : css.container}>
          {(newRepeatForThoseWichAreNotInDeck || justPassin) && (
            <>
              <div
                className={
                  bothStacks
                    ? !inDeck
                      ? css.repeatOutDeck
                      : css.repeat
                    : css.repeatWithCard
                }
              >
                {inDeck ? (
                  creatingDeck || updatingDeck?.cards ? (
                    <label>{repeat > 1 && repeat}</label>
                  ) : (
                    <label>{thisCardRepeats > 1 && thisCardRepeats}</label>
                  )
                ) : (
                  repeat > 1 && (
                    <label>{newRepeatForThoseWichAreNotInDeck || repeat}</label>
                  )
                )}
              </div>
              {addButton && !selectedDeck?.name && (
                <button
                  className={css.añadirAlMazoBtn + " material-symbols-outlined"}
                  onClick={() => {
                    addCardToDeck(card, repeat);
                  }}
                >
                  Trending Flat
                </button>
              )}
              {actualStackToShow.length === 1 ? (
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
              ) : (
                <div
                  className={css.cardInDeck}
                  onClick={() => {
                    setViewDetail(!viewDetail);
                  }}
                >
                  <h2 className={css.cardInDeckH1}>{card.name}</h2>
                  <div className={css.cardInDeckLabel}>
                    {card.race === "Terran" ? (
                      <img
                        className={css.raceImg}
                        src="/src/img/terran.svg"
                      ></img>
                    ) : card.race === "Zerg" ? (
                      <img
                        className={css.raceImg}
                        src="/src/img/zerg.svg"
                      ></img>
                    ) : (
                      card.race === "Protoss" && (
                        <img
                          className={css.raceImg}
                          src="/src/img/protoss.svg"
                        ></img>
                      )
                    )}
                  </div>
                </div>
              )}
              {inDeck && !selectedDeck?.name && bothStacks && (
                <button
                  className={css.sacarDelMazoBtn + " material-symbols-outlined"}
                  onClick={() => {
                    selectedDeck.name
                      ? removeCardFromDeck(
                          card.id,
                          (!updatingDeck?.cards && uCard.id) || undefined
                        )
                      : removeCardFromDeck(card.id);
                  }}
                >
                  trending_flat
                </button>
              )}
            </>
          )}
          {!inDeck && actualStackToShow.length === 1 && (
            <button onClick={handleViewCard}>{"Sell card"}</button>
          )}
        </div>
        {bothStacks && (
          <CardContainerDetail
            card={card}
            bothStacks={bothStacks}
            viewDetail={viewDetail}
          />
        )}
        {viewCard && <SaleCard handleViewCard={handleViewCard} card={card} />}
      </>
    )
  );
}
