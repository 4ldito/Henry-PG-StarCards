import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCards } from "../../../redux/actions/cards/userCards";
import { addDeckCard, getUserDecks, removeDeckCard } from "../../../redux/actions/user";
import { CardContainer } from "../../Card/CardContainer";
import DeckList from "./Decks/DeckList";


import css from "./Inventory.module.css";

export default function InventoryContainer() {
  const dispatch = useDispatch();
  const filteredUserCards = useSelector((state) => state.album.filteredUserCards);
  const cards = useSelector((state) => state.album.cards);
  const userCards = useSelector(state => state.album.userCards);
  const user = useSelector(state => state.userReducer.user);
  let selectedDeck = useSelector(state => state.userReducer.selectedDeck);
  const [bothStacks, setBothStacks] = useState(false);
  const [creatingDeck, setCreatingDeck] = useState(false);
  const [newDeckCards, setNewDeckCards] = useState([]);
  const [actualStackToShow, setActualStackToShow] = useState([]);
  console.log(selectedDeck);
  const addCardToDeck = (card, remove, deck) => {
    const newCardI = userCards.findIndex(e => e.id === card.id);
    const cardAlredyInDeck = newDeckCards.find(e => e.id === card.id);
    if (cardAlredyInDeck) {
      cardAlredyInDeck.repeat++;
      setNewDeckCards([...newDeckCards]);

    } else {
      const newCard = { ...userCards[newCardI] };
      newCard.repeat = 1;
      setNewDeckCards([...newDeckCards, newCard]);
    }
  }

  const removeCardFromDeck = (id, updating = false) => {
    // setNewDeckCards(cardBack);

    const cardBack = newDeckCards.find(e => e.id === id);
    if (cardBack.repeat > 1) {
      cardBack.repeat--;
      setNewDeckCards([...newDeckCards]);
    } else {
      const newNewDeckCards = newDeckCards.filter(e => e.id !== cardBack.id);
      setNewDeckCards(newNewDeckCards);
    }

  }

  const updateDeck = (userId,deckId, name, cards) => {
    dispatch(updateDeck());
  }


  function renderNotRepeat() {
    let cartas = [];
    filteredUserCards?.forEach(e => {
      cartas.push(<CardContainer key={e.id} inDeck={false} tamanho='.5' newDeckCards={newDeckCards} addCardToDeck={addCardToDeck} addButton={bothStacks ? true : false} card={e} repeat={e.repeat} creatingDeck={creatingDeck} />)
    })
    if (filteredUserCards.length) return cartas
    return <label>Not cards found</label>
  }

  useEffect(() => {
    actualStackToShow.length === 2 ? setBothStacks(true) : setBothStacks(false);
    if (!actualStackToShow.includes('mazos')) {
      setCreatingDeck(false);
    }
  }, [actualStackToShow]);


  useEffect(() => {
    dispatch(getUserCards(user.UserCards, cards));
  }, [cards]);

  const setVisibleStack = (name) => {
    if (actualStackToShow.includes(name)) {
      setActualStackToShow(actualStackToShow.filter(e => e !== name));
      setBothStacks(false);
    } else {
      setActualStackToShow([...actualStackToShow, name])
    }
  }

  return (<div className={css.InventoryContainer}>
    <button name='cartas' onClick={(e) => { setVisibleStack(e.target.name) }}>Cartas</button>
    <button name='mazos' onClick={(e) => { setVisibleStack(e.target.name) }}>Mazos</button>
    <div className={css.cartasYMazosContainer}>
      {actualStackToShow.includes('cartas') ? <div className={bothStacks ? css.cartasYMazo : css.cartas}>{renderNotRepeat()}</div> : <></>}
      {actualStackToShow.includes('mazos') ? <DeckList selectedDeck={selectedDeck}
        removeCardFromDeck={removeCardFromDeck} setNewDeckCards={setNewDeckCards}
        creatingDeck={creatingDeck} setCreatingDeck={setCreatingDeck}
        newDeckCards={newDeckCards} showCards={setVisibleStack} bothStacks={bothStacks}
        enableAddButton={setBothStacks} userId={user.id}></DeckList> : <></>}
    </div>
  </div >);
}
