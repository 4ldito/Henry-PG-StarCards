import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/actions/user";
import css from "./UserOptions.module.css";
import useValidToken from "../../../hooks/useValidToken";
import ShopCart from "../../Shop/ShopCart/ShopCart";

export default function UserOptions({ handleVisibleUserOptions }) {

  const { validToken } = useValidToken({ navigate: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewShopcart, setViewShopcart] = useState(false);

  function quit() {
    dispatch(logOut())
    navigate("/login")
  }

  const option = {
    fontSize: "1.2rem",
    position: "absolute"
  };

  const handleSeeShopcart = (e) => {
    setViewShopcart(!viewShopcart);
  }

  return (
    <>
      {viewShopcart && <ShopCart handleSeeShopcart={handleSeeShopcart} />}
      <ul id="menu" onBlur={(e) => handleVisibleUserOptions(false)} className={css.ul}>
        <li className={css.li}>
          <button onClick={handleSeeShopcart} className={css.btn} style={option} to="/shopcart">
            Shopcart
          </button>
        </li>
        {validToken && <li className={css.li}>
          <Link className={css.link} style={option} to="/userProfile">
            User Profile
          </Link>
        </li>}
        <li className={css.li}>
          {validToken ? <button className={css.btn} onClick={quit}>Log out</button> : <Link to='/login'>Log In</Link>}
        </li>
      </ul>
    </>
  );
}
