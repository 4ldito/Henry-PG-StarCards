import React, { useState, useRef, useEffect } from "react";
import useValidToken from "./../../hooks/useValidToken";

import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserGames } from "../../redux/actions/user";
import socket from "../../../Socket";
import GameView from "./Play/GameView";

import style from "./Playroom.module.css";
import styleChat from "../Chat/Chat.module.css";
import Ranking from "./Ranking";

export default function Playroom() {
  useValidToken({ navigate: true });
  const [openChat, setOpenChat] = useState(false);
  const userActiveGlobal = useSelector((state) => state.userReducer.user);
  const players = useSelector((state) => state.userReducer.players);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userActiveGlobal.id));
  }, []);

  const handleChatOpen = () => {
    setOpenChat((prev) => !prev);
  };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [userActive, setUserActive] = useState(userActiveGlobal);
  const reduxGames = useSelector((state) => state.userReducer.games);
  const [games, setGames] = useState([]);
  const [onGame, setOnGame] = useState();
  const [gameView, setGameView] = useState({ info: {}, bool: false });

  //
  // Chat
  //

  useEffect(() => {
    socket.emit("connectPublicChat", userActiveGlobal.username);
  }, [userActiveGlobal.username]);

  useEffect(() => {
    socket.on("messages", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("gameResults", () => {
      dispatch(getUserGames(userActive.id));
      setOnGame(false);
    });

    return () => {
      socket.off();
    };
  }, [messages, games]);

  const divRef = useRef(null);

  useEffect(() => {
    if (openChat) divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;
    socket.emit("publicMessage", userActiveGlobal.username, message);
    setMessage("");
  };

  //
  //Game
  //

  useEffect(() => {
    setUserActive(userActiveGlobal);
  }, [userActiveGlobal]);

  useEffect(() => {
    setGames(reduxGames);
  }, [reduxGames]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "auto" });
    dispatch(getUserGames(userActive.id));
  }, []);

  useEffect(() => {
    if (userActive) {
      setOnGame(userActive.onGame);
      dispatch(getUserGames(userActive.id));
      socket.emit("connectGameSocket", userActive.id);
    }

    return () => socket.emit("disconnectGameSocket", userActive.id);
  }, [userActive]);

  function handlePlay() {
    if (userActive.defaultDeck) {
      socket.emit("playRequest", userActive.id);
      setOnGame(true);
    }
  }

  function handleGameView(game) {
    setGameView({ info: game, bool: true });
  }

  function handleGameViewClose() {
    setGameView({ info: undefined, bool: false });
  }

  // console.log(games.at(-1));

  return (
    <>
      <div className={style.container}>
        {gameView.bool ? (
          <GameView info={gameView.info} close={handleGameViewClose} />
        ) : (
          <div>
            <div>
              {games.length !== 0 ? (
                <>
                  <span>Game history</span>
                  {games.map((g, i) => {
                    return (
                      <div key={i} onClick={(e) => handleGameView(g)}>
                        <div>
                          <span>{g.info.player1.username}</span> vs{" "}
                          <span>{g.info.player2.username}</span>
                        </div>
                        <div>
                          <span>{g.info.player1.race}</span> vs{" "}
                          <span>{g.info.player2.race}</span>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                "No games played yet!"
              )}
            </div>
            {onGame ? (
              <button disabled>Queued...</button>
            ) : (
              <button onClick={handlePlay}>Play!</button>
            )}
          </div>
        )}
        <Ranking />
      </div>
      {
        <div className={!openChat ? `${style.hideChat}` : ""}>
          <div className={styleChat.container}>
            <div className={styleChat.msgContainer}>
              <p className={styleChat.msg}>
                Welcome {userActive.username}! In this public chat you can talk
                to other players from this community, solve doubts and have fun!
                Remember: be respectful, avoid being penalized.
              </p>
              {messages.map((e, i) => (
                <div key={i} className={styleChat.msg}>
                  <span className={styleChat.msgUsername}>{e.username}:</span>{" "}
                  {e.message}
                </div>
              ))}
              <div ref={divRef}></div>
            </div>
            <form className={styleChat.formContainer} onSubmit={handleSubmit}>
              <input
                placeholder="Write here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className={styleChat.btn}>Send</button>
            </form>
          </div>
        </div>
      }
      <div className={style.containerBtn}>
        <button onClick={handleChatOpen} className={style.btnChat}>
          Public Chat
        </button>
      </div>
    </>
  );
}
