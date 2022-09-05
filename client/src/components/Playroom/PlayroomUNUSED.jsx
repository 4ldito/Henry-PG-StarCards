import React, { useState } from "react";
import useValidToken from "./../../hooks/useValidToken";

import Chat from "../Chat/Chat";
import Play from "./Play/Play";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/actions/user";

import style from "./Playroom.module.css";

export default function Playroom() {
  useValidToken({ navigate: true });
  const [openChat, setOpenChat] = useState(false);
  const userActive = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userActive.id));
  }, []);

  const handleChatOpen = () => {
    setOpenChat((prev) => !prev);
  };

  return (
    <>
      <div className={style.container}>{/* <Play /> */}</div>
      {
        <div className={!openChat ? `${style.hideChat}` : ""}>
          <Chat username={userActive.username} />
        </div>
      }
      <div className={style.containerBtn}>
        <button onClick={handleChatOpen} className={style.btnChat}>
          Public Chat
        </button>
      </div>
    </>
  );
}
