import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, userOptionsState } from "../../../redux/actions/user";
import css from "./UserOptions.module.css";
import useValidToken from "../../../hooks/useValidToken";
import ShopCart from "../../Shop/ShopCart/ShopCart";
import { resetReduxState } from "../../../redux/actions/";

export default function UserOptions({ handleVisibleUserOptions }) {
  const { validToken } = useValidToken({ navigate: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.user);

  const [viewShopcart, setViewShopcart] = useState(false);
  
  function quit() {
    dispatch(logOut());
    dispatch(resetReduxState());
    // navigate("/login");
  }

  const option = {
    fontSize: "1.2rem",
    position: "absolute",
  };

  const handleSeeShopcart = (e) => {
    setViewShopcart(!viewShopcart);
    if(viewShopcart)dispatch(userOptionsState());
  };;

  function closeOptions(){
    dispatch(userOptionsState());
  }

  function login(){
    return(
      <>
        <Link className={css.link} style={option} to="/login" onClick={closeOptions}>Log In</Link>
      </>
    )
  }
  function logout(){
    return(
      <>      
        <Link className={css.btn} onClick={quit} to="/login">Log out</Link>
      </>
)
  }
  return (
    <>
      {viewShopcart && <ShopCart handleSeeShopcart={handleSeeShopcart} />}
      <ul id="menu" className={css.ul}>
    
          {(validToken && user.rolId !== "user" ) && (
            <li className={css.li}>
            <Link className={css.link} style={option} onClick={closeOptions} to="/admin">
            Admin
          </Link>
          </li>
          ) 
          }
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
        {validToken && (
          <li className={css.li}>
            <Link
              className={css.link}
              style={option}
              to={`/userProfile?username=${user.username}`}
              onClick={closeOptions}
            >
              User Profile
            </Link>
          </li>
        )}
        <li className={css.li}>
          {validToken ? 
                <Link className={css.btn} style={option} to="/login" onClick={quit}>Log out</Link>
          :     <Link className={css.link} style={option} to="/login" onClick={closeOptions}>Log In</Link>
          }
        </li>
      </ul>
    </>
  );
}