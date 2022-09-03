import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeModal,
  cleanToken,
  sendMail,
  successAction,
  verifyToken,
  renderVerifyRegister,
} from "../../redux/actions/sendMail";
import Swal from "sweetalert2";
import style from "./Mail.module.css";
import {
  // getByEmail,
  // getUserByEmail,
  modifyUser,
} from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";

export default function VerifyRegister({ email, user }) {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const token1 = useRef(null);
  const password = useRef(null);
  const tokenIstrue = useSelector((state) => state.sendMailReducer.token);
  const recivedToken = useSelector(
    (state) => state.sendMailReducer.recivedToken
  );
  const render = useSelector((state) => state.sendMailReducer.render);
  // const user = useSelector((state) => state.userReducer.user)
  const [reenviar, setReenviar] = useState(true);
  const [state, setState] = useState({
    email: "",
    tokenFront: "",
  });

  useEffect(() => {
    if (recivedToken && tokenIstrue) {
      //si llego el token y es tru(coinciden los token)
      Swal.fire({
        title: "Token",
        text: "Token successfully verified",
        icon: "success",
      });
      dispatch(cleanToken());
      dispatch(successAction());
      dispatch(changeModal());
    } else if (recivedToken && !tokenIstrue) {
      //si no coinciden
      Swal.fire({
        title: "Token",
        text: "The token entered is incorrect",
        icon: "error",
      });
      setReenviar(false);
      token1.current.value = "";
      dispatch(cleanToken());
    }
  }, [recivedToken]);

  function comprobarCambios() {
    let token = token1.current.value;
    setState({ tokenFront: token });
  }

  function verifyTokens(e) {
    e.preventDefault();
    dispatch(verifyToken(state.tokenFront));
  }

  function close(e) {
    e.preventDefault();
    dispatch(changeModal(false));
  }

  function reenviarToken(e) {
    e.preventDefault();
    dispatch(sendMail({ email: email }));
    Swal.fire({
      title: "Token",
      text: "A new token was sent",
      icon: "success",
    });
    setReenviar(true);
    token1.current.value = "";
  }

  function sendPassword(e) {
    e.preventDefault();
    dispatch(modifyUser(user.id, { password: password.current.value }));
    Swal.fire({
      title: "Correcto",
      text: "Password has been changed successfully",
      icon: "success",
    });
    dispatch(renderVerifyRegister());
    dispatch(changeModal(false));
    navigateTo("/login");
  }
  function changepassword() {
    return (
      <div>
        <div className={style.background}>
          <div className={style.container}>
            <form className="formulario" onSubmit={(e) => sendPassword(e)}>
              <div className={style.mail}>
                <input
                  type="password"
                  name="passwordNew"
                  placeholder="Enter the new password"
                  className="form-control"
                  ref={password}
                />
                <button className={style.button} type="submit">
                  Change
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {render ? (
        <div className={style.background}>
          <div className={style.container}>
            <button className={style.close} onClick={(e) => close(e)}>
              X
            </button>

            <div className={style.mail}>
              <input
                type="text"
                name="token1"
                className={style.input}
                ref={token1}
                onChange={comprobarCambios}
                placeholder="Enter the token received by e-mail..."
              />
              <button
                className={style.button}
                type="submit"
                onClick={verifyTokens}
              >
                Check
              </button>
              {reenviar ? (
                ""
              ) : (
                <button
                  className={style.button}
                  onClick={(e) => reenviarToken(e)}
                >
                  Resend Token
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        changepassword()
      )}
    </>
  );
}
