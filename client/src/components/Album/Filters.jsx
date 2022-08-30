import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCards } from "../../redux/actions/cards/filterCards";

import imgSelect from '../../img/select.png';
import btnFilter from "../../img/circle-15.svg";

import css from "./Filter.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.album.cards);
  const filteredCards = useSelector((state) => state.album.filteredCards);
  const inputSearch = useRef(null);
  const selectRace = useRef(null);
  const selectMovement = useRef(null);
  const selectOrder = useRef(null);

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
    setFilter({
      search: '',
      race: "allRaces",
      movements: "allMovements",
      order: 'none'
    });
    selectRace.current.selectedIndex = 0;
    selectMovement.current.selectedIndex = 0;
    selectOrder.current.selectedIndex = 0;
  }

  useEffect(() => {
    dispatch(filterCards(filter, cards));
  }, [filter]);

  function options() {
    let option = [];
    filteredCards?.forEach((card) => {
      option.push(<option key={card.name} value={card.name}></option>);
    });
    return option;
  }

  return (
    <div className={css.filter}>
      <img src={btnFilter} className={css.clearFilter} alt="ClearFilter" />
      <button onClick={clearFilters} className={css.btnClearFilter}>
        Clear Filters
      </button>

      <form className={css.form} onSubmit={onSubmit}>
        <img src={imgSelect} alt="" />
        <input className={css.input} ref={inputSearch} onChange={onFilterChange} name='search' value={filter.search} list="listaCards" />
        {/* <input className={css.btnSearch} type="submit" value="search" /> */}
      </form>

      <datalist id="listaCards">{options()}</datalist>

      <div>
        <img src={imgSelect} alt="" />
        <select ref={selectRace} className={css.selectRace} onChange={onFilterChange} name="race">
          <option value="allRaces">All races</option>
          <option value="Protoss">Protoss</option>
          <option value="Terran">Terran</option>
          <option value="Zerg">Zerg</option>
        </select>

      </div>

      <div>
        <img src={imgSelect} alt="" />
        <select ref={selectMovement} className={css.selectMove} onChange={onFilterChange} name="movements">
          <option value="allMovements">All movements</option>
          <option value="Ground">Ground</option>
          <option value="Flying">Flying</option>
        </select>
      </div>

      <div>
        <img src={imgSelect} alt="" />
        <select ref={selectOrder} className={css.select} onChange={onFilterChange} name="order">
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
      </div>
      <select className={css.test}><option value="testttttt">test</option></select>
      {/* <button onClick={clearFilters}>Clear Filters</button> */}
    </div>
  );
}
