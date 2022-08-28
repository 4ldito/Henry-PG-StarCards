import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./Socket";

const PrivateChat = () => {
  const dispatch = useDispatch();

  const userActive = useSelector((state) => state.userReducer.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();

  const [actualChatUser, setActualChatUser] = useState();

  function handleChatSelect(c) {
    setActualChatUser(c);
  }

  useEffect(() => {
    const privMessage = userActive.PrivateChat.find(
      (pc) =>
        pc.User.find((u) => u.id === emitterId) &&
        pc.User.find((u) => u.id === receiverId)
    ).Message;

    if (actualChatUser)
      setMessages((prev) => ({
        ...prev,
        [actualChatUser.id]: {
          username: actualChatUser.username,
          id: actualChatUser.id,
          messages: privMessage,
        },
      }));
  }, [actualChatUser]);

  useEffect(() => {
    dispatch(getUser(userActive.id));
  }, []);

  const [chatUsers, setChatUsers] = useState();
  useEffect(() => {
    if (userActive) {
      setChatUsers(
        userActive.PrivateChat.map((c) => ({
          username: c.User.username,
          id: c.User.id,
        }))
      );
      socket.emit("connectPrivateSocket", userActive.id);
    }

    return () => {
      socket.emit("disconnectPrivateSocket", userActive.id);
    };
  }, [userActive]);

  useEffect(() => {
    socket.on("privateMessage", (user, message) => {
      setMessages((prev) => ({
        ...prev,
        [user.id]: {
          username: user.username,
          messages: [...prev[user.id].messages, message],
        },
      }));
    });

    return () => {
      socket.off();
    };
  }, [messages]);

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
    <div>
      <div>
        {chatUsers.length
          ? chatUsers.map((c) => {
              return (
                <div key={c.id} onClick={() => handleChatSelect(c)}>
                  {c.username}
                </div>
              );
            })
          : "No chats"}
      </div>

      <div className="chat">
        {messages[actualChatUser.id]
          ? messages[actualChatUser.id].messages.map((e, i) => (
              <div key={i}>
                <div>{e.message}</div>
              </div>
            ))
          : ""}
        <div ref={divRef}></div>
      </div>
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
    </div>
  );
};

export default PrivateChat;
