import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUserCards } from '../../../redux/actions/cards/userCards';
import { CardContainer } from '../../Card/CardContainer';
import DeckList from './Decks/DeckList';
import css from "./Inventory.module.css";



export default function InventoryContainer() {
  const dispatch = useDispatch();
  const filteredUserCards = useSelector(state => state.album.filteredUserCards)
  const cards = useSelector((state) => state.album.cards);
  const user = useSelector(state => state.userReducer.user);
  const [bothStacks,setBothStacks] = useState(false);
  const [creatingDeck, setCreatingDeck] = useState(false);
  const [newDeckCards,setNewDeckCards] = useState([]);
  const [actualStackToShow,setActualStackToShow] = useState([]);


  const addCardToDeck= (card,remove)=>{
    const addingCard = newDeckCards.find(e=>e.id === card.id);
    if(!addingCard){
      setNewDeckCards([...newDeckCards,card]);
    }else if(addingCard){
      setNewDeckCards(newDeckCards.filter(e=>e.id!==addingCard.id));
    }
  }

  function renderNotRepeat() {
    let cartas = [];
    filteredUserCards?.forEach(e=> {
      cartas.push(<div key={e.id}><CardContainer addCardToDeck={addCardToDeck} addButton={bothStacks?true:false}  card={e} repeat={e.repeat}/></div>)
    })
    if(filteredUserCards.length)return cartas
    return <label>Not cards found</label> 
  }

  useEffect(()=>{
    actualStackToShow.length===2?setBothStacks(true):setBothStacks(false);
  },[actualStackToShow]);

  useEffect(() => {
    dispatch(getUserCards(user.UserCards, cards))
  }, [cards]);

  const setVisibleStack=(name)=>{
    if(actualStackToShow.includes(name)){
      setActualStackToShow(actualStackToShow.filter(e=>e!==name));
      setBothStacks(false);
    }else{
      setActualStackToShow([...actualStackToShow,name])
    }
    
  }
  
  return (<div className={css.InventoryContainer}>
    <button name='cartas' onClick={(e)=>{setVisibleStack(e.target.name)}}>Cartas</button>
    <button name='mazos' onClick={(e)=>{setVisibleStack(e.target.name)}}>Mazos</button>
    <div className={css.cartasYMazosContainer}>
    {actualStackToShow.includes('cartas')?<div className={bothStacks? css.cartasYMazo:css.cartas}>{renderNotRepeat()}</div>:<></>}
    {actualStackToShow.includes('mazos')?<DeckList creatingDeck={creatingDeck} setCreatingDeck={setCreatingDeck}
                                                   newDeckCards={newDeckCards} showCards={setVisibleStack} bothStacks={bothStacks}
                                                   enableAddButton={setBothStacks} userId={user.id}></DeckList>:<></>}
    </div>
  </div >);
}
