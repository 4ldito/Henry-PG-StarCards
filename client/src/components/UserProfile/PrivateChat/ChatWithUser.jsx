import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./Socket";

const ChatWithUser = ({ receiverId }) => {
  const userActive = useSelector((state) => state.userReducer.user);
  const [mensaje, setMensaje] = useState("");
  const [messagesArray, setMensajes] = useState([]);

  useEffect(() => {
    if (userActive) socket.emit("connectPrivateSocket", userActive.id);

    return () => {
      socket.emit("disconnectPrivateSocket", userActive.id);
    };
  }, [userActive]);

  useEffect(() => {
    socket.on("privateMessage", (userId, message) => {
      setMensajes([...messagesArray, { userId, message }]);
    });

    return () => {
      socket.off();
    };
  }, [messagesArray]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit(
      "privateMessage",
      userActive.id,
      "7d687c28-52e6-4f4c-b3d0-3fab5f971b0b",
      mensaje
    );
    setMensaje("");
  };

  return (
    <div>
      <div className="chat">
        {messagesArray.map((e, i) => (
          <div key={i}>
            <div>{e.userId}</div>
            <div>{e.message}</div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit}>
        <label htmlFor="">Escriba su mensaje</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default ChatWithUser;
