import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/actions/user";
import css from "./UserOptions.module.css";
import useValidToken from "../../../hooks/useValidToken";

export default function UserOptions() {

  const { validToken } = useValidToken({ navigate: false });
  const dispatch = useDispatch();

  function quit() {
    dispatch(logOut())
  }

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
      {validToken && <li className={css.li}>
        <Link className={css.link} style={option} to="/userProfile">
          User Profile
        </Link>
      </li>}
      <li>
        {validToken ? <button className={css.btn} onClick={quit}>Log out</button> : <Link to='/login'>Log In</Link>}
      </li>
    </ul>
  );
}
