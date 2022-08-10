import React from "react";
import { Formik } from "formik";

////////////////////////////////////////////////////////////////////////////////

import css from "./Regist.module.css";

export default function Responsive() {
  return (
    <div className={css.registro}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirm: "",
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.email) {
            errores.email = "Por favor ingrese un e-mail";
          } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
            errores.email = "El e-mail es invalido";
          }

          if (!valores.password) {
            errores.password = "Por favor ingrese una contraseña"
          } 
          // else if(){
          //   errores.password = "La contraseña es invalida"
          // }

          return errores;
        }}
        onSubmit={(valores) => {
          console.log(valores);
          console.log("Registrado");
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.logo}></div>
            <div className={css.divInputs}>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                autoComplete="off"
                className={css.input}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <p className="p-danger">{errors.email}</p>}
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className={css.input}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirmar contraseña"
                className={css.input}
                value={values.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <button className={css.btn}>Registrarse</button>

            <h2 class={css.linea}>
              <span>O REGISTRARSE CON</span>
            </h2>

            <div className={css.google}></div>
          </form>
        )}
      </Formik>
    </div>
  );
}
