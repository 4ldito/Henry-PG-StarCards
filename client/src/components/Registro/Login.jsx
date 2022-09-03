import React, { useState } from "react";
import { signIn } from "../../redux/actions/user";
import style from "./login.module.css";
// import style2 from "../../styles/landingPage/landingPage.module.css";
import style3 from "../../styles/register/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userCleanMsgInfo } from "./../../redux/actions/user";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { addToShopCart, getUserShopCart } from "../../redux/actions/shopCart";
// import {useAuth} from '../context/authContext'

import { GoogleOAuthProvider } from "@react-oauth/google"; // npm i "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"; // npm i @react-oauth/google
import { createOrGetUserGoogle } from "../Registro/utils/userGoogle";

export default function Login() {
  // const {loginAuth, loginWithGoogle } = useAuth()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  // const [errors, setErrors] = useState("");
  const msgInfo = useSelector((state) => state.userReducer.msg);
  const actualUser = useSelector((state) => state.userReducer.user);
  const userId = actualUser.id;
  const shopCart = useSelector((state) => state.shopCartReducer.shopCart);


  const [input, setInput] = useState({
    password: "",
    email: "",
  });

  async function addItems() {
    for (const pack in shopCart) {
      if (shopCart[pack].length) {
        shopCart[pack].forEach((item) => {
          dispatch(addToShopCart(item, item.quantity, pack, userId, true));
        });
      }
    }
  }

  useEffect(() => {
    if (msgInfo?.type) {
      dispatch(userCleanMsgInfo());
      if (msgInfo.type === "success") {
        addItems().then(() => {
          dispatch(getUserShopCart(userId));
          navigate(`/userProfile?username=${actualUser.username}`);
        });
      } else {
        Swal.fire({
          title: msgInfo.title,
          text: msgInfo.text,
          icon: msgInfo.type,
        });
      }
    }
  }, [msgInfo]);

  const login = (e) => {
    e.preventDefault();
    console.log('a')
    dispatch(signIn(input));
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    // const handleGoogleSignin = async () => {
    //   try {
    //     await loginWithGoogle();
    //     navigate("/");
    //   } catch (errors) {
    //     setErrors(errors.message);
    //   }
    // };

  return (
    <div className={style.appli}>
      <div className={"style2.options"}>
        <form
          onSubmit={(e) => {
            login(e);
          }}
        >
          <div className={style.inputcontainer}>
            <label style={{fontSize:"larger"}}>Username </label>
            <input
              className= {style3.input}
              style={{width:"400px"}}
              type="email"
              name="email"
              onChange={handleOnChange}
              required
            />
            {renderErrorMessage("uname")}
          </div>
          <div className={style.inputcontainer}>
            <label style={{fontSize:"larger"}}>Password </label>
            <input
               className= {style3.input}
              style={{width:"400px"}}
              type="password"
              name="password"
              onChange={handleOnChange}
              required
              autoComplete="on"
            />
            {renderErrorMessage("pass")}
          </div>
          <div style={{height:"15px"}}></div>
          <div className={style.buttoncontainer}>
            <button className={"style2.button"} data='Ingresar' type="submit" value=''>Entrar</button>
            <Link to='/recovery'>Recuperar Contraseña</Link>
          </div>
        </form>
        {/* <button onClick={handleGoogleSignin}>Google</button> */}
        <GoogleOAuthProvider clientId="832028799556-l5odjjibtasaog2nqnskmtkcn0og6n3q.apps.googleusercontent.com">
          <GoogleLogin
            className={style.buttonGoogle}
            onSuccess={(response) => {
              createOrGetUserGoogle(response);
              // console.log(response)
    //                dispatch(signIn({
    //   password: "$2a$11$NLo50EA2piHpl/zn2KCW5uqmBc9IWWY0aC.xQaW4Fe1QLIepqW/ba",
    //   email: em,
    // })
    // )
              navigate("/userprofile");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}