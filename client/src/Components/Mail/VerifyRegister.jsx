import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeModal, sendMail, successAction } from "../../redux/actions/sendMail";
import Swal from 'sweetalert2';
import style from "./Mail.module.css";
import { getByEmail, getUserByEmail, modifyUser } from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";


export default function VerifyRegister({email, userPass}){
    const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const token1 = useRef(null);
    const password = useRef(null);
    const tokenBack = useSelector((state) => state.sendMailReducer.token)
    const user = useSelector((state) => state.userReducer.actualUser)
    const [render, setRender] = useState(true)
    const [reenviar, setReenviar] = useState(true)
    const [state, setState] = useState(
        {
          email: "",
          tokenFront: "",
        }
        )

    function comprobarCambios () {
        let token =  token1.current.value;
        setState({ tokenFront: token });
    };

    function verifyToken(e){
        e.preventDefault();
        if(tokenBack !== Number(state.tokenFront)){ //
          Swal.fire({
            title: 'Token',
            text: 'El token ingresado es incorrecto',
            icon: 'error',
          });
          setReenviar(false);
          token1.current.value = ''
        }
        else{
          Swal.fire({
            title: 'Token',
            text: 'Token verificado con Exito',
            icon: 'success',
          }); //cambio de contraseña
          // dispatch(successAction()) 
          // dispatch(changeModal(false))
          console.log(email)
          dispatch(getByEmail(email))
          setRender(false)
        } 
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
          dispatch(successAction())
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
            <form className="formulario" onSubmit={verifyToken}>
                <div className={style.mail}>
                <input
                    type="text"
                    name="token1"
                    placeholder="Ingresar token recibido por email..."
                    onChange={comprobarCambios}
                    className="form-control"
                    ref={token1}
                />
                <button className={style.button} type="submit">Verificar</button>
                {reenviar ? '' : <button className={style.button} onClick={(e)=>reenviarToken(e)}>Reenviar Token</button>}
                </div>
            </form>
                <button onClick={(e)=>close(e)}>X</button>
          </div>
          </div>) : changepassword()}
          </div>
    )
}