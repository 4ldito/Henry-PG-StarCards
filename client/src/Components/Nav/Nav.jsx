import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../img/logoLanding.png";
import { NavLink } from "react-router-dom";
import UserOptions from "./UserOptions/UserOptions";

import css from "./Nav.module.css";

export default function Nav() {
  const isLogged = useSelector(state => state.userReducer.token)
  const [visibleUserOptions, setVisibleUserOptions] = useState(false);
  return (
    <div className={css.nav}>
      <NavLink className={css.link} to="/">
        <img className={css.img} src={logo} alt="Logo de StarCards" />
      </NavLink>

      <ul className={css.ul}>
        <li className={css.li}>
          <NavLink className={css.link} to="/shop">
            MarketPlace
          </NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={css.link} to="/playroom">
            Playroom
          </NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={css.link} to="/about">
            About
          </NavLink>
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

      {visibleUserOptions && (
        <div className={css.userOptions}>
          <UserOptions />{" "}
        </div>
      )}
    </div>
  );
}
