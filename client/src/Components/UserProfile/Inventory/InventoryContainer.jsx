import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import getAllCards from '../../../redux/actions/cards/getAllCards';
import { getUserCards } from '../../../redux/actions/cards/userCards';
import Card from '../../Card/Card';
import { CardContainer } from '../../Card/CardContainer';
import css from "./Inventory.module.css";



export default function InventoryContainer() {
  const dispatch = useDispatch();
  const filteredUserCards = useSelector(state => state.album.filteredUserCards)
  const cards = useSelector((state) => state.album.cards);
  const user = useSelector(state => state.userReducer.user)
  const notRepeatCards = useSelector(state => state.album.userCardsNotRepeated);


  function renderNotRepeat() {
    const cartas = [];
    for (const e in notRepeatCards) {
      console.log();
      cartas.push(<CardContainer card={notRepeatCards[e].card} repeat={notRepeatCards[e].repeat}/>)
    }
    return cartas
  }
  useEffect(() => {
    dispatch(getUserCards(user.UserCards, cards))
  }, [cards]);
  
  
  return (<div>
    {/* <div className={css.cartas}>
      {filteredUserCards?.map((card, index) => {
        return (
          <div className={css.cardContainer}>
            <Card
              key={index}
              id={card?.id}
              name={card?.name}
              image={card?.image}
              cost={card?.cost}
              Gdmg={card?.Gdmg}
              Admg={card?.Admg}
              life={card?.life}
              ability={card?.ability}
              abilities={card?.abilities}
              race={card?.race}
              movement={card?.movement}
            />
          </div>
        );

      })}
    </div> */}
    <div className={css.cartas}>{renderNotRepeat()}</div>

  </div >);
}

// cartas.push(<Card
//   key={index}
//   id={e.card?.id}
//   name={e.card?.name}
//   image={e.card?.image}
//   cost={e.card?.cost}
//   Gdmg={e.card?.Gdmg}
//   Admg={e.card?.Admg}
//   life={e.card?.life}
//   ability={e.card?.ability}
//   abilities={e.card?.abilities}
//   race={e.card?.race}
//   movement={e.card?.movement}
// />)