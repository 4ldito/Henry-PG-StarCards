import React, { useState } from 'react'
import { signIn } from '../../redux/actions/user'
import style from './login.module.css'
import style2 from '../../styles/landingPage/landingPage.module.css'
import style3 from '../../styles/register/Register.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userCleanMsgInfo } from './../../redux/actions/user';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { getUserShopCart } from '../../redux/actions/shopCart'

export default function Login() {
  /*const { loginWithRedirect } = useAuth0()
  return (
    <button onClick={() => loginWithRedirect()}>Login</button>
  )
    */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const successAction1 = useSelector((state) => state.sendMailReducer.successAction)
  const msgInfo = useSelector(state => state.userReducer.msg);
  const userId = useSelector(state => state.userReducer.id);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const [input, setInput] = useState({
    password: '',
    email: ''
  });

  useEffect(() => {
    if (msgInfo?.type) {
      dispatch(userCleanMsgInfo());
      if (msgInfo.type === 'success') {
        dispatch(getUserShopCart(userId));
        navigate('/userProfile');
      }
      else {
        Swal.fire({
          title: msgInfo.title,
          text: msgInfo.text,
          icon: msgInfo.type,
        });
      }
    }
  }, [msgInfo]);
  // User Login info

  const login = (e) => {
    e.preventDefault();
    dispatch(signIn(input));
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    function recovery(){
      dispatch(successAction())
    }
  return (
    <div>{!successAction1?
    (<div className={style.appli}>
      <div className={style2.options}>
        <form onSubmit={(e) => { login(e) }}>
          <div className={style.inputcontainer}>
            <label style={{ fontSize: "larger" }}>Nombre de usuario: </label>
            <input className={style3.input} style={{ width: "400px" }} type="email" name="email" onChange={handleOnChange} required />
            {renderErrorMessage("uname")}
          </div>
          <div className={style.inputcontainer}>
            <label style={{ fontSize: "larger" }}>Contraseña: </label>
            <input className={style3.input} style={{ width: "400px" }} type="password" name="password" onChange={handleOnChange} required autoComplete='on' />
            {renderErrorMessage("pass")}
          </div>
          <div style={{ height: "15px" }}></div>
          <div className={style.buttoncontainer}>
            <button className={style2.button} data='Ingresar' type="submit" value='' />
            <a onClick={recovery}>Recuperar Contraseña</a>
          </div>
        </form>
      </div>
    </div>) : <RecoverPassword/>}
    </div>
  )
}
