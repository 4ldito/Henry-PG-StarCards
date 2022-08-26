import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCards, searchUserCard } from '../../../redux/actions/cards/userCards';

import css from "./SearchCard.module.css";

export default function SearchUserCard() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const cards = useSelector((state) => state.album.userCards);
  const user = useSelector(state => state.userReducer.user)


  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(searchUserCard(e.target.value, cards));
  }

  return (
    <form className={css.form} >
      <input type="text" onChange={(e) => onInputChange(e)} value={search} />
      <input className={css.btnSearch} type="submit" value="search" />
    </form>
  );
}
