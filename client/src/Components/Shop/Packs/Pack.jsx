import React from "react";

import css from "../styles/Pack.module.css";

export default function Pack({ name, amount, img }) {
  return (
    <div className={css.border}>
      <div className={css.background}>
        <img
          className={css.img}
          src={img}
        //   src="https://i.ibb.co/V274Hh9/packs6-Mesa-de-trabajo-1-copia-7.png"
          alt="Image"
        />

        <div className={css.textup}>
          <h5>{name}</h5>
        </div>

        <div className={css.textDown}>
          <h6>Cards: {amount}</h6>
        </div>
      </div>
    </div>
  );
}
