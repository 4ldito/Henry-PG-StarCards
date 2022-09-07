import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { addNewFriend, deleteFriend, getUser, getUserDecks } from "../../redux/actions/user";
import style from "../../styles/ProfileUser/UserProfile.module.css";
import Config from "../Config/Config";
import useValidToken from "../../hooks/useValidToken";
import { getUserByName } from "../../redux/actions/user";

import Inventory from "./Inventory/Inventory";
import SinglePrivateChat from "./PrivateChat/SinglePrivateChat";
import PrivateChat from "./PrivateChat/PrivateChat";

import getAllCards from "../../redux/actions/cards/getAllCards";

import Friends from "./Friends/Friends";
import Stats from "./Stats/Stats";
export default function UserProfile() {
  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.userReducer.user);
  const urlUser = useSelector((state) => state.userReducer.urlUser);
  const friends = useSelector((state) => state.userReducer.friends);

  const [user, setUser] = useState({});
  const [render, setRender] = useState("Inventory");
  useValidToken({ navigate: true });

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
    // dispatch(getUserFriends(activeUser.id));
  }, []);

  const [chatAlreadyExists, setChatBool] = useState(false);
  const actualUrlUser = useMemo(() => {
    setUser(activeUser);
    // return query || urlUser;
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
    if (value === render) return setRender("Inventory");
    setRender(value);
  }

  const myFriend = friends?.find((f) => f.id === actualUrlUser.id);

  function addFriend(e) {
    dispatch(addNewFriend(activeUser.id, actualUrlUser.id));
  }

  function deleteThisFriend(e) {
    dispatch(
      deleteFriend({ userId: activeUser.id, friendId: actualUrlUser.id })
    );
  }

  const showToOwner = () => (
    <>
      <div className={style.containerPerfil}>
        <section className={style.containerImgPerfil}>
          <img src={activeUser.profileImg} alt="" />
        </section>
        <div className={style.containerName}>
          <span>{activeUser.username.toUpperCase()}</span>
          <section className={style.containerButtons}>
            <button className={render === "Inventory" ? `${style.buttons} ${style.buttonsActive}` : `${style.buttons}`} value="Inventory" onClick={(e) => { changeRender(e), handleClick(e); }}>
              Inventory
            </button>
            <button className={render === "Stats" ? `${style.buttons} ${style.buttonsActive}` : `${style.buttons}`} value="Stats" onClick={(e) => { changeRender(e) }}>
              Stats
            </button>
            <button className={render === "Config" ? `${style.buttons} ${style.buttonsActive}` : `${style.buttons}`} value="Config" onClick={(e) => { changeRender(e) }}>
              Config
            </button>
            <button
              className={render === "Chat" ? `${style.buttons} ${style.buttonsActive}` : `${style.buttons}`}
              value="Chat"
              onClick={(e) => {
                changeRender(e), handleClick(e);
              }}
            >
              Chat
            </button>
            <button
              className={render === "Friends" ? `${style.buttons} ${style.buttonsActive}` : `${style.buttons}`}
              value="Friends"
              onClick={(e) => {
                changeRender(e), handleClick(e);
              }}
            >
              Friends
            </button>
            <Link className={style.stars} to="/shop">
              <FaShoppingCart size={28} />
              Stars: {user.stars}
            </Link>
          </section>
        </div>
      </div>

      {render === "Config" ? (
        <div className={style.configContainer}>
          <Config user={user} />
        </div>
      ) : render === "Inventory" ? (
        <Inventory />
      ) : render === "Stats" ? (
        <Stats />
      ) : render === "Chat" ? (
        <PrivateChat />
      ) : render === "Friends" ? (
        <Friends id={activeUser.id} />
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
        <button
          className={`${style.buttons} ${style.disabled}`}
          value="Stats"
          onClick={(e) => changeRender(e)}
          disabled
        >
          Stats
        </button>
        <button
          className={`${style.buttons} ${style.disabled}`}
          value="Chat"
          onClick={(e) => changeRender(e)}
        >
          Chat
        </button>

        {myFriend ? (
          <button
            className={`${style.buttonsDelete} ${style.disabled}`}
            onClick={(e) => deleteThisFriend(e)}
          >
            Delete friend
          </button>
        ) : (
          <button
            className={`${style.buttons} ${style.disabled}`}
            onClick={(e) => addFriend(e)}
          >
            Add friend
          </button>
        )}
      </div>
      {/* {console.log(actualUrlUser)} */}
      {render === "Chat" ? (
        chatAlreadyExists ? (
          <PrivateChat selected={actualUrlUser} />
        ) : (
          <SinglePrivateChat newChatUser={actualUrlUser} />
        )
      ) : render === "Stats" ? (
        <Stats />
      ) : (
        ""
      )}
    </>
  );

  return Object.keys(user).length !== 0 ? (
    actualUrlUser === user || urlUser === null ? (
      showToOwner()
    ) : (
      showToVisitor()
    )
  ) : (
    <div className={style.response}>User not logged in</div>
  );
}
