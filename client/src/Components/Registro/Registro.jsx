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

import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
//import { signUp } from "../../redux/actions";


export default function Registro(){
    const dispatch = useDispatch();
    //const history = useHistory();

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        email:'',
        pass: ''
    });

    //cambio


  const handleChange = (e)=>{
    setInput({
        ...input,
        [e.target.name]: e.target.value,
    });
    setErrors(
        validate({
            ...input,
            [e.target.name]: e.target.value
        })
    );
};

      const handleError = (e)=>{
        e.preventDefault();
        alert('Complete the form')
    }


  return(
    <div>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <div>
              Registrate
          </div>
          <input
                autocomplete="off"
                type="text"
                name="name"
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="Name"
                />
          <input
                autocomplete="off"
                type="email"
                name="name"
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="correo"
                />
          <input
                autocomplete="off"
                type="password"
                name="name"
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="Pass"
                />
          {input.name !== "" ? (
            <button type="submit">
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