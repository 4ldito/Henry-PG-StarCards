import React, { useEffect, useState } from "react";
import logo from "../../img/logoLanding.png";
import { NavLink } from "react-router-dom";
import UserOptions from "./UserOptions/UserOptions";

import css from "./Nav.module.css";
import useValidToken from "../../hooks/useValidToken";

export default function Nav() {
  const { validToken } = useValidToken({ navigate: false })
  const [visibleUserOptions, setVisibleUserOptions] = useState(false);

  const handleVisibleUserOptions = () => {
    setVisibleUserOptions(!visibleUserOptions)
  }

  // function handleClick(e) {
  //   // console.log("id:",e.target.id);
  //   // console.log("this:", this);
  //   console.log(e.target.className);
  //   if (e.target.id !== 'btnMenu' && e.target.id != 'menu') {
  //     setVisibleUserOptions(false)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener("click", handleClick);
  //   return () => document.removeEventListener("click", handleClick);
  // }, []);

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

          {validToken && <NavLink className={css.link} to="/playroom">
            Playroom
          </NavLink>}

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
        onClick={handleVisibleUserOptions}
      >
        <span id="btnMenu" className="material-symbols-outlined">
          account_circle
        </span>
      </button>


      {visibleUserOptions && (
        <div className={css.userOptions}>
          <UserOptions handleVisibleUserOptions={handleVisibleUserOptions} />
        </div>
      )}
    </div>
  );
}