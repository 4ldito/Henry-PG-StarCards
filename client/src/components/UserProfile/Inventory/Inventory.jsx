import React from "react";
import Filters from "./Filters";
import InventoryContainer from "./InventoryContainer";
import Sort from "./Sort";
import SearchUserCard from "./SearchUserCard";

import css from "./Inventory.module.css";
import { useState } from "react";

export default function Inventory() {
  const [actualStackToShow, setActualStackToShow] = useState(['cartas']);
  return (
    <div className={css.Inventory}>
      {(actualStackToShow.includes('cartas') && actualStackToShow.length === 1) &&
        <div className={css.filters}>
          <Filters />
          <Sort />
          <SearchUserCard />

        </div>}
      <InventoryContainer actualStackToShow={actualStackToShow}
        setActualStackToShow={setActualStackToShow} />
    </div>
  );
}
