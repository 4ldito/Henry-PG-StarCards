import React, { useState } from "react";
import useValidToken from "./../../hooks/useValidToken";

import Chat from "../Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/actions/user";

import style from "./Playroom.module.css";

export default function Playroom() {
  useValidToken({ navigate: true });
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
      {!registrado && (
        <div className={style.containerHello}>
          <div className="div">
            <h2>¡Bienvenido {userActive.username}!</h2>
            <p>Aquí, en nuestro chat global, podrás encontrar un lugar en el cuál resolver tus preguntas acerca del juego, hablar con otras personas de la comunidad, y divertirte :)</p>
            <p>Recuerda ser respetuoso con todo el mundo o podrías acabar con una sanción.</p>
            <p>ella e callaitaaaaaa ♫</p>
          </div>
          <div className={style.containerBtn}>
            <button onClick={registrar} className={style.btnChat}>Ir al chat</button>
          </div>
        </div>
      )}
      {registrado && <Chat nombre={userActive.username} />}
    </div>
  );
}
