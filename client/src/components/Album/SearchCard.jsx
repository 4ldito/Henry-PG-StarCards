import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCard } from "../../redux/actions/cards/searchCard.js";
import getAllCards from "../../redux/actions/cards/getAllCards";

import css from "./SearchCard.module.css";
import { useEffect } from "react";

export default function SearchCard() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const cards = useSelector((state) => state.album.cards);
  const allCards = useSelector((state) => state.album.filteredCards);

  function onSubmit(e) {
    e.preventDefault();
    search === ""
      ? dispatch(getAllCards())
      : dispatch(searchCard(search, cards));
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(searchCard(e.target.value, cards));
  }

  function options() {
    let option = [];
    allCards.forEach((card) => {
      option.push(<option key={card.name} value={card.name}></option>);
    });
    return option;
  }

  return (
    <>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          onChange={(e) => onInputChange(e)}
          value={search}
          list="listaCards"
        />
        <input className={css.btnSearch} type="submit" value="search" />
      </form>

      <datalist id="listaCards">{options()}</datalist>
    </>
  );
}
