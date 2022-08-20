import React, { useState } from 'react'
import axios from 'axios'
import { signIn } from '../../redux/actions/user'
import './login.css'
import { useDispatch } from 'react-redux';
import { useJwt } from 'react-jwt'

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




  return (<div className="form">
    <form onSubmit={(e) => { login(e) }}>
      <div className="input-container">
        <label>Username </label>
        <input type="email" name="email" onChange={handleOnChange} required />
        {renderErrorMessage("uname")}
      </div>
      <div className="input-container">
        <label>Password </label>
        <input type="password" name="password" onChange={handleOnChange} required />
        {renderErrorMessage("pass")}
      </div>
      <div className="button-container">
        <input type="submit" />
      </div>
    </form>
  </div>)




}
