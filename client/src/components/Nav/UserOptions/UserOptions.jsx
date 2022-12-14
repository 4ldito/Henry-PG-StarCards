import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, userOptionsState } from "../../../redux/actions/user";
import css from "./UserOptions.module.css";
import useValidToken from "../../../hooks/useValidToken";
import ShopCart from "../../Shop/ShopCart/ShopCart";
import { resetReduxState } from "../../../redux/actions/";

export default function UserOptions() {
  const { validToken } = useValidToken({ navigate: false });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const [viewShopcart, setViewShopcart] = useState(false);

  function quit() {
    dispatch(logOut());
    dispatch(resetReduxState());
  }

  const option = {
    fontSize: "1.2rem",
    position: "absolute",
  };

  const handleSeeShopcart = (e) => {
    setViewShopcart(!viewShopcart);
    if (viewShopcart) dispatch(userOptionsState());
  };;

  function closeOptions() {
    dispatch(userOptionsState());
  }

  return (
    <>
      {viewShopcart && <ShopCart handleSeeShopcart={handleSeeShopcart} />}
      <ul id="menu" className={css.ul}>
        {(validToken && user.RolId !== "user") && (
          <li className={css.li}>
            <Link className={css.link} style={option} onClick={closeOptions} to="/admin">
              Admin
            </Link>
          </li>
        )
        }
        <li className={css.li}>
          <button onClick={handleSeeShopcart} className={css.btn} style={option} to="/shopcart">Shopcart</button>
        </li>
        {validToken && (
          <li className={css.li}>
            <Link className={css.link} style={option} to={`/userProfile?username=${user.username}`} onClick={closeOptions}>
              User Profile
            </Link>
          </li>
        )}
        <li className={css.li}>
          {validToken ?
            <><Link className={css.link} style={option} to="/login" onClick={quit}>Log out</Link></>
            : <Link className={css.link} style={option} to="/login" onClick={closeOptions}>Log In</Link>
          }
        </li>
        {!validToken && (
          <li className={css.li}>
            <Link className={css.link} style={option} to={`/register`} onClick={closeOptions}>
              Sign in
            </Link>
          </li>
        )}
      </ul>
    </>
  );
}