import React, { useState, useRef } from "react";

import Filters from "../Album/Filters";
import Album from "../Album/Album";
import Rules from "../Rules/Rules";
import Team from "../Team/Team";

import activeBtn from '../../img/button-active.png'
import normalBtn from '../../img/button.png';

import css from "./Game.module.css";

export default function Game() {
  const [section, setSection] = useState("album");

  function handleClick(e) {
    e.preventDefault();
    const target = e.target;
    const lastActive = document.querySelector(`.${css.selected}`);
    lastActive.classList.remove(css.selected);
    target.classList.add(`${css.selected}`);
    setSection(e.target.name);
  }

  return (
    <div className={css.game}>
      <div className={css.secciones}>
        <div
          className={`${css.seccion} ${css.selected}`}
          // ref={album}
          name="album"
          onClick={(e) => handleClick(e)}
        >
          {section === "album" ? (
            <img src={activeBtn} className={css.btnImage} />
          ) : (
            <img src={normalBtn} className={css.btnImage} />
          )}
          <h2>ALBUM</h2>
        </div>
        <div
          className={`${css.seccion} ${css.disabled}`}
          // ref={rules}
          name="rules"
          onClick={(e) => handleClick(e)}
          disabled
        >
          {section === "rules" ? (
            <img src={activeBtn} className={css.btnImage} />
          ) : (
            <img src={normalBtn} className={css.btnImage} />
          )}
          <h2>RULES</h2>
        </div>
        <div
          className={`${css.seccion} ${css.disabled}`}
          // ref={team}
          name="team"
          onClick={(e) => handleClick(e)}
          disabled
        >
          {section === "team" ? (
            <img src={activeBtn} className={css.btnImage} />
          ) : (
            <img src={normalBtn} className={css.btnImage} />
          )}
          <h2>TEAM</h2>
        </div>
      </div>

      {section === "album" && (
        <div className={css.seccionesLow}>
          <div className={css.filtrosContainer}>
            <div className={css.filtros}>
              <Filters/>
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
