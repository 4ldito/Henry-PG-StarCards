import style from "./login.module.css";
import style2 from "../../styles/landingPage/landingPage.module.css";
import style3 from "../../styles/register/Register.module.css";
import { useState } from "react";
// import { getUserByEmail } from '../../redux/actions/user';
import { useDispatch } from "react-redux";

export default function RecoverPassword() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    email: "",
  });

  function login(e) {
    e.preventDefault();
    // dispatch(getUserByEmail({email: input.email}))
    console.log({ email: input.email });
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style.appli}>
      <div className={style2.options}>
        <form onSubmit={(e) => login(e)}>
          <div className={style.inputcontainer}>
            <label style={{ fontSize: "larger" }}>Ingrese Username </label>
            <input
              className={style3.input}
              style={{ width: "400px" }}
              type="text"
              name="username"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={style.inputcontainer}>
            <label style={{ fontSize: "larger" }}>Ingrese Email </label>
            <input
              className={style3.input}
              style={{ width: "400px" }}
              type="email"
              name="email"
              onChange={handleOnChange}
              required
            />
          </div>
          <div style={{ height: "15px" }}></div>
          <div className={style.buttoncontainer}>
            <button
              className={style2.button}
              data="Recuperar Contraseña"
              type="submit"
              value=""
            />
          </div>
        </form>
      </div>
    </div>
  );
}
