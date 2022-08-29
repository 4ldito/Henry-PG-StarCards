import React from "react";
import Filters from "./Filters";
import InventoryContainer from "./InventoryContainer";
import Sort from "./Sort";
import SearchUserCard from "./SearchUserCard";

import css from "./Inventory.module.css";
import { useState } from "react";

export default function Inventory() {
  const [showFilters,setShowFilter] = useState(false);
  return (
    <div className={css.Inventory}>
      {showFilters&&<div className={css.filters}>
        <Filters />
        <Sort />
        <SearchUserCard />
        <button onClick={()=>setShowFilter(false)}>hidde</button>
      </div>}
      {!showFilters&&<button onClick={()=>{setShowFilter(true)}}>filters</button>}
      <InventoryContainer/>
    </div>
  );
}
