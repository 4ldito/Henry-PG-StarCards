import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { logOut } from "../../../redux/actions/user";
export default function UserOptions(props) {
  const isLogged = props.isLogged;
  const dispatch = useDispatch();
  function quit(){
    // console.log('hollaa')
    dispatch(logOut())
  } 
  // console.log('holaa');
  return (
    <div>
      {/* {console.log('me monto')} */}
      <Link to="/shopcart"> Shopcart </Link>
      <Link to="/userProfile"> User Profile </Link>
      {isLogged?<button onClick={quit}>Log out</button>:<Link to = '/login'>Log In</Link>}
    </div>
=======

import css from "./UserOptions.module.css";

export default function UserOptions() {
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
    </ul>
>>>>>>> 6a870bd29dd0bab960dae32646bb3c8aaedaf10e
  );
}
