import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./Socket";

const SinglePrivateChat = ({ newChatUser }) => {
  const dispatch = useDispatch();

  const userActive = useSelector((state) => state.userReducer.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();

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
    socket.emit("privateMessage", userActive.id, actualChatUser.id, message);
    setMessage("");
  };

  return (
    <div>
      <div>{newChatUser.username}</div>

      <div className="chat">
        {messages[actualChatUser.id]
          ? messages[actualChatUser.id].map((e, i) => (
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
        ></textarea>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default SinglePrivateChat;
