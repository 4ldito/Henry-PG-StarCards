import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  );
}
