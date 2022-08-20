import React from "react";
import FilterByRace from "../Album/Filter";
import SearchCard from "../Album/SearchCard";
import SortCards from "../Album/sort";
import Album from "../Album/Album";

import css from "./About.module.css";

export default function About() {
  return (
    <div className={css.about}>
      <div className={css.secciones}>
        <button className={css.seccion}>Album</button>
        <button className={css.seccion}>Reglas</button>
        <button className={css.seccion}>Equipo</button>
      </div>
      <div className={css.seccionesLow}>
        <div className={css.filtros}>
          <SearchCard />
          <SortCards />
          <FilterByRace />
        </div>
        <div className={css.inventario}>
          <div className={css.cartas}>
            <Album />
          </div>
        </div>
      </div>
    </div>
  );
}
