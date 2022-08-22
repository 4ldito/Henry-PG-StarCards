import React from "react";
import style from "../../styles/ProfileUser/Config.module.css";
import BtnUserProfile from "../Buttons/BtnUserProfile";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { FaUserSecret } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

export default function Config({ user }) {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  function deleteAccount() {
    dispatch(deleteUser(user.id));
    alert("User deleted");
    navigateTo("/");
  }

  return (
    <div className={style.container}>
      <div className={style.config}>
        <h3>
          <center>Profile</center>
        </h3>
        <div className={style.modal}>
          <FaUserSecret />
          <span className={style.span}>
            Username: {user.username}
            {user.RolId !== "user" && ` (${user.RolId})`}
          </span>
        </div>
        <div>
          <BtnUserProfile user={user} property="username" />
        </div>
        <div className={style.modal}>
          <MdPassword />
          <span className={style.span}>Password: </span>
        </div>
        <div>
          <BtnUserProfile user={user} property="password" />
        </div>
        <div className={style.modal}>
          <span className={style.span}>Email: {user.email}</span>
        </div>
        <div className={style.modal}>
          <span className={style.span}>Score: {user.score}</span>
        </div>
        <div className={style.modal}>
          <span className={style.span}>Deck:{user.DeckId}</span>
        </div>
        <div className={style.modal}>
          <span className={style.span}>Account Status: {user.StatusId}</span>{" "}
        </div>
        <div>
          <button className={style.bdelete} onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
