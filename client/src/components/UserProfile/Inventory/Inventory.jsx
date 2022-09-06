import React from "react";
import Filters from "./Filters";
import InventoryContainer from "./InventoryContainer";
import Sort from "./Sort";
import SearchUserCard from "./SearchUserCard";

import css from "./Inventory.module.css";

export default function Inventory() {
  return (
    <div className={css.Inventory}>
      <div className={css.filters}>
        <Filters />
        <Sort />
        <SearchUserCard />

      </div>
      <InventoryContainer/>
    </div>
  );
}
