import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/actions/user";
import style from "../../styles/ProfileUser/UserProfile.module.css";
import Config from "../Config/Config";
import useValidToken from "../../hooks/useValidToken";
export default function UserProfile() {
  const dispatch = useDispatch();
  const userActive = useSelector((state) => state.userReducer.user);
  const idUserActive = useSelector((state) => state.userReducer.id);
  const [user, setUser] = useState({});
  const [render, setRender] = useState();
  const { validToken } = useValidToken({ navigate: true });

  useEffect(() => {
    dispatch(getUser(idUserActive));
  }, []);

  useEffect(() => {
    setUser(userActive);
  }, [userActive]);

  function changeRender(e) {
    let value = e.target.value;
    value === "1"
      ? setRender("Inventory")
      : value === "2"
      ? setRender("Stats")
      : value === "3"
      ? setRender("config")
      : setRender("Chat");
  }

  return Object.keys(user).length !== 0 ? (
    <>
      <div className={style.img}>
        <img className={style.coverimg} src={user.coverImg} alt="coverImg" />
        {/* <button className={style.changecv}>Change Cover Imagen</button> */}
        <img
          className={style.profileimg}
          src={user.profileImg}
          alt="ProfileImg"
        />
        {/* <button className={style.changep}></button> */}
        <Link className={style.stars} to="/shop">
          <FaShoppingCart size={28} />
          Stars: {user.stars}
        </Link>
      </div>
      <div className={style.buttonsbar}>
        <Link to='/inventory'><button>Inventory</button></Link>
        <button
          className={`${style.buttons} ${style.disabled}`}
          value="1"
          onClick={(e) => changeRender(e)}
          disabled
        >
          Inventory
        </button>
        <button
          className={`${style.buttons} ${style.disabled}`}
          value="2"
          onClick={(e) => changeRender(e)}
          disabled
        >
          Stats
        </button>
        <button
          className={`${style.buttons} ${style.disabled}`}
          value="3"
          onClick={(e) => changeRender(e)}
        >
          Config
        </button>
        <button
          className={`${style.buttons} ${style.disabled}`}
          value="4"
          onClick={(e) => changeRender(e)}
          disabled
        >
          Chat
        </button>
      </div>

      {
        render === "config" ? (
          <div className={style.configContainer}>
            <Config user={user} />
          </div>
        ) : render === "Inventory" ? (
          "Inventory"
        ) : render === "Stats" ? (
          "Stats"
        ) : (
          ""
        )
        // : ''
      }
    </>
  ) : (
    <div className={style.response}>'User not logged in'</div>
  );
}
