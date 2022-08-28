import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/actions/user";
import socket from "./Socket";

import css from "./PrivateChat.module.css";

const PrivateChat = ({ selected }) => {
  const dispatch = useDispatch();

  const userActive = useSelector((state) => state.userReducer.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});

  const [actualChatUser, setActualChatUser] = useState(selected);

  function handleChatSelect(c) {
    setActualChatUser(c);
  }

  useEffect(() => {
    if (actualChatUser) {
      const privMessage = userActive.PrivateChats.find((pc) => {
        return pc.Users.find((u) => u.id === userActive.id) &&
          pc.Users.find((u) => u.id === actualChatUser.id)
          ? true
          : false;
      })?.Messages;

      setMessages((prev) => ({
        ...prev,
        [actualChatUser.id]: {
          username: actualChatUser.username,
          id: actualChatUser.id,
          messages: privMessage,
        },
      }));
    }
  }, [actualChatUser]);

  useEffect(() => {
    dispatch(getUser(userActive.id));
  }, []);

  const [chatUsers, setChatUsers] = useState([]);
  useEffect(() => {
    if (userActive) {
      setChatUsers(() =>
        userActive.PrivateChats.map((c) => {
          const user = c.Users.find((u) => u.id !== userActive.id);
          return { username: user.username, id: user.id };
        })
      );
      socket.emit("connectPrivateSocket", userActive.id);
    }

    return () => {
      socket.emit("disconnectPrivateSocket", userActive.id);
    };
  }, [userActive]);

  useEffect(() => {
    socket.on("privateMessage", (user, message) => {
      setMessages((prev) => {
        return {
          ...prev,
          [user.id]: {
            username: user.username,
            messages: [...prev[user.id]?.messages, message],
          },
        };
      });
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => console.log(messages), [messages]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    socket.emit("privateMessage", userActive, actualChatUser, message);
    setMessage("");
  };

  return (
    <div className={css.chatContainer}>
      <div className={css.chatUsers}>
        {chatUsers?.length
          ? chatUsers.map((c, i) => {
              return (
                <div
                  key={i}
                  id={c.id}
                  onClick={() => handleChatSelect(c)}
                  className={css.singleChatUser}
                >
                  {c.username}
                </div>
              );
            })
          : "No chats"}
      </div>

      <div className="chat">
        {actualChatUser
          ? messages[actualChatUser.id]
            ? messages[actualChatUser.id].messages?.map((e, i) => (
                <div key={i}>{e.message || e}</div>
              ))
            : ""
          : ""}
        <div ref={divRef}></div>
      </div>

      {actualChatUser ? (
        <form onSubmit={submit}>
          <label htmlFor="">Escriba su mensaje</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") submit(e);
            }}
          ></textarea>
          <input type="submit" value="Enviar" />
        </form>
      ) : (
        "Selecciona un chat"
      )}
    </div>
  );
};

export default PrivateChat;
