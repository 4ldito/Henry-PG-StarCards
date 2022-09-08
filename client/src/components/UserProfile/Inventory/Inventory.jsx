import React from "react";
import Filters from "./Filters";
import InventoryContainer from "./InventoryContainer";
import { useState } from "react";
import css from "./Inventory.module.css";
import { useEffect } from "react";

export default function Inventory() {
  const [actualStackToShow, setActualStackToShow] = useState(["cartas"]);
  useEffect(() => {
    if (!actualStackToShow.length) {
      setActualStackToShow(["cartas"]);
    }
  }, [actualStackToShow.length]);
  return (
    <div className={css.Inventory}>
      <InventoryContainer
        actualStackToShow={actualStackToShow}
        setActualStackToShow={setActualStackToShow}
      />
    </div>
  );
}
