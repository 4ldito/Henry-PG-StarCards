import React, { useState, useEffect } from "react";
import InventoryContainer from "./InventoryContainer";

import css from "./Inventory.module.css";

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
