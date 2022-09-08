import React, { useState } from "react";
import { createUserGoogle, signIn } from "../../redux/actions/user";
import style from "./login.module.css";
import style3 from "../../styles/register/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userCleanMsgInfo } from "./../../redux/actions/user";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { addToShopCart, getUserShopCart } from "../../redux/actions/shopCart";
import jwt_decode from "jwt-decode";

import { GoogleOAuthProvider } from "@react-oauth/google"; // npm i "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"; // npm i @react-oauth/google

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // React States
  const [errorMessages, setErrorMessages] = useState({});
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
          background:
            "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
          color: "white",
          title: msgInfo.title,
          text: msgInfo.text,
          icon: msgInfo.type,
        });
      }
    }
  }, [msgInfo]);

  const login = (e) => {
    e.preventDefault();
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

  return (
    <div className={style.appli}>
      <div className={style.options}>
        <form
          onSubmit={(e) => {
            login(e);
          }}
        >
          <div className={style.inputcontainer}>
            <label style={{ fontSize: "larger" }}>E-mail </label>
            <input
              className={style3.input}
              style={{ width: "400px" }}
              type="email"
              name="email"
              onChange={handleOnChange}
              required
            />
            {renderErrorMessage("uname")}
          </div>
          <div className={style.inputcontainer}>
            <label style={{ fontSize: "larger" }}>Password </label>
            <input
              className={style3.input}
              style={{ width: "400px" }}
              type="password"
              name="password"
              onChange={handleOnChange}
              required
              autoComplete="on"
            />
            {renderErrorMessage("pass")}
          </div>
          <div style={{ height: "15px" }}></div>
          <div className={style.buttoncontainer}>
            <button className={style.button} data="Ingresar" type="submit">
              Login
            </button>
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
          <section className={style.containerLink}>
            <Link className={style.link} to="/recovery">
              Password Recovery
            </Link>
          </section>
        </form>
      </div>
    </div>
  );
}
