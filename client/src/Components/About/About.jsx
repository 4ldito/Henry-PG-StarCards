import React from "react";
import FilterByRace from "../Album/Filter";
import SearchCard from "../Album/SearchCard";
import SortCards from "../Album/sort";
import Album from "../Album/Album";

import css from "./About.module.css";
import { useState } from "react";
import { useRef } from "react";
import Rules from "../Rules/Rules";
import Team from "../Team/Team";

export default function About() {
  const [section, setSection] = useState("album");
  const album = useRef(null);
  const rules = useRef(null);
  const team = useRef(null);
  function handleClick(e) {
    e.preventDefault();
    setSection(e.target.name);
    if (e.target.name === "album") {
      album.current.className = css.selected;
      rules.current.className = css.seccion;
      team.current.className = css.seccion;
    } else if (e.target.name === "rules") {
      album.current.className = css.seccion;
      rules.current.className = css.selected;
      team.current.className = css.seccion;
    } else if (e.target.name === "team") {
      album.current.className = css.seccion;
      rules.current.className = css.seccion;
      team.current.className = css.selected;
    }
  }
  return (
    <div className={css.about}>
      <div className={css.secciones}>
        <button
          className={css.selected}
          ref={album}
          name="album"
          onClick={(e) => handleClick(e)}
        >
          Album
        </button>
        <button
          className={css.seccion}
          ref={rules}
          name="rules"
          onClick={(e) => handleClick(e)}
        >
          Rules
        </button>
        <button
          className={css.seccion}
          ref={team}
          name="team"
          onClick={(e) => handleClick(e)}
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
