import React from "react";
import Friend from "./Friend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName, getUserFriends } from "../../../redux/actions/user";

import css from "./Friend.module.css";

export default function Friends(id) {
  const friends = useSelector((state) => state.userReducer.friends);
  const searchFriend = useSelector((state) => state.userReducer.urlUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFriends(id.id));
  }, []);

  return (
    <div className={css.containerFriends}>
      {friends.length > 0 ? (
        friends.map((friends, i) => {
          return (
            <Friend
              key={i}
              username={friends.username}
              profileImg={friends.profileImg}
              userId={id.id}
              friendId={friends.id}
            />
          );
        })
      ) : (
        <div className={css.noFriends}>
          You have no friends <br /> 💔
        </div>
      )}
    </div>
  );
}
