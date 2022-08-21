import React, { useState, useRef } from "react";
import FilterByRace from "../Album/Filter";
import SearchCard from "../Album/SearchCard";
import SortCards from "../Album/Sort";
import Album from "../Album/Album";

import Rules from "../Rules/Rules";
import Team from "../Team/Team";

import css from "./About.module.css";

export default function About() {
  const [section, setSection] = useState("album");
  const album = useRef(null);
  const rules = useRef(null);
  const team = useRef(null);

  function handleClick(e) {
    e.preventDefault();
    const target = e.target;
    const lastActive = document.querySelector(`.${css.selected}`);
    lastActive.classList.remove(css.selected);
    target.classList.add(`${css.selected}`)
    setSection(e.target.name);
  }

  return (
    <div className={css.about}>
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
