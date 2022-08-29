import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import style from '../Chat/Chat.module.css';

const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    console.log(nombre);
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje("");
  };

  return (
    <div className={style.container}>
      <div className={style.msgContainer}>
        {mensajes.map((e, i) => (
          <div key={i}>
            <div>{e.nombre}</div>
            <div>{e.mensaje}</div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit} >
        <label htmlFor="">Escriba su mensaje</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
