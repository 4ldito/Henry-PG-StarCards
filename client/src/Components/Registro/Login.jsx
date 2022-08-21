import React, { useState } from 'react'
import { signIn } from '../../redux/actions/user'
import style from './login.module.css'
import { useDispatch } from 'react-redux';

export default function Login() {
  /*const { loginWithRedirect } = useAuth0()
  return (
    <button onClick={() => loginWithRedirect()}>Login</button>
  )
    */
  const dispatch = useDispatch();
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [input, setInput] = useState({
    password: '',
    email: ''
  });
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

  // Generate JSX code for error message
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
        <input type="password" name="password" onChange={handleOnChange} required autoComplete='on'/>
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
