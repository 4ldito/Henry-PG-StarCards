import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Card from "./Card";
import SaleCard from './../UserProfile/Inventory/SaleCard/SaleCard';

import css from './CardContainer.module.css'


export function CardContainer({ card, uCard, repeat, addButton, addCardToDeck, inDeck, removeCardFromDeck, creatingDeck, newDeckCards }) {
  const dispatch = useDispatch();
  const selectedDeck = useSelector(state => state.userReducer.selectedDeck);
  const [viewCard, setViewCard] = useState(false);
  const [userCard, setUserCard] = useState(null);
  const [thisCardRepeats, setThisCardRepeats] = useState(0);
  const [newRepeatForThoseWichAreNotInDeck, setNewRepeatForThoseWichAreNotInDeck] = useState(0);
  const [cardsRepeat, setcardsRepeat] = useState(null);
  const [justPassin, setJustPassin] = useState(null);
  const msg = useSelector((state) => state.album.msg);

  useEffect(() => {


    if (creatingDeck) {
      setUserCard(newDeckCards?.find(el => el.id === card.id));
    } else {

      if (selectedDeck && selectedDeck.cardRepeats) {
        setcardsRepeat(JSON.parse(selectedDeck?.cardRepeats));
      }

    }

    if (!inDeck) {
      // console.log('hola afuera');
      if (!creatingDeck) {

        if (selectedDeck.UserCards) {
          const cardRepeats = JSON.parse(selectedDeck.cardRepeats);
          const cuca = cardRepeats.find(e => e.userCard.CardId === card.id);

          setNewRepeatForThoseWichAreNotInDeck(cuca ? (repeat - cuca.repeat) : repeat);
        }
      } else {
        // console.log('hola');
        const cardInDeckRepeats = newDeckCards?.find(e => e.id === card.id);
        setNewRepeatForThoseWichAreNotInDeck(cardInDeckRepeats ? repeat - cardInDeckRepeats.repeat : repeat);
      }
    }

  }, [selectedDeck, newDeckCards]);

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
    if (cardsRepeat && uCard) userCardRepeats = (cardsRepeat?.find(el => el.userCard.id === uCard.id));

    setThisCardRepeats(userCardRepeats.repeat);
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


  return (
    <div className={css.container}>
      {(newRepeatForThoseWichAreNotInDeck || justPassin) && <>
        {/* {repeat > 1 && <label style={{ fontSize: "50px" }}>{userCard && !inDeck ? repeat - thisCardRepeats.repeat : repeat}</label>} */}
        {inDeck ? creatingDeck ? <label style={{ color: 'violet', fontSize: "50px" }}>{repeat > 1 && repeat}</label> :
          <label style={{ color: 'violet', fontSize: "50px" }}>{thisCardRepeats > 1 && thisCardRepeats}</label> :
          repeat > 1 ? <label style={{ fontSize: "50px" }}>{newRepeatForThoseWichAreNotInDeck || repeat}</label> :
            <></>}
        {/* {inDeck?<label style={{ color:'violet',fontSize: "50px" }}>{thisCardRepeats}</label>:<></>} */}
        {/* {!inDeck && repeat>1?<label style={{ fontSize: "50px" }}>{repeat}</label>:<></>} */}
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
        {inDeck && <button onClick={() => {
          selectedDeck.name ? removeCardFromDeck(card.id,uCard.id) :
            removeCardFromDeck(card.id)
        }}>Sacar del mazo</button>}
        {viewCard && (
          <SaleCard
            handleViewCard={handleViewCard}
            card={card} />
        )}
      </>}
    </div>

  );
}
