import css from "./VerifyMail.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  changeModal,
  cleanrecivedToken,
  cleanToken,
  sendMail,
  successAction,
  verifyToken,
} from "../../redux/actions/sendMail";

///////////////////////////////////////////////////////////

export default function App({ user }) {
  const email1 = useRef(null);
  const token1 = useRef(null);
  const dispatch = useDispatch();
  const tokenIstrue = useSelector((state) => state.sendMailReducer.token);
  const recivedToken = useSelector(
    (state) => state.sendMailReducer.recivedToken
  );
  // const modal = useSelector((state) => state.sendMailReducer.modal)
  const [render, setRender] = useState(true);
  const [reenviar, setReenviar] = useState(true);
  const [state, setState] = useState({
    email: "",
    tokenFront: "",
  });

  useEffect(() => {
    if (recivedToken && tokenIstrue) {
      //si llego el token y es tru(coinciden los token)
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Token",
        text: "Token verificado con Exito",
        icon: "success",
      });
      dispatch(cleanToken());
      dispatch(successAction());
      dispatch(changeModal());
    } else if (recivedToken && !tokenIstrue) {
      //si no coinciden
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Token",
        text: "El token ingresado es incorrecto",
        icon: "error",
      });
      setReenviar(false);
      token1.current.value = "";
      dispatch(cleanToken());
    }
  }, [recivedToken]);

  function comprobarCambios() {
    let email = render ? email1.current.value : state.email;
    let token = render ? state.tokenFront : token1.current.value;
    setState({
      email: email,
      tokenFront: token,
    });
  }

  function close() {
    dispatch(changeModal(false));
  }

  function enviarEmail(e) {
    e.preventDefault();
    if (state.email === user.email) {
      dispatch(sendMail(state));
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Token",
        text: "Se envio Token al Mail ingresado",
        icon: "success",
      });
      setRender(false);
    } else {
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error",
        text: "El email ingresado no coincide",
        icon: "error",
      });
      email1.current.value = "";
    }
  }

  function verifyTokens(e) {
    e.preventDefault();
    dispatch(verifyToken(state.tokenFront));
  }

  function reenviarToken1(e) {
    e.preventDefault();
    dispatch(sendMail({ email: state.email }));
    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      title: "Token",
      text: "Se envio nuevo token",
      icon: "success",
    });
    setReenviar(true);
  }

  return (
    <div className={css.background}>
      <div className={css.subbackground}>
        <div className={css.container}>
          {render ? (
            <form className="formulario" onSubmit={(e) => enviarEmail(e)}>
              <div className={css.mail}>
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ingrese su email..."
                  onChange={comprobarCambios}
                  className="form-control"
                  ref={email1}
                />
                <button className={css.button} type="submit">
                  Enviar Token
                </button>
                <button className={css.buttonClose2} onClick={(e) => close(e)}>
                  X
                </button>
              </div>
            </form>
          ) : (
            <form className="formulario" onSubmit={(e) => verifyTokens(e)}>
              <div className={css.mail}>
                <input
                  type="text"
                  name="token1"
                  placeholder="Ingresar token recibido por email..."
                  onChange={comprobarCambios}
                  className="form-control"
                  ref={token1}
                />
                <button className={css.button} type="submit">
                  Verificar
                </button>
                <button className={css.buttonClose} onClick={close}>
                  X
                </button>
                {reenviar ? (
                  ""
                ) : (
                  <button
                    className={css.button}
                    onClick={(e) => reenviarToken1(e)}
                  >
                    Reenviar Token
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
