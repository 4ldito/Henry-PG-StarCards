import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeModal, sendMail, successAction } from "../../redux/actions/sendMail";
import Swal from 'sweetalert2';
import style from "./Mail.module.css";


export default function VerifyRegister(emailRecived){
    const dispatch = useDispatch()
    const token1 = useRef(null);
    const tokenBack = useSelector((state) => state.sendMailReducer.token)
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
          });
          dispatch(successAction()) 
          dispatch(changeModal())
        } 
      }

    function close(){
        dispatch(changeModal(false))
        console.log('cerrado')
    }

    function reenviarToken(e){
        e.preventDefault();
        dispatch(sendMail({email: emailRecived.email}))
        Swal.fire({
          title: 'Token',
          text: 'Se envio nuevo token',
          icon: 'success',
        });
        setReenviar(true);
        token1.current.value = ''
      }

    return(
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
                <button onClick={close}>X</button>
          </div>
          </div>

    )
}