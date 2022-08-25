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

export default function Login() {
  /*const { loginWithRedirect } = useAuth0()
  return (
    <button onClick={() => loginWithRedirect()}>Login</button>
  )
    */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const msgInfo = useSelector(state => state.userReducer.msg);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const [input, setInput] = useState({
    password: '',
    email: ''
  });

  useEffect(() => {
    if (msgInfo?.type) {
      dispatch(userCleanMsgInfo());
      if (msgInfo.type === 'success') navigate('/userProfile');
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

  return (
    <div className={style.appli}>
      <div className={style2.options}>
        <form onSubmit={(e) => { login(e) }}>
          <div className={style.inputcontainer}>
            <label style={{fontSize:"larger"}}>Username </label>
            <input className= {style3.input} style={{width:"400px"}} type="email" name="email" onChange={handleOnChange} required />
            {renderErrorMessage("uname")}
          </div>
          <div className={style.inputcontainer}>
            <label style={{fontSize:"larger"}}>Password </label>
            <input  className= {style3.input} style={{width:"400px"}} type="password" name="password" onChange={handleOnChange} required autoComplete='on' />
            {renderErrorMessage("pass")}
          </div>
          <div style={{height:"15px"}}></div>
          <div className={style.buttoncontainer}>
            <button className={style2.button} data='Ingresar' type="submit" value='' />
            <Link to='/'>Recuperar Contraseña</Link>
          </div>
        </form>
      </div>
    </div>
  )
}