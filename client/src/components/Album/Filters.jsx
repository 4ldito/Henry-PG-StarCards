import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCards } from "../../redux/actions/cards/filterCards";

import css from "./Filter.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.album.cards);
  const searchInputRef = useRef(null);

  const [filter, setFilter] = useState({
    search: '',
    race: "allRaces",
    movements: "allMovements",
    order: 'none'
  });

  function onSubmit(e) {
    e.preventDefault();
  }

  function onFilterChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function clearFilters() {
    dispatch(getAllCards());
  }

  useEffect(() => {
    dispatch(filterCards(filter, cards));
  }, [filter]);

  return (
    <div className={css.filter}>
      <form className={css.form} onSubmit={onSubmit}>
        <input ref={searchInputRef} onChange={onFilterChange} name='search' value={filter.search} list="listaCards" />
        <input className={css.btnSearch} type="submit" value="search" />
      </form>
      <select className={css.select} onChange={onFilterChange} name="race">
        <option value="allRaces">All races</option>
        <option value="Protoss">Protoss</option>
        <option value="Terran">Terran</option>
        <option value="Zerg">Zerg</option>
      </select>

      <select className={css.select} onChange={onFilterChange} name="movements">
        <option value="allMovements">All movements</option>
        <option value="Ground">Ground</option>
        <option value="Flying">Flying</option>
      </select>

      <select className={css.select} onChange={onFilterChange} name="order">
        <option hidden value='none'>Random Order</option>
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

      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}
