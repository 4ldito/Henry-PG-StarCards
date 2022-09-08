import React, { useState } from "react";
import useValidToken from "./../../hooks/useValidToken";

import Chat from "../Chat/Chat";
import Play from "./Play/Play";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/actions/user";

import css from "./Playroom.module.css";

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
      <div className={css.container}>{/* <Play /> */}</div>
      {
        <div className={!openChat ? `${css.hideChat}` : ""}>
          <Chat username={userActive.username} />
        </div>
      }
      <div className={css.containerBtn}>
        <button onClick={handleChatOpen} className={css.btnChat}>
          Public Chat
        </button>
      </div>
    </>
  );
}
