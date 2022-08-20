import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortCards } from "../../redux/actions/cards/sortCards";

import css from "./Sort.module.css";

export default function SortCards() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.inventory.filteredCards);
  function onSelectChange(e) {
    dispatch(sortCards(e.target.value, cards));
  }

  return (
    <select className={css.select} onChange={onSelectChange}>
      <option value="nameAtoZ">by name - A to Z</option>
      <option value="nameZtoA">by name - Z to A</option>
      <option value="ascendentCost">by cost ascendent</option>
      <option value="descendentCost">by cost descendent</option>
      <option value="ascendentGdmg">by Gdmg ascendent</option>
      <option value="descendentGdmg">by Gdmg descendent</option>
      <option value="ascendentAdmg">by Admg ascendent</option>
      <option value="descendentAdmg">by Admg descendent</option>
      <option value="ascendentlife">by life ascendent</option>
      <option value="descendentlife">by life descendent</option>
    </select>
  );
}
