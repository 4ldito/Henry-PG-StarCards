import React from "react";
import logo from "../../img/logoLanding.png";
import { Link } from "react-router-dom";

import css from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={css.nav}>
      <Link className={css.link} to="/">
        <img className={css.img} src={logo} alt="Logo de StarCards" />
      </Link>

      <ul className={css.ul}>
        <li className={css.li}>
          <Link className={css.link} to="/shop">
            MarketPlace
          </Link>
        </li>
        <li className={css.li}>
          <Link className={css.link} to="/playroom">
            Playroom
          </Link>
        </li>
        <li className={css.li}>
          <Link className={css.link} to="/about">
            About
          </Link>
        </li>
      </ul>
      <Link id="link-perfil" className={css.link} to="/userProfile">
        <span id="span" className="material-symbols-outlined">
          account_circle
        </span>
      </Link>
    </div>
  );
}
