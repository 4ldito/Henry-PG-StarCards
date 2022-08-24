
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/actions/user";
import validator from "./functions/validators";
import style from '../../styles/landingPage/landingPage.module.css'
import style2 from '../../styles/register/Register.module.css'
import style3 from './login.module.css'
import { userCleanMsgInfo } from "../../redux/actions/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  });
  let msgInfo = useSelector(state => state.userReducer.msg);
  const [errores, setErrores] = useState(false);
  const [showErrors, setShowErrors] = useState(false);


  useEffect(() => {
    if (msgInfo?.type) {
      if (msgInfo.type === 'success') navigate('/userProfile');
      else {
        Swal.fire({
          title: msgInfo.title,
          text: msgInfo.text,
          icon: msgInfo.type,
        });
      }
      dispatch(userCleanMsgInfo());
    }
  }, [msgInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errores) {
      dispatch(createUser(input))
    } else {
      setShowErrors(true);
    }
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrores(
      validator({
        ...input,
        [e.target.name]: e.target.value
      })
    );
  };

  const handleError = (e) => {
    e.preventDefault();
    setErrores({
      ...errores,
      complete: 'Completa el formulario'
    })
    setShowErrors(true)
  }


  return (
    <div className={style.container}>
      <form className={style.options} onSubmit={(e) => { handleSubmit(e) }}>
        <div className={style3.inputcontainer}>
          <label style={{ fontSize: "larger" }}>Nombre de usuario: </label>
          <input
            className={style2.input}
            autoComplete="on"
            type="text"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Ingrese su nombre aca"
          />
        </div>
        {(errores?.username && showErrors) && <label className={style.error}>{errores.username}</label>}
        <div className={style3.inputcontainer}>
        <label style={{ fontSize: "larger" }}>Email: </label>
        <input
          className={style2.input}

          autoComplete="on"
          type="email"
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Ingrese su gmail aca"
        />
        </div>
        {(errores?.email && showErrors) && <label className={style.error}>{errores.email}</label>}
        <div className={style3.inputcontainer}>
        <label style={{ fontSize: "larger" }}>Contraseña: </label>
        <input
          className={style2.input}

          autoComplete="on"
          type="password"
          name="password"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Ingrese su contraseña aca"
        />
         </div>
        {(errores?.password && showErrors) && <label className={style.error} >{errores.password}</label>}
        <div className={style3.inputcontainer}>

        <label style={{ fontSize: "larger" }}>Confirmar contraseña: </label>

        <input
          className={style2.input}

          autoComplete="on"
          type="password"
          name="confirm"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Ingrese su contraseña aca"
        />
         </div>

        {(errores?.confirm && showErrors) && <label className={style.error} >{errores.confirm}</label>}
        <div style={{ "height": "18px" }}></div>
        {input.username ? (
          <button type="submit" data='Registrar usuario' className={style.button} >
          </button>
        ) : (
          <>
            <button onClick={handleError} data='Registrar usuario' className={style.button} >
            </button>
            {(errores.complete && showErrors) && <label className={style.error}>{errores.complete}</label>}
          </>
        )}

      </form>

    </div>
  )

};