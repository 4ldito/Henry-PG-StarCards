import React, { useState, useRef } from "react";
import FilterByRace from "../Album/Filter";
import SearchCard from "../Album/SearchCard";
import SortCards from "../Album/Sort";
import Album from "../Album/Album";

import Rules from "../Rules/Rules";
import Team from "../Team/Team";

import css from "./Game.module.css";
import getAllCards from "../../redux/actions/cards/getAllCards";
import { useDispatch } from "react-redux";

export default function Game() {
  const dispatch = useDispatch();
  const [section, setSection] = useState("album");
  const album = useRef(null);
  const rules = useRef(null);
  const team = useRef(null);

  function handleClick(e) {
    e.preventDefault();
    const target = e.target;
    const lastActive = document.querySelector(`.${css.selected}`);
    lastActive.classList.remove(css.selected);
    target.classList.add(`${css.selected}`);
    setSection(e.target.name);
  }

  function clearFilters() {
    dispatch(getAllCards());
  }

  return (
    <div className={css.game}>
      <div className={css.secciones}>
        <div
          className={`${css.seccion} ${css.selected}`}
          ref={album}
          name="album"
          onClick={(e) => handleClick(e)}
        >
          {section === "album" ? (
            <img src="../../../css/button-active.png" className={css.btnImage} />
          ) : (
            <img src="../../../css/button.png" className={css.btnImage} />
          )}
          <h2>ALBUM</h2>
        </div>
        <div
          className={`${css.seccion} ${css.disabled}`}
          ref={rules}
          name="rules"
          onClick={(e) => handleClick(e)}
          disabled
        >
          {section === "rules" ? (
            <img src="../../../css/button-active.png" className={css.btnImage} />
          ) : (
            <img src="../../../css/button.png" className={css.btnImage} />
          )}
          <h2>RULES</h2>
        </div>
        <div
          className={`${css.seccion} ${css.disabled}`}
          ref={team}
          name="team"
          onClick={(e) => handleClick(e)}
          disabled
        >
          {section === "team" ? (
            <img src="../../../css/button-active.png" className={css.btnImage} />
          ) : (
            <img src="../../../css/button.png" className={css.btnImage} />
          )}
          <h2>TEAM</h2>
        </div>
      </div>

      {section === "album" && (
        <div className={css.seccionesLow}>
          <div className={css.filtrosContainer}>
            <div className={css.filtros}>
              <img
                src="../../../css/circle-15.svg"
                className={css.clearFilter}
                alt="ClearFilter"
                onClick={clearFilters}
              />
              <button className={css.btnClearFilter} onClick={clearFilters}>
                Clear Filters
              </button>
              <SearchCard />
              <SortCards />
              <FilterByRace />
            </div>
          </div>
          <div className={css.cartas}>
            <Album />
          </div>
        </div>
      )}

      {section === "rules" && <Rules />}
      {section === "team" && <Team />}
    </div>
    // <div className={css.game}>

    //   {section === "album" && (
    //     <div className={css.seccionesLow}>
    //       <div className={css.filtrosContainer}>
    //         <div className={css.filtros}>
    //           <SearchCard />
    //           <SortCards />
    //           <FilterByRace />
    //           <button onClick={clearFilters}>Clear Filters</button>
    //         </div>
    //       </div>
    //       <div className={css.cartas}>
    //         <Album />
    //       </div>
    //     </div>
    //   )}

    //   {section === "rules" && <Rules />}
    //   {section === "team" && <Team />}
    // </div>
  );
}
