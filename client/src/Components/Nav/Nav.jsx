import React, { useState } from "react";
import logo from "../../img/logoLanding.png";
import { Link } from "react-router-dom";
import UserOptions from "./UserOptions/UserOptions";

import css from "./Nav.module.css";

export default function Nav() {
  const [visibleUserOptions, setVisibleUserOptions] = useState(false);
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

      <button
        id="link-perfil"
        className={css.btn}
        onClick={() => setVisibleUserOptions(!visibleUserOptions)}
      >
        <span id="span" className="material-symbols-outlined">
          account_circle
        </span>
      </button>

      {visibleUserOptions ? (
        <div className={css.antu}>
          <UserOptions />{" "}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
