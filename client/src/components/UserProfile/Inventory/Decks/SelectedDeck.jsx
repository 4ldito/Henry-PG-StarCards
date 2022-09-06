import React from "react";
import Card from "../../../Card/Card";
import { CardContainer } from "../../../Card/CardContainer";
import { useDispatch } from "react-redux";
import { setActiveDeck } from "../../../../redux/actions/user";

function SelectedDeck({ deck, userId }) {
  const dispatch = useDispatch();
  return (
    <div>
      {deck &&
        deck.Cards?.map((e, i) => (
          <CardContainer inDeck={true} key={i} card={e}></CardContainer>
        ))}
      <button
        onClick={() => {
          dispatch(setActiveDeck(deck, userId));
        }}
      >
        Usar
      </button>
    </div>
  );
}

export default SelectedDeck;
