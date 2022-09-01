import React, { useState, useRef } from "react";

import Filters from "../Album/Filters";
import Album from "../Album/Album";
import Rules from "../Rules/Rules";

import css from "./Game.module.css";

export default function Game() {
  const [section, setSection] = useState("album");

  function handleClick(e) {
    e.preventDefault();
    const lastActive = document.querySelector(`.${css.btnActive}`);
    lastActive.classList.remove(css.btnActive);
    e.target.classList.add(`${css.btnActive}`);
    setSection(e.target.name);
  }

  return (
    <div className={css.game}>
      <div className={css.secciones}>
        <button
          className={`${css.btn} ${css.btnActive}`}
          name="album"
          onClick={(e) => handleClick(e)}
        >
          ALBUM
        </button>
        <button
          className={`${css.btn}`}
          name="rules"
          onClick={(e) => handleClick(e)}
          disabled
        >
          RULES
        </button>
      </div>

      {section === "album" && (
        <div className={css.seccionesLow}>
          <div className={css.filtrosContainer}>
            <Filters />
          </div>
          <div className={css.cartas}>
            <Album />
          </div>
        </div>
      )}

      {section === "rules" && <Rules />}
    </div>
  );
}
