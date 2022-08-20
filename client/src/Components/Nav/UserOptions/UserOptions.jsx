import React from "react";
import { Link } from "react-router-dom";

import css from "./UserOptions.module.css";

export default function UserOptions() {
  const option = {
    fontSize: "1.2rem",
    position: "absolute"
  };
  return (
    <ul className={css.ul}>
      <li className={css.li}>
        <Link className={css.link} style={option} to="/shopcart">
          Shopcart
        </Link>
      </li>
      <li className={css.li}>
        <Link className={css.link} style={option} to="/userProfile">
          User Profile
        </Link>
      </li>
    </ul>
  );
}
