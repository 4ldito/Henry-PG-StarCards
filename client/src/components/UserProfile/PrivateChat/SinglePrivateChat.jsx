import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setLastSeenMsg } from "../../../redux/actions/user";
import socket from "../../../../Socket";

import css from "./PrivateChat.module.css";

const SinglePrivateChat = ({ newChatUser }) => {
  const dispatch = useDispatch();

  const userActive = useSelector((state) => state.userReducer.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    dispatch(getUser(userActive.id));
  }, []);

  useEffect(() => {
    if (userActive) {
      socket.emit("connectPrivateSocket", userActive.id);
    }

    return () => {
      socket.emit("disconnectPrivateSocket", userActive.id);
    };
  }, [userActive]);

  useEffect(() => {
    if (sent) {
      // console.log("newChatUser", newChatUser);
      // console.log("user", userActive);
      // console.log(userActive.PrivateChats);
      // const privateChat = userActive.PrivateChats.find((pc) => {
      //   return pc.Users.find((u) => u.id === newChatUser.id) ? true : false;
      // });

      // if (privateChat) {
      //   console.log("asdf");
      //   dispatch(
      //     setLastSeenMsg(
      //       userActive.id,
      //       privateChat.id,
      //       messages[newChatUser.id].Messages.length + 1
      //     )
      //   );
      // }
      setSent(false);
    }
  }, [userActive]);

  useEffect(() => {
    socket.on("privateMessage", (user, message, privChatId) => {
      setMessages((prev) => {
        const oldMessages = prev[user.id]?.Messages || [];
        return {
          ...prev,
          [user.id]: {
            // username: user.username,
            // id: user.id,
            Messages: [...oldMessages, { emitter: user, message }],
          },
        };
      });
      dispatch(setLastSeenMsg(userActive.id, privChatId, messages.length));
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "auto" });
  }, [divRef.current, messages]);

  const submit = (e) => {
    e.preventDefault();
    socket.emit("privateMessage", userActive, newChatUser, message);
    setMessage("");

    setMessages((prev) => {
      const oldMessages = prev[newChatUser.id]?.Messages || [];
      return {
        ...prev,
        [newChatUser.id]: {
          // username: user.username,
          // id: user.id,
          Messages: [...oldMessages, { emitter: userActive, message }],
        },
      };
    });
    // const privateChat = userActive.PrivateChats.find((pc) => {
    //   return pc.Users.find((u) => u.id === newChatUser.id) ? true : false;
    // });
    // if (!privateChat) dispatch(getUser(userActive.id));
    setSent(true);
  };

  return (
    <div className={css.chatContainer}>
      <div className={css.chatUsers}>{newChatUser.username}</div>

      <div className={css.chatBodyContainer}>
        <div className={css.chatText}>
          {messages[newChatUser.id]
            ? messages[newChatUser.id].Messages?.map((e, i) => (
                <div key={i}>
                  {e.emitter.username}: {e.message}
                </div>
              ))
            : ""}
          <div ref={divRef}></div>
        </div>
        <form onSubmit={submit} className={css.chatForm}>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={message}
            placeholder="Write your first message"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") submit(e);
            }}
            className={css.textArea}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default SinglePrivateChat;
