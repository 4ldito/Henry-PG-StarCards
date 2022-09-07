import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCards } from "../../redux/actions/cards/filterCards";

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
    search: "",
    race: "allRaces",
    movements: "allMovements",
    order: "none",
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
      search: "",
      race: "allRaces",
      movements: "allMovements",
      order: "none",
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
    <div className={css.filters}>
      <button
        id="clearFilters"
        onClick={clearFilters}
        className={css.btnClearFilter}
      >
        Clear Filters
      </button>

      <input
        id="search"
        className={css.input}
        ref={inputSearch}
        onChange={onFilterChange}
        name="search"
        value={filter.search}
        list="listaCards"
      />

      <datalist id="listaCards">{options()}</datalist>

      <select
        id="race"
        ref={selectRace}
        className={css.select}
        onChange={onFilterChange}
        name="race"
      >
        <option value="allRaces">All races</option>
        <option value="Protoss">Protoss</option>
        <option value="Terran">Terran</option>
        <option value="Zerg">Zerg</option>
      </select>

      <select
        id="movements"
        ref={selectMovement}
        className={css.select}
        onChange={onFilterChange}
        name="movements"
      >
        <option value="allMovements">All movements</option>
        <option value="Ground">Ground</option>
        <option value="Flying">Flying</option>
      </select>

      <select
        id="order"
        ref={selectOrder}
        className={css.select}
        onChange={onFilterChange}
        name="order"
      >
        <option hidden value="none">
          Random Order
        </option>
        <option value="nameAtoZ">By Name - A to Z</option>
        <option value="nameZtoA">By Name - Z to A</option>
        <option value="ascendentCost">By ascending Cost</option>
        <option value="descendentCost">By descending Cost</option>
        <option value="ascendentGdmg">By ascending Gdmg</option>
        <option value="descendentGdmg">By descending Gdmg</option>
        <option value="ascendentAdmg">By ascending Admg</option>
        <option value="descendentAdmg">By descending Admg</option>
        <option value="ascendentlife">By ascending Life</option>
        <option value="descendentlife">By descending Life</option>
      </select>
    </div>
  );
}
