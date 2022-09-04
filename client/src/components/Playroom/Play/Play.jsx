import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getUserGames } from "../../../redux/actions/user";
import socket from "../../../../Socket";
import GameView from "./GameView";

import css from "./PrivateChat.module.css";

const Play = () => {
  const dispatch = useDispatch();

  const userActiveGlobal = useSelector((state) => state.userReducer.user);
  const [userActive, setUserActive] = useState(userActiveGlobal);
  const reduxGames = useSelector((state) => state.userReducer.games);
  const [games, setGames] = useState([]);
  const [onGame, setOnGame] = useState();
  const [gameView, setGameView] = useState({ info: {}, bool: false });

  useEffect(() => {
    setUserActive(userActiveGlobal);
  }, [userActiveGlobal]);

  useEffect(() => {
    setGames(reduxGames);
  }, [reduxGames]);

  useEffect(() => {
    dispatch(getUser(userActive.id));
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

  useEffect(() => {
    socket.on("gameResults", () => {
      dispatch(getUser(userActive.id));
      dispatch(getUserGames(userActive.id));
    });
    return () => {
      socket.off();
    };
  }, [games]);

  function handlePlay() {
    socket.emit("playRequest", userActive.id);
  }

  function handleGameView(game) {
    setGameView({ info: game, bool: true });
  }

  function handleGameViewClose() {
    setGameView({ info: undefined, bool: false });
  }

  return (
    <>
      {gameView.bool ? (
        <GameView info={gameView.info} close={handleGameViewClose} />
      ) : (
        <div>
          <div>
            <span>Game history</span>
            {games.length &&
              games.map((g, i) => {
                return (
                  <div key={i} onClick={(e) => handleGameView(g)}>
                    <span>{g.player1.race}</span> vs{" "}
                    <span>{g.player2.race}</span>
                  </div>
                );
              })}
          </div>
          {onGame ? (
            <button disabled>Queued...</button>
          ) : (
            <button onClick={handlePlay}>Play!</button>
          )}
        </div>
      )}
    </>
  );
};

export default Play;
