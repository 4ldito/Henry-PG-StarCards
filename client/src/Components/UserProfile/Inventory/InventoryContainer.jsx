import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import getAllCards from '../../../redux/actions/cards/getAllCards';
import { getUserCards } from '../../../redux/actions/cards/userCards';
import Card from '../../Card/Card';
import { CardContainer } from '../../Card/CardContainer';
import DeckList from './Decks/DeckList';
import css from "./Inventory.module.css";



export default function InventoryContainer() {
  const dispatch = useDispatch();
  const filteredUserCards = useSelector(state => state.album.filteredUserCards)
  const cards = useSelector((state) => state.album.cards);
  const user = useSelector(state => state.userReducer.user)
  const [actualStackToShow,setActualStackToShow] = useState([]);

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
  function setVisibleStack(name){
    if(actualStackToShow.includes(name)){
      setActualStackToShow(actualStackToShow.filter(e=>e!==name));
    }else{
      setActualStackToShow([...actualStackToShow,name])
    }
  }
  
  return (<div className={css.InventoryContainer}>
    <button name='cartas' onClick={(e)=>{setVisibleStack(e.target.name)}}>Cartas</button>
    <button name='mazos' onClick={(e)=>{setVisibleStack(e.target.name)}}>Mazos</button>
    {actualStackToShow.includes('cartas')?<div className={css.cartas}>{renderNotRepeat()}</div>:<></>}
    {actualStackToShow.includes('mazos')?<DeckList userId={user.id}></DeckList>:<></>}
    
  </div >);
}