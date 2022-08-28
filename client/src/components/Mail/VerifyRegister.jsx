import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeModal, cleanToken, sendMail, successAction, verifyToken, renderVerifyRegister } from "../../redux/actions/sendMail";
import Swal from 'sweetalert2';
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
        text: "Token verificado con Exito",
        icon: "success",
      });
      dispatch(cleanToken());
      dispatch(successAction());
      dispatch(changeModal());
    } else if (recivedToken && !tokenIstrue) {
      //si no coinciden
      Swal.fire({
        title: "Token",
        text: "El token ingresado es incorrecto",
        icon: "error",
      });
      setReenviar(false);
      token1.current.value = "";
      dispatch(cleanToken());
    }
  }, [recivedToken]);

    function comprobarCambios () {
        let token =  token1.current.value;
        setState({ tokenFront: token });
    };

    function verifyTokens(e){
        e.preventDefault();
        dispatch(verifyToken(state.tokenFront))
      }

    function close(e){
      e.preventDefault();
        dispatch(changeModal(false))
        console.log('close1')
    }

    function reenviarToken(e){
        e.preventDefault();
        console.log('asd')
        console.log(email)
        dispatch(sendMail({email: email}))
        Swal.fire({
          title: 'Token',
          text: 'Se envio nuevo token',
          icon: 'success',
        });
        setReenviar(true);
        token1.current.value = ''
      }

      function sendPassword(e){
        e.preventDefault();
          console.log('contraseña cambiada',user)
          // console.log(user.id, {password: password.current.value})
          dispatch(modifyUser(user.id, {password : password.current.value}))
          Swal.fire({
            title: 'Correcto',
            text: 'Se cambio la contraseña correctamente',
            icon: 'success',
          });
          dispatch(renderVerifyRegister())
          dispatch(changeModal(false))
          navigateTo('/login')
      }
      function changepassword(){
        return(
          <div>
            <div className={style.background}>
            <div className={style.container}> 
                <form className="formulario" onSubmit={(e)=>sendPassword(e)}>
                    <div className={style.mail}>
                    <input
                        type="password"
                        name="passwordNew"
                        placeholder="Ingresar nueva contraseña"
                        className="form-control"
                        ref={password}
                    />
                    <button className={style.button} type="submit">Cambiar</button>
                    </div>
                </form>
              </div>
              </div>
            </div>)
      }


    return(
      <div>{render?(
        <div className={style.background}>
        <div className={style.container}> 
        <button className={style.buttonClose} onClick={(e)=>close(e)}>X</button>
            <form className="formulario" onSubmit={(e)=>verifyTokens(e)}>
                <div className={style.mail}>
                <input
                  type="text"
                  name="token1"
                  placeholder="Ingresar token recibido por email..."
                  onChange={comprobarCambios}
                  className="form-control"
                  ref={token1}
                />
                <button className={style.button} type="submit">
                  Verificar
                </button>
                {reenviar ? (
                  ""
                ) : (
                  <button
                    className={style.button}
                    onClick={(e) => reenviarToken(e)}
                  >
                    Reenviar Token
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        changepassword()
      )}
    </div>
  );
}
