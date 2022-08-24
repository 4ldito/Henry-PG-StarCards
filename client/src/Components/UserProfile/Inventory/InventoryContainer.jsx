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


  function renderNotRepeat() {
    let cartas = [];
    filteredUserCards?.forEach(e=> {
      cartas.push(<div key={e.id}><CardContainer  card={e} repeat={e.repeat}/></div>)
    })
    if(filteredUserCards.length)return cartas
    return <label>Not cards found</label> 
  }


  useEffect(() => {
    dispatch(getUserCards(user.UserCards, cards))
  }, [cards]);
  
  
  return (<div className={css.InventoryContainer}>
    <div className={css.cartas}>{renderNotRepeat()}</div>

  </div >);
}