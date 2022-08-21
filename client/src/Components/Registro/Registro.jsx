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
    <div>
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <div>
          Registrate
        </div>
        <input
          autoComplete="on"
          type="text"
          name="username"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Name"
        />
        <input
          autoComplete="on"
          type="email"
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="correo"
        />
        <input
          autoComplete="on"
          type="password"
          name="password"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Pass"
        />
        {input.name !== "" ? (
          <button type="submit" >
            Create!
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