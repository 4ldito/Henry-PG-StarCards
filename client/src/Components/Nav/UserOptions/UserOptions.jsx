import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/actions/user";
import css from "./UserOptions.module.css";
import useValidToken from "../../../hooks/useValidToken";
import ShopCart from "../../Shop/ShopCart/ShopCart";
import { resetReduxState } from "../../../redux/actions/";
export default function UserOptions({ handleVisibleUserOptions }) {
  const { validToken } = useValidToken({ navigate: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewShopcart, setViewShopcart] = useState(false);

  function quit() {
    dispatch(logOut());
    dispatch(resetReduxState());
    navigate("/login");
  }

  const option = {
    fontSize: "1.2rem",
    position: "absolute",
  };

  const handleSeeShopcart = (e) => {
    setViewShopcart(!viewShopcart);
  };

  return (
    <>
      {viewShopcart && <ShopCart handleSeeShopcart={handleSeeShopcart} />}
      {validToken ? (
        <ul id="menu" className={css.ul}>
          <li className={css.li}>
            <Link
              onClick={handleSeeShopcart}
              className={css.link}
              style={option}
              to="/shopcart"
            >
              Shopcart
            </Link>
          </li>
          <li className={css.li}>
            <Link className={css.link} style={option} to="/userProfile">
              User Profile
            </Link>
          </li>
          <li className={css.li}>
            <button className={css.btn} onClick={quit}>
              Log out
            </button>
          </li>
        </ul>
      ) : (
        <ul id="menu" className={css.ul}>
          <li className={css.li}>
            <button
              onClick={handleSeeShopcart}
              className={css.btn}
              style={option}
              to="/shopcart"
            >
              Shopcart
            </button>
          </li>
          <li className={css.li}>
            <Link className={css.link} style={option} to="/login">
              Log In
            </Link>
          </li>
          <li className={css.li}>
            <Link className={css.link} style={option} to="/register">
              Sign In
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
