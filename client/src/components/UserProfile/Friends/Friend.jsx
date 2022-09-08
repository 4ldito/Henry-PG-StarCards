import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFriend } from "../../../redux/actions/user";

import css from "./Friend.module.css";

export default function Friend({ username, profileImg, userId, friendId }) {
  const dispatch = useDispatch();

  function deleteThisFriend(e) {
    dispatch(deleteFriend({ userId: userId, friendId: friendId }));
  }

  return (
    <div className={css.friend}>
      <Link className={css.divImg} to={`/userProfile?username=${username}`}>
        <img className={css.img} src={profileImg} />
      </Link>
      <Link to={`/userProfile?username=${username}`}>
        <span>{username}</span>
      </Link>
      <button className={css.delete} onClick={(e) => deleteThisFriend(e)}>Delete friend</button>
    </div>
  );
}
