import React from "react";
import Friend from "./Friend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName, getUserFriends } from "../../../redux/actions/user";

export default function Friends(id) {
    const friends = useSelector((state) => state.userReducer.friends);
    const searchFriend = useSelector((state) => state.userReducer.urlUser);
    const dispatch = useDispatch()

    
    useEffect(()=>{
        dispatch(getUserFriends(id.id))
    }, [])

  return (
    <div>
      {
        friends.length > 0 ?
      friends.map((friends,i) => {
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
      :
      <h1>You have no friends</h1>
      }
      
    </div>
  );
}