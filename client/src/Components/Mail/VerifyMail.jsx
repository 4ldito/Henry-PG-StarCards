// import React, { useRef, useState } from "react";
import axios from 'axios'
import style from "./Mail.module.css";
import React, { Component, useRef, useState } from "react";
///////////////////////////////////////////////////////////

export default function App () {
const email1 = useRef(null);
const asunto1 = useRef(null);
const mensaje1 = useRef(null);
const [state, setState] = useState(
  {
    email: "",
    asunto: "",
    mensaje: ""
  }
  )

  function comprobarCambios () {
    let email = email1.current.value;
    let asunto = asunto1.current.value;
    let mensaje = mensaje1.current.value;
    setState({
      email: email,
      asunto: asunto,
      mensaje: mensaje
    });
  };


  async function enviarEmail(e) {
    e.preventDefault();
    const { email, asunto, mensaje } =  state;
    const form = await axios.post("http://localhost:3001/sendmail", {
      email,
      asunto,
      mensaje
    });
  }

  
    return (
      <div>
        <form className="formulario" onSubmit={enviarEmail}>
          <h1>Enviando Emails en React</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              onChange={comprobarCambios}
              className="form-control"
              ref={email1}
            />
          </div>
          <div>
            <label htmlFor="asunto">Asunto:</label>
            <input
              type="text"
              name="asunto"
              onChange={comprobarCambios}
              className="form-control"
              ref={asunto1}
            />
          </div>
          <div>
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              rows="4"
              name="mensaje"
              onChange={comprobarCambios}
              className="form-control"
              ref={mensaje1}
            ></textarea>
          </div>
          <div>
            <br />
            <button type="submit" className="btn btn-primary">
              Enviar email
            </button>
          </div>
        </form>
      </div>
    );
  }


