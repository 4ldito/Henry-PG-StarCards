import style from "./login.module.css";
// import style2 from "../LandingPage/landingPage.module.css";
import style3 from "../../styles/register/Register.module.css";
import { useEffect, useRef, useState } from "react";
import { getUserByEmail, userClean } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  changeModal,
  renderVerifyRegister,
  sendMail,
  successAction,
} from "../../redux/actions/sendMail";
import VerifyRegister from "../Mail/VerifyRegister";
import { useNavigate } from "react-router-dom";

export default function RecoverPassword() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const validUser = useSelector((state) => state.userReducer.validUser);
  const modal = useSelector((state) => state.sendMailReducer.modal);
  const successActions = useSelector(
    (state) => state.sendMailReducer.successAction
  );
  // const [render, setRender] = useState(true)
  const [userPass, setUserPass] = useState(true);
  const input1 = useRef(null);
  const input2 = useRef(null);
  const [input, setInput] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!modal && successActions) {
      dispatch(changeModal(true));
      dispatch(renderVerifyRegister());

      dispatch(successAction());
    }
  }, [modal]);

  useEffect(() => {
    if (user.email && validUser) {
      if (user.username !== input.username) {
        dispatch(changeModal(false));
        Swal.fire({
          background:
            "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
          color: "white",
          title: "error",
          text: "Las credenciales no coinciden",
          icon: "error",
        });
        input1.current.value = "";
        input2.current.value = "";
        dispatch(userClean());
      } else {
        dispatch(sendMail({ email: input.email }));
        setUserPass(user);
        Swal.fire({
          background:
            "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
          color: "white",
          title: "Token",
          text: "Token was sent to the email entered",
          icon: "success",
        });
        dispatch(userClean());
        dispatch(changeModal(true));
      }
    } else if (!user.email && validUser) {
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "error",
        text: "No se encontro usuario",
        icon: "error",
      });
      input1.current.value = "";
      input2.current.value = "";
      dispatch(userClean());
    }
  }, [user]);

  function recoveryPassword(e) {
    e.preventDefault();
    dispatch(getUserByEmail(input.email));
    // dispatch(changeModal(true))
  }

  function handleOnChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function renderok() {
    return (
      <div className={style.containerRecoveryPassword}>
        <div className={style.inputcontainer}>
          <label>Enter your user name </label>
          <input
            className={style3.input}
            type="text"
            name="username"
            ref={input1}
            onChange={handleOnChange}
          />
        </div>
        <div className={style.inputcontainer}>
          <label style={{ fontSize: "larger" }}>Enter your e-mail </label>
          <input
            className={style3.input}
            type="email"
            name="email"
            ref={input2}
            onChange={handleOnChange}
          />
        </div>
        <div style={{ height: "15px" }}></div>
        <div className={style.buttoncontainer}>
          <button
            className={style.btnRecoveryPassword}
            onClick={(e) => recoveryPassword(e)}
            data="Recuperar Contraseña"
          >
            Password recovery
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={style.appli}>
      {/* <div className={style2.options}> */}
      {!modal ? (
        renderok()
      ) : (
        <VerifyRegister email={input.email} user={userPass} />
      )}
    </div>
    // </div>
  );
}
