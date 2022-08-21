import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../img/logoLanding.png";
import { Link } from "react-router-dom";
import UserOptions from "./UserOptions/UserOptions";

import css from "./Nav.module.css";
import useValidToken from "../../hooks/useValidToken";

export default function Nav() {
  const isLogged = useSelector(state => state.userReducer.token);
  const validLogged = useValidToken({navigate: false})
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
          {validLogged?<Link className={css.link} to="/playroom">
            Playroom
          </Link>:<></>}
        </li>
        <li className={css.li}>
          <Link className={css.link} to="/about">
            About
          </Link>
        </li>
      </ul>

      <button
        id="link-perfil"
        className={css.link}
        onClick={() => setVisibleUserOptions(!visibleUserOptions)}
      >
        <span id="span" className="material-symbols-outlined">
          account_circle
        </span>
      </button>

      {isLogged ? (
        <div>
          <UserOptions isLogged = {validLogged}/>{" "}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
