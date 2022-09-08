import React, { useState } from "react";
import logo from "../../img/miniLogo-15.png";
import { NavLink } from "react-router-dom";
import UserOptions from "./UserOptions/UserOptions";
import ChatNotifications from "./ChatNotifications/ChatNotifications";
import { AiOutlineUser } from "react-icons/ai";

import css from "./Nav.module.css";
import useValidToken from "../../hooks/useValidToken";
import { useDispatch, useSelector } from "react-redux";
import { userOptionsState } from "../../redux/actions/user";

export default function Nav() {
  const user = useSelector((state) => state.userReducer);
  const { validToken } = useValidToken({ navigate: false });
  const userOptions = useSelector((state) => state.userReducer.userOptions);
  const dispatch = useDispatch();

  const handleVisibleUserOptions = () => {
    dispatch(userOptionsState());
  };

  return (
    <div className={css.nav}>
      <div>
        <NavLink className={css.link} to="/">
          <img className={css.img} src={logo} alt="Logo de StarCards" />
        </NavLink>
      </div>

      <ul className={css.ul}>
        <li className={css.li}>
          <NavLink className={css.link} to="/shop">
            <span className={css.span}>STORE</span>
          </NavLink>
        </li>
        {validToken && (
          <>
            <li className={`${css.li} ${css.liMedium}`}>
              <NavLink className={css.link} to="/playroom">
                <span className={css.span}>PLAYROOM</span>
              </NavLink>
            </li>
          </>
        )}
        <li className={`${css.li} ${css.liMedium}`}>
          <NavLink className={css.link} to="/game">
            <span className={css.span}>GAME</span>
          </NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={css.link} to="/about">
            <span className={css.span}>ABOUT</span>
          </NavLink>
        </li>
      </ul>
      <div>

      <div className={css.notiContainer}>
        {validToken && <ChatNotifications />}
      </div>
      <button
        id="link-perfil"
        className={css.btn}
        onClick={handleVisibleUserOptions}
        >
        {user.user.id ? (
          <div id="btnMenu" className={css.divProfile}>
            <img
              className={css.profile}
              src={user.user.profileImg}
              alt="image profile"
              />
          </div>
        ) : (
          <div id="btnMenu" className={css.divProfile}>
            <AiOutlineUser className={css.profile} />
          </div>
        )}
      </button>
      </div>

      {userOptions && (
        <div className={css.userOptions}>
          <UserOptions handleVisibleUserOptions={handleVisibleUserOptions} />
        </div>
      )}
    </div>
  );
}
