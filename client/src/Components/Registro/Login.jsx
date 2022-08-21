import React, { useState } from 'react'
import { signIn } from '../../redux/actions/user'
import style from './login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userCleanMsgInfo } from './../../redux/actions/user';
import Swal from 'sweetalert2';

export default function Login() {
  /*const { loginWithRedirect } = useAuth0()
  return (
    <button onClick={() => loginWithRedirect()}>Login</button>
  )
    */
  const dispatch = useDispatch();
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
      Swal.fire({
        title: msgInfo.title,
        text: msgInfo.text,
        icon: msgInfo.type,
      });
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
      <div className={style.form}>
        <form onSubmit={(e) => { login(e) }}>
          <div className={style.inputcontainer}>
            <label>Username </label>
            <input type="email" name="email" onChange={handleOnChange} required />
            {renderErrorMessage("uname")}
          </div>
          <div className={style.inputcontainer}>
            <label>Password </label>
            <input type="password" name="password" onChange={handleOnChange} required autoComplete='on' />
            {renderErrorMessage("pass")}
          </div>
          <div className={style.buttoncontainer}>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
