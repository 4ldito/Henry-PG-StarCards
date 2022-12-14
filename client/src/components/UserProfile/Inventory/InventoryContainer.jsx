import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCards } from "../../../redux/actions/cards/userCards";
import {
  addDeckCard,
  getUserDecks,
  removeDeckCard,
  setActiveDeck,
  updateDeck,
} from "../../../redux/actions/user";
import { CardContainer } from "../../Card/CardContainer";
import DeckList from "./Decks/DeckList";
import Filters from "./Filters";

import css from "./Inventory.module.css";

export default function InventoryContainer({
  actualStackToShow,
  setActualStackToShow,
}) {
  const dispatch = useDispatch();
  const filteredUserCards = useSelector(
    (state) => state.album.filteredUserCards
  );
  const cards = useSelector((state) => state.album.cards);
  const userCards = useSelector((state) => state.album.userCards);
  const user = useSelector((state) => state.userReducer.user);
  let selectedDeck = useSelector((state) => state.userReducer.selectedDeck);
  const [bothStacks, setBothStacks] = useState(false);
  const [creatingDeck, setCreatingDeck] = useState(false);
  const [updatingDeck, setUpdatingdeck] = useState({});
  const [newDeckCards, setNewDeckCards] = useState([]);
  const [actualCost, setActualCost] = useState(0);

  const changeDeckName = (name) => {
    if (updatingDeck.cards) {
      setUpdatingdeck({ ...updatingDeck, name });
    } else {
      const userCardsInSD = JSON.parse(selectedDeck.cardRepeats);

      const selectedDeckCards = selectedDeck.UserCards.map((e) => {
        const card = cards.find((el) => el.id === e.CardId);
        const repeat = userCardsInSD.find(
          (el) => el.userCard.id === e.id
        ).repeat;
        card.repeat = repeat;
        return card;
      });
      setUpdatingdeck({ cards: selectedDeckCards, name });
    }
  };
  const addCardToDeck = (card, repeat) => {
    if (!selectedDeck.name) {
      const newCardI = userCards.findIndex((e) => e.id === card.id);
      const cardAlredyInDeck = newDeckCards.find((e) => e.id === card.id);
      if (cardAlredyInDeck) {
        cardAlredyInDeck.repeat++;
        setNewDeckCards([...newDeckCards]);
      } else {
        const newCard = { ...userCards[newCardI] };
        newCard.repeat = 1;
        setNewDeckCards([...newDeckCards, newCard]);
      }
      setActualCost(actualCost + card.cost);
    } else {
      const addingCard = cards.find((e) => e.id === card.id);
      const userCardsInSD = JSON.parse(selectedDeck.cardRepeats);

      const selectedDeckCards = selectedDeck.UserCards.map((e) => {
        const card = cards.find((el) => el.id === e.CardId);
        const repeat = userCardsInSD.find(
          (el) => el.userCard.id === e.id
        )?.repeat;
        if (!updatingDeck.cards) {
          // setCreatingDeck(true);
          card.repeat = repeat;
        }
        return card;
      });

      let cardAlreadyInDeck;
      if (!updatingDeck.cards) {
        cardAlreadyInDeck = selectedDeckCards.find(
          (e) => e.id === addingCard.id
        );
      } else {
        cardAlreadyInDeck = updatingDeck.cards.find(
          (e) => e.id === addingCard.id
        );
      }
      if (!cardAlreadyInDeck) {
        addingCard.repeat = 1;
        if (!updatingDeck.cards) {
          setUpdatingdeck({
            ...updatingDeck,
            cards: [...selectedDeckCards, addingCard],
          });
        } else {
          setUpdatingdeck({
            ...updatingDeck,
            cards: [...updatingDeck.cards, addingCard],
          });
        }
      } else {
        if (cardAlreadyInDeck.repeat < repeat) {
          cardAlreadyInDeck.repeat++;
          if (!updatingDeck.cards) {
            setUpdatingdeck({ ...updatingDeck, cards: [...selectedDeckCards] });
          } else {
            setUpdatingdeck({
              ...updatingDeck,
              cards: [...updatingDeck.cards],
            });
          }
        } else {
        }
      }
    }
  };

  const removeCardFromDeck = (id, uCardId) => {
    // setNewDeckCards(cardBack);

    if (!selectedDeck.name) {
      const cardBack = newDeckCards.find((e) => e.id === id);
      if (cardBack.repeat > 1) {
        cardBack.repeat--;
        setNewDeckCards([...newDeckCards]);
      } else {
        const newNewDeckCards = newDeckCards.filter(
          (e) => e.id !== cardBack.id
        );
        setNewDeckCards(newNewDeckCards);
      }
      setActualCost(actualCost - cardBack.cost);
    } else {
      if (!updatingDeck.cards) {
        // setCreatingDeck(true);
        const userCardsInSD = JSON.parse(selectedDeck.cardRepeats);
        const selectedDeckCards = selectedDeck.UserCards.map((e) => {
          let card = cards.find((el) => el.id === e.CardId);

          const repeat = userCardsInSD.find(
            (el) => el.userCard.id === e.id
          )?.repeat;

          card.repeat = repeat;
          if (e.id === uCardId) card.repeat--;
          return card;
        });
        // console.log(selectedDeckCards);
        setUpdatingdeck({ ...updatingDeck, cards: selectedDeckCards });
      } else {
        const removingCard = updatingDeck.cards.find((e) => e.id === id);
        if (removingCard) {
          if (removingCard.repeat > 1) {
            removingCard.repeat--;
            setUpdatingdeck({
              ...updatingDeck,
              cards: [...updatingDeck.cards],
            });
          } else {
            setUpdatingdeck({
              ...updatingDeck,
              cards: updatingDeck.cards.filter((e) => e.id !== removingCard.id),
            });
          }
        }
        // console.log(updatingDeck);
      }
    }
  };

  const updateSelectedDeck = (userId, deckId, newDeck) => {
    dispatch(setActiveDeck({ id: null }, userId));
    dispatch(updateDeck(userId, deckId, newDeck));
  };

  function renderNotRepeat() {
    let cartas = [];
    filteredUserCards?.forEach((e) => {
      cartas.push(
        <CardContainer
          key={e.id}
          bothStacks={bothStacks}
          actualStackToShow={actualStackToShow}
          inDeck={false}
          tamanho=".5"
          newDeckCards={newDeckCards}
          addCardToDeck={addCardToDeck}
          addButton={bothStacks ? true : false}
          card={e}
          repeat={e.repeat}
          creatingDeck={creatingDeck}
          updatingDeck={updatingDeck}
        />
      );
    });
    if (filteredUserCards.length) return cartas;
    return <label>Not cards found</label>;
  }

  useEffect(() => {
    actualStackToShow.length === 2 ? setBothStacks(true) : setBothStacks(false);
    if (!actualStackToShow.includes("mazos")) {
      setCreatingDeck(false);
    }
  }, [actualStackToShow]);

  useEffect(() => {
    dispatch(getUserCards(user.UserCards, cards));
  }, [cards]);

  const setVisibleStack = (name) => {
    if (actualStackToShow.includes(name)) {
      if (actualStackToShow.length > 1) {
        setActualStackToShow(actualStackToShow.filter((e) => e !== name));
        setBothStacks(false);
      }
    } else {
      setActualStackToShow([...actualStackToShow, name]);
    }
  };

  useEffect(() => {
    if (!actualStackToShow.length) {
      setActualStackToShow(["cartas"]);
    }
  }, [actualStackToShow.length]);

  return (
    <div className={css.inventoryContainer}>
      <div className={css.cardsAndDecksButtons}>
        {/* {actualStackToShow.includes("cartas") &&
          actualStackToShow.length === 1 && ( */}
            <div className={css.filters}>
              <Filters />
            </div>
          {/* )} */}
        <button
          className={
            actualStackToShow.includes("cartas") ? css.buttonActive : css.button
          }
          name="cartas"
          onClick={(e) => {
            setVisibleStack(e.target.name);
          }}
        >
          Cards
        </button>
        <hr></hr>
        <button
          className={
            actualStackToShow.includes("mazos") ? css.buttonActive : css.button
          }
          name="mazos"
          onClick={(e) => {
            setVisibleStack(e.target.name);
          }}
        >
          Deck
        </button>
      </div>

      <div className={css.cartasYMazosContainer}>
        {actualStackToShow.includes("cartas") ? (
          <div className={!bothStacks ? css.cardsListOnly : css.cardsList}>
            <div className={bothStacks ? css.cartasYMazo : css.cartas}>
              {renderNotRepeat()}
            </div>
          </div>
        ) : (
          <></>
        )}
        {actualStackToShow.includes("mazos") ? (
          <DeckList
            selectedDeck={selectedDeck}
            removeCardFromDeck={removeCardFromDeck}
            setNewDeckCards={setNewDeckCards}
            creatingDeck={creatingDeck}
            setCreatingDeck={setCreatingDeck}
            newDeckCards={newDeckCards}
            showCards={setVisibleStack}
            bothStacks={bothStacks}
            enableAddButton={setBothStacks}
            userId={user.id}
            updatingDeck={updatingDeck}
            setUpdatingdeck={setUpdatingdeck}
            changeDeckName={changeDeckName}
            updateSelectedDeck={updateSelectedDeck}
            setActualCost={setActualCost}
            actualCost={actualCost}
            actualStackToShow={actualStackToShow}
          ></DeckList>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
