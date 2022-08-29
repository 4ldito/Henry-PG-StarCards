import React, { useState } from "react";
import useValidToken from "./../../hooks/useValidToken";

import Chat from "../Chat/Chat";
import style from "../../styles/playRoom/playRoom.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/actions/user";

export default function Playroom() {
  useValidToken({ navigate: true });
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const userActive = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser(userActive.id));
  }, []);

  const registrar = (e) => {
    e.preventDefault();
    setRegistrado(true)
  };

  return (
    <div className={style.container}>
      <div className="App">
        {!registrado && (
          <div className={style.hello}> 
          <h3>¡Hola {userActive.username}!</h3>
          <button onClick={registrar} className={style.btnChat}>Ir al chat</button>
          </div>
        )}

        {registrado && <Chat nombre={nombre} />}
      </div>
    </div>
  );
}
