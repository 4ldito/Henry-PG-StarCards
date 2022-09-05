import React, { useState, useEffect, useRef } from "react";
import socket from "../../../Socket";
import style from "./Chat.module.css";

const Chat = ({ username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("connectPublicChat", username);
  }, [username]);

  useEffect(() => {
    socket.on("messages", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;
    socket.emit("publicMessage", username, message);
    setMessage("");
  };

  return (
    <div className={style.container}>
      <div className={style.msgContainer}>
        <p className={style.msg}>
          Welcome {username}! In this public chat you can talk to other players
          from this community, solve doubts and have fun! Remember: be
          respectful, avoid being penalized.
        </p>
        {messages.map((e, i) => (
          <div key={i} className={style.msg}>
            <span className={style.msgUsername}>{e.username}:</span> {e.message}
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <input
          placeholder="Write here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={style.btn}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
