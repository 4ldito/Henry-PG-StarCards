/*import React from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useAuth0 } from '@auth0/auth0-react'
import Login from './Login'
import Logout from './Logout'

import Profile from '../Profile/Profile'

// import logo from '../../img/logoLanding.png'

// import css from './Registro.module.css'

export default function Registro () {
  const { isAuthenticated } = useAuth0()
  // const { user, isAuthenticated } = useAuth0()

  return (
    <>
      {isAuthenticated
        ? (
          <div>
            <Profile />
            <Logout />
          </div>
          )
        : <Login />}

    </>
  )
}
*/

import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { createUser } from "../../redux/actions/user";
import style from '../../styles/landingPage/landingPage.module.css'
import style2 from '../../styles/register/Register.module.css'

export default function Registro() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  });

  //cambio
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUser(input))
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //     validate({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    // );
  };

  const handleError = (e) => {
    e.preventDefault();
    alert('Complete the form')
  }


  return (
    <div className={style.container}>
      <form className={style.options} onSubmit={(e) => { handleSubmit(e) }}>
        <div style={{"fontSize":"50px"}}>
          Registrate
        </div>
        <input
          className={style2.input}
          autoComplete="on"
          type="text"
          name="username"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Ingrese su nombre aca"
        />
        <input
          className={style2.input}

          autoComplete="on"
          type="email"
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Ingrese su gmail aca"
        />
        <input
          className={style2.input}

          autoComplete="on"
          type="password"
          name="password"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Ingrese su contraseña aca"
        />
        <div style={{"height":"18px"}}></div>
        {input.name !== "" ? (
          <button type="submit" data= 'Registrar usuario' className={style.button} >
          </button>
        ) : (
          <button onClick={handleError}>
            Create!
          </button>
        )}

      </form>

    </div>
  )

};