import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../../img/logoLanding.png";

import css from "./Registro.module.css";

export default function Registro() {
  return (
    <div className={css.registro}>
      <Formik
        ///////////////////////////// Valores /////////////////////////////
        initialValues={{
          email: "",
          password: "",
          confirm: "",
        }}

        ///////////////////////////// Validaciones /////////////////////////////
        validate={(valores) => {
          let errores = {};

          if (!valores.email) {
            errores.email = "Por favor ingrese un e-mail";
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
            errores.email = "El e-mail es invalido";
          }

          if (!valores.password) {
            errores.password = "Por favor ingrese una contraseña"
          } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/.test(valores.password)) {
            errores.password = "La contraseña debe de contener mínimo 1 mayúscula, 1 minúscula, 1 número"
          } else if (valores.password.length < 8) {
            errores.password = "La longitud mínima es de 8 dígitos"
          }

          if (valores.confirm !== valores.password) {
            errores.confirm = "Las contraseñas no coinciden"
          }

          return errores;
        }}

        ///////////////////////////// Submit /////////////////////////////
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          alert("Usuario registrado con exito");
        }}
      >
        {({ errors }) => (
          <Form className={css.form}>
            <img className={css.logo} src={logo} alt="logo de StarCards" />
            <div className={css.divInputs}>
              <Field
                type="text"
                name="email"
                placeholder="Correo electrónico"
                autoComplete="off"
                className={css.input}
              />
              <ErrorMessage name="email" component={() => (
                <p className={css.pDanger}>{errors.email}</p>
              )} />

              <Field
                type="password"
                name="password"
                placeholder="Contraseña"
                className={css.input}
              />
              <ErrorMessage name="password" component={() => (
                <p className={css.pDanger}>{errors.password}</p>
              )} />

              <Field
                type="password"
                name="confirm"
                placeholder="Confirmar contraseña"
                className={css.input}
              />
              <ErrorMessage name="confirm" component={() => (
                <p className={css.pDanger}>{errors.confirm}</p>
              )} />
            </div>

            <div className={css.btnContainer}>
              <button className={css.btn}>Registrarse</button>
            </div>

            <h2 className={css.linea}>
              <span>O REGISTRARSE CON</span>
            </h2>

            <div className={css.google}></div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
