import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import style from '../Chat/Chat.module.css';

const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mensaje) return;
    socket.emit("mensaje", nombre, mensaje.trim());
    setMensaje("");
  };

  return (
    <div className={style.container}>
      <div className={style.msgContainer}>
        {mensajes.map((e, i) => (
          <div key={i}>
            <p className={style.msg}><span className={style.msgUsername}>{e.nombre}:</span> {e.mensaje}</p>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={handleSubmit} >
        <label htmlFor="">Escriba su mensaje</label>
        <input value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
