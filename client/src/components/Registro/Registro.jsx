import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, createUserGoogle } from "../../redux/actions/user";
import validator from "./functions/validators";
import style from "../LandingPage/landingPage.module.css";
import style2 from "../../styles/register/Register.module.css";
import style3 from "./login.module.css";
import { userCleanMsgInfo } from "../../redux/actions/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google"; // npm i "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"; // npm i @react-oauth/google
import jwt_decode from "jwt-decode";

import VerifyRegister from "../Mail/VerifyRegister";
import {
  changeModal,
  sendMail,
  successAction,
} from "../../redux/actions/sendMail";
import { addToShopCart } from "./../../redux/actions/shopCart";

export default function Registro() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.sendMailReducer.modal);
  const user = useSelector((state) => state.userReducer.user);
  const shopCart = useSelector((state) => state.shopCartReducer.shopCart);
  const successAction1 = useSelector(
    (state) => state.sendMailReducer.successAction
  );

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  let msgInfo = useSelector((state) => state.userReducer.msg);
  const [errores, setErrores] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (successAction1 && !modal) {
      dispatch(createUser(input));
      dispatch(successAction());
    }
  }, [successAction1]);

  useEffect(() => {
    if (msgInfo?.type) {
      if (msgInfo.type === "success")
        navigate(`/userProfile?username=${user.username}`);
      else {
        Swal.fire({
          background:
            "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
          color: "white",
          title: msgInfo.title,
          text: msgInfo.text,
          icon: msgInfo.type,
        });
      }

      for (const pack in shopCart) {
        if (shopCart[pack].length) {
          shopCart[pack].forEach((item) => {
            dispatch(addToShopCart(item, item.quantity, pack, user.id, true));
          });
        }
      }
      dispatch(userCleanMsgInfo());
    }
  }, [msgInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errores) {
      // dispatch(createUser(input))
      dispatch(sendMail({ email: input.email }));
      dispatch(changeModal(true));
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Token",
        text: "The code has been sent to the e-mail address entered.",
        icon: "success",
      });
    } else {
      setShowErrors(true);
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrores(
      validator({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleError = (e) => {
    e.preventDefault();
    setErrores({
      ...errores,
      complete: "Fill in the form",
    });
    setShowErrors(true);
  };

  function createOrGetUserGoogle(response) {
    const decoded = jwt_decode(response.credential);
    const { email, name, picture } = decoded;
    const userObject = {
      username: name,
      email,
      profileImg: picture,
      loginGoogle: true,
    };
    dispatch(createUserGoogle(userObject));
  }

  return !modal ? (
    <div className={style2.container}>
      <form
        className={style2.options}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={style3.inputcontainer}>
          <label style={{ fontSize: "larger" }}>User name: </label>
          <input
            className={style2.input}
            autoComplete="on"
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter your name here"
          />
        </div>
        {errores?.username && showErrors && (
          <label className={style.error}>{errores.username}</label>
        )}
        <div className={style3.inputcontainer}>
          <label style={{ fontSize: "larger" }}>E-mail: </label>
          <input
            className={style2.input}
            autoComplete="on"
            // type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your e-mail here"
          />
        </div>
        {errores?.email && showErrors && (
          <label className={style.error}>{errores.email}</label>
        )}
        <div className={style3.inputcontainer}>
          <label style={{ fontSize: "larger" }}>Password: </label>
          <input
            className={style2.input}
            autoComplete="on"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter yout password here"
          />
        </div>
        {errores?.password && showErrors && (
          <label className={style.error}>{errores.password}</label>
        )}
        <div className={style3.inputcontainer}>
          <label style={{ fontSize: "larger" }}>Confirm password: </label>

          <input
            className={style2.input}
            autoComplete="on"
            type="password"
            name="confirm"
            onChange={handleChange}
            placeholder="Enter your password here"
          />
        </div>
        <div className={style3.buttoncontainer}>
          {errores?.confirm && showErrors && (
            <label className={style.error}>{errores.confirm}</label>
          )}
          <div style={{ height: "18px" }}></div>
          {input.username ? (
            <button
              type="submit"
              data="Registrar usuario"
              className={style2.button}
            >
              Sign In
            </button>
          ) : (
            <>
              <button
                onClick={handleError}
                data="Registrar usuario"
                className={style2.button}
              >
                Sign In
              </button>
              {errores.complete && showErrors && (
                <label className={style.error}>{errores.complete}</label>
              )}
            </>
          )}
          <div>
            <GoogleOAuthProvider clientId="832028799556-l5odjjibtasaog2nqnskmtkcn0og6n3q.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(response) => {
                  createOrGetUserGoogle(response);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <VerifyRegister email={input.email} />
  );
}
