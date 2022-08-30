import React, { useEffect, useState, useRef } from "react";
import FilterByRace from "../Album/Filter";
import SearchCard from "../Album/SearchCard";
import SortCards from "../Album/Sort";
import Album from "../Album/Album";

import Rules from "../Rules/Rules";
import Team from "../Team/Team";

import css from "./Game.module.css";
import getAllCards from "../../redux/actions/cards/getAllCards";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/actions/user";

export default function Game() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(getUser(user.id));
  }, []);

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
        <button
          className={`${css.seccion} ${css.selected}`}
          ref={album}
          name="album"
          onClick={(e) => handleClick(e)}
        >
          Album
        </button>
        <button
          className={`${css.seccion} ${css.disabled}`}
          ref={rules}
          name="rules"
          onClick={(e) => handleClick(e)}
          disabled
        >
          Rules
        </button>
        <button
          className={`${css.seccion} ${css.disabled}`}
          ref={team}
          name="team"
          onClick={(e) => handleClick(e)}
          disabled
        >
          Team
        </button>
      </div>

      {section === "album" && (
        <div className={css.seccionesLow}>
          <div className={css.filtrosContainer}>
            <div className={css.filtros}>
              <SearchCard />
              <SortCards />
              <FilterByRace />
              <button onClick={clearFilters}>Clear Filters</button>
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
  );
}
