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
/*
  return (
    <div>
        <div>
        <form
            onSubmit={(e) => {
            handleSubmit(e);
            }}
        >
            <div .title}>
            <h2><center>New Pokemon!?</center></h2>
            </div>
            <div .containerInput}>
            <div .containerRight}>
                <input
                autocomplete="off"
                .input}
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="Name"
                />
                <p>{errors.name}</p>
                <input
                .input}
                type="number"
                value={input.hp}
                name="hp"
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="HP"
                />
                <p>{errors.hp}</p>
                <input
                .input}
                type="number"
                value={input.attack}
                name="attack"
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="Attack"
                />
                <p>{errors.attack}</p>
                <input
                .input}
                type="number"
                value={input.defense}
                name="defense"
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="Defense"
                />
                <p>{errors.defense}</p>
            </div>
            <div .containerLeft}>
                <input
                .input}
                type="number"
                value={input.speed}
                name="speed"
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="Speed"
                />
                <p>{errors.speed}</p>

<input
.input}
type="number"
value={input.height}
name="height"
onChange={(e) => {
handleChange(e);
}}
placeholder="Height"
/>
<p>{errors.height}</p>

<input
.input}
type="number"
value={input.weight}
name="weight"
onChange={(e) => {
handleChange(e);
}}
placeholder="Weight"
/>
<p>{errors.weight}</p>

<input
autocomplete="off"
.input}
type="text"
value={input.img}
name="img"
onChange={(e) => {
handleChange(e);
}}
placeholder="URL Image..."
/>
                <p>{errors.img}</p>
            </div>
            </div>
            <div .containerTypes}>
            <div .typesLeft}>
                <select
                .select}
                onChange={(e) => {
                    handleSelect(e);
                }}
                >
                <option>Select type</option>
                {types?.map((e) => {
                    return (
                    <option key={e.id} value={e.name}>
                        {e.name}
                    </option>
                    );
                })}
                </select>
            </div>
            <div .typesRight}>
                {input.types.map((e) => {
                return (
                    <div .typeSelect} key={e}>
                    <p>{e}</p>
                    <button
                        onClick={() => {
                        handleDelete(e);
                        }}
                    >
                        x
                    </button>
                    </div>
                );
                })}
            </div>
            </div>
            {input.name !== "" ? (
            <button .btn} type="submit">
                Create!
            </button>
            ) : (
            <button onClick={handleError} .btn}>
                Create!
            </button>
            )}
        </form>
        </div>
);

*/
};