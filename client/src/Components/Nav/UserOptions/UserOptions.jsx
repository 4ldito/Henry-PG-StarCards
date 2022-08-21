import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/actions/user";
import css from "./UserOptions.module.css";

export default function UserOptions(props) {

  const isLogged = props.isLogged;
  const dispatch = useDispatch();
<<<<<<< HEAD
  function quit(){
=======
  function quit() {
    // console.log('hollaa')
>>>>>>> 9a8bf470715f59a1b94f99ceabc34ebf6582dddc
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
      <li className={css.li}>
        <Link className={css.link} style={option} to="/userProfile">
          User Profile
        </Link>
      </li>
      <li>
        {isLogged ? <button onClick={quit}>Log out</button> : <Link to='/login'>Log In</Link>}
      </li>
    </ul>
  );
}
