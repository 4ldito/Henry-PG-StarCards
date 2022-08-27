import React, { useState } from "react";
import useValidToken from "./../../hooks/useValidToken";

import Chat from "../Chat/Chat";
import style from "../../styles/playRoom/playRoom.module.css";

export default function Playroom() {
  useValidToken({ navigate: true });

  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div className={style.container}>
      <div className="App">
        {!registrado && (
          <form onSubmit={registrar}>
            <label htmlFor="">Introduzca su nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <button>Ir al chat</button>
          </form>
        )}

        {registrado && <Chat nombre={nombre} />}
      </div>
    </div>
  );
}
