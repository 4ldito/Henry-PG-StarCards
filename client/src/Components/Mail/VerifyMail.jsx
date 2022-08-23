import style from "./Mail.module.css";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { changeModal, sendMail, successAction } from "../../redux/actions/sendMail";
import { useNavigate } from 'react-router-dom'

///////////////////////////////////////////////////////////

export default function App () {
const email1 = useRef(null);
const token1 = useRef(null);
const dispatch = useDispatch()
const tokenBack = useSelector((state) => state.sendMailReducer.token)
const [render, setRender] = useState(true)
const [reenviar, setReenviar] = useState(true)
const [state, setState] = useState(
  {
    email: "",
    tokenFront: "",
  }
  )

  function comprobarCambios () {
    let email = render? email1.current.value : state.email;
    let token = render? state.tokenFront : token1.current.value;
    setState({
      email: email,
      tokenFront: token,
    });
  };

  function close(){
    dispatch(changeModal())
  }

  function enviarEmail(e) {
    e.preventDefault();
    dispatch(sendMail(state))
    Swal.fire({
      title: 'Token',
      text: 'Se envio Token al Mail ingresado',
      icon: 'success',
    });
    setRender(false)
  }

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

  function reenviarToken(e){
    e.preventDefault();
    dispatch(sendMail(state))
    Swal.fire({
      title: 'Token',
      text: 'Se envio nuevo token',
      icon: 'success',
    });
    setReenviar(true);
    token1.current.value = ''
  }
  
    return (
      (<div className={style.background}>
        <div className={style.container}> 
        {render ?       
          (<form className="formulario" onSubmit={enviarEmail}>
            <div className={style.mail}>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                placeholder="Ingrese su email..."
                onChange={comprobarCambios}
                className="form-control"
                ref={email1}
              />
              <button className={style.button} type="submit">Enviar Token</button>
              <button onClick={close}>X</button>
            </div>
          </form>)
        :
          (<form className="formulario" onSubmit={verifyToken}>
            <div className={style.mail}>
              <input
                type="text"
                name="token1"
                placeholder="Ingresar token recibido..."
                onChange={comprobarCambios}
                className="form-control"
                ref={token1}
              />
              <button className={style.button} type="submit">Verificar</button>
              <button onClick={close}>X</button>
              {reenviar ? '' : <button className={style.button} onClick={(e)=>reenviarToken(e)}>Reenviar Token</button>}
            </div>
          </form>)}

        </div>
      </div>)
    );
  }


