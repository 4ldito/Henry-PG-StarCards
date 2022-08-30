import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/actions/user";
import socket from "../../../../Socket";

import css from "./PrivateChat.module.css";

const PrivateChat = ({ selected }) => {
  const dispatch = useDispatch();

  const userActive = useSelector((state) => state.userReducer.user);
  const [actualChatUser, setActualChatUser] = useState(selected);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});

  function handleChatSelect(c) {
    setActualChatUser(c);
  }

  useEffect(() => {
    if (actualChatUser) {
      let privMessage;
      const chatWithUser = chatUsers.find((c) => c.id === actualChatUser.id);

      if (chatWithUser) {
        privMessage = messages[actualChatUser.id]?.Messages;
      } else
        privMessage = userActive.PrivateChats.find((pc) => {
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
          Messages: privMessage,
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
      setMessages((prev) => {
        let oldMessages = {};
        userActive.PrivateChats.forEach((pc) => {
          const receiver = pc.Users.find((u) => u.id !== userActive.id);
          oldMessages = {
            ...oldMessages,
            [receiver.id]: {
              username: receiver.username,
              id: receiver.id,
              Messages: pc.Messages,
            },
          };
        });

        return { ...oldMessages };
      });
      socket.emit("connectPrivateSocket", userActive.id);
    }

    return () => {
      socket.emit("disconnectPrivateSocket", userActive.id);
    };
  }, [userActive]);

  useEffect(() => {
    socket.on("privateMessage", (user, message) => {
      if (chatUsers.find((c) => c.id === user.id) === undefined)
        setChatUsers((prev) => [
          ...prev,
          { username: user.username, id: user.id },
        ]);

      setMessages((prev) => {
        const oldMessages = prev[user.id]?.Messages || [];
        return {
          ...prev,
          [user.id]: {
            username: user.username,
            id: user.id,
            Messages: [...oldMessages, message],
          },
        };
      });
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
      <div className={css.chatBodyContainer}>
        <div className={css.chatText}>
          {actualChatUser
            ? messages[actualChatUser.id]
              ? messages[actualChatUser.id].Messages?.map((e, i) => (
                  <div key={i}>{e.message || e}</div>
                ))
              : ""
            : ""}
          <div ref={divRef}></div>
        </div>

        {actualChatUser ? (
          <form onSubmit={submit} className={css.chatForm}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={message}
              placeholder="Escribe tu mensaje"
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") submit(e);
              }}
              className={css.textArea}
            />
            <input type="submit" value="Enviar" />
          </form>
        ) : (
          "Selecciona un chat"
        )}
      </div>
    </div>
  );
};

export default PrivateChat;
