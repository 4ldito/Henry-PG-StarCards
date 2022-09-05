import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getUser, getUserDecks } from "../../redux/actions/user";
import style from "../../styles/ProfileUser/UserProfile.module.css";
import Config from "../Config/Config";
import useValidToken from "../../hooks/useValidToken";
import { getUserByName } from "../../redux/actions/user";
import Inventory from "./Inventory/Inventory";
import SinglePrivateChat from "./PrivateChat/SinglePrivateChat";
import PrivateChat from "./PrivateChat/PrivateChat";

import getAllCards from "../../redux/actions/cards/getAllCards";
export default function UserProfile() {
  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.userReducer.user);
  const urlUser = useSelector((state) => state.userReducer.urlUser);

  const [user, setUser] = useState({});
  const [render, setRender] = useState("Inventory");
  const { validToken } = useValidToken({ navigate: true });

  // Read profile owner from url
  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery().get("username");

  useEffect(() => {
    if (query) dispatch(getUserByName(query));
  }, [query]);
  /////////////////////////////////////////////////

  useEffect(() => {
    dispatch(getUserDecks(activeUser.id));
    dispatch(getUser(activeUser.id));
    dispatch(getAllCards());
  }, []);

  const [chatAlreadyExists, setChatBool] = useState(false);
  const actualUrlUser = useMemo(() => {
    setUser(activeUser);
    return query === activeUser.username || !query ? activeUser : urlUser;
  }, [activeUser, urlUser]);

  useEffect(() => {
    if (activeUser && urlUser)
      setChatBool(
        activeUser.PrivateChats?.find((pc) => {
          return pc.Users.find((u) => u.id === activeUser.id) &&
            pc.Users.find((u) => u.id === actualUrlUser.id)
            ? true
            : false;
        }) !== undefined
      );
  }, [activeUser, urlUser]);

  function changeRender(e) {
    let value = e.target.value;
      value === "2"
      ? render==="Stats" ? setRender('Inventory') : setRender("Stats")
      : value === "3"
      ? render==="Config" ? setRender('Inventory') : setRender("Config")
      : value === "4"
      ? render==="Chat" ? setRender('Inventory') : setRender("Chat")
      : setRender('Inventory')
  }
  const showToOwner = () => (
    <>
      <div className={style.img}>
        {/* <img className={style.coverimg} src={user.coverImg} alt="coverImg" /> */}
        {/* <button className={style.changecv}>Change Cover Imagen</button> */}

        {/* <button className={style.changep}></button> */}
        <Link className={style.stars} to="/shop">
          <FaShoppingCart size={28} />
          Stars: {user.stars}
        </Link>
      </div>
      <div className={style.buttonsbar}>
        {/* <Link to="/inventory">
          <button>Inventory</button>
        </Link> */}
        <button
          className={`${style.buttons} ${style.disabled}`}
          value="1"
          onClick={(e) => changeRender(e)}
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
        >
          Chat
        </button>
      </div>

      {render === "Config" ? (
        <div className={style.configContainer}>
          <Config user={user} />
        </div>
      ) : render === "Inventory" ? (
        <Inventory />
      ) : render === "Stats" ? (
        "Stats"
      ) : render === "Chat" ? (
        <PrivateChat />
      ) : (
        ""
      )}
    </>
  );

  const showToVisitor = () => (
    <>
      <div className={style.img}>
        <img
          className={style.profileimg}
          src={actualUrlUser.profileImg}
          alt="ProfileImg"
        />
      </div>
      <div className={style.buttonsbar}>
        {/* <button
          className={`${style.buttons} ${style.disabled}`}
          value="1"
          onClick={(e) => changeRender(e)}
        >
          Inventory
        </button> */}
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
          value="4"
          onClick={(e) => changeRender(e)}
        >
          Chat
        </button>
      </div>

      {render === "Chat" ? (
        chatAlreadyExists ? (
          <PrivateChat selected={actualUrlUser} />
        ) : (
          <SinglePrivateChat newChatUser={actualUrlUser} />
        )
      ) : render === "Inventory" ? (
        <Inventory />
      ) : render === "Stats" ? (
        "Stats"
      ) : (
        ""
      )}
    </>
  );

  return Object.keys(user).length !== 0 ? (
    actualUrlUser === user ? (
      showToOwner()
    ) : (
      showToVisitor()
    )
  ) : (
    <div className={style.response}>'User not logged in'</div>
  );
}
