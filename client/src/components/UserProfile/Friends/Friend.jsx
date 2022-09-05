import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFriend } from "../../../redux/actions/user";


export default function Friend({username, profileImg, userId, friendId}) {
const dispatch = useDispatch()


function deleteThisFriend (e) {
    dispatch(deleteFriend({userId: userId, friendId: friendId }))
}

  return (
    <div>
        <Link to={`/userProfile?username=${username}`}>
      <h1>{username}</h1>
      <img src={profileImg}/>
        </Link>
      <button onClick={(e) => deleteThisFriend(e)}>
          Delete friend
        </button>
    </div>
  );
}