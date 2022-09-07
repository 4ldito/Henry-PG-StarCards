import React, { useEffect, useState } from "react";
import { getUserGames } from "./../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import style from "./Stats.module.css";

const Stats = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const games = useSelector((state) => state.userReducer.games);

  const [infoGames, setInfoGames] = useState({
    zerg: { wins: 0, loses: 0, ties: 0 },
    protoss: { wins: 0, loses: 0, ties: 0 },
    terran: { wins: 0, loses: 0, ties: 0 },
    total: { wins: 0, loses: 0, ties: 0 },
  });

  useEffect(() => {
    games.forEach(({ info }) => {
      const result = info.winner === user.id ? 'wins' : info.winner === 'tie' ? 'ties' : 'loses';
      const player = info.player1.userId === user.id ? "player1" : "player2";
      const race = info[player].race.toLowerCase();

      const newInfoGames = { ...infoGames }
      newInfoGames[race][result] = newInfoGames[race][result] + 1;
      newInfoGames.total[result] = newInfoGames.total[result] + 1;

      setInfoGames(newInfoGames)
    });
  }, [games]);

  useEffect(() => {
    setInfoGames({
      zerg: { wins: 0, loses: 0, ties: 0 },
      protoss: { wins: 0, loses: 0, ties: 0 },
      terran: { wins: 0, loses: 0, ties: 0 },
      total: { wins: 0, loses: 0, ties: 0 },
    });
    dispatch(getUserGames(user.id));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <div className={style.infoGameContainer}>
          <img src="" alt="Zerg icon" />
          <h3>Zerg</h3>
          <div className={style.infoStatsContainer}>
            <p>Wins: {infoGames.zerg.wins}</p>
            <p>Loses: {infoGames.zerg.loses}</p>
            <p>Ties: {infoGames.zerg.ties}</p>
          </div>
        </div>

        <div className={style.infoGameContainer}>
          <h3>Protoss</h3>
          <div className={style.infoStatsContainer}>
            <p>Wins: {infoGames.protoss.wins}</p>
            <p>Loses: {infoGames.protoss.loses}</p>
            <p>Ties: {infoGames.protoss.ties}</p>
          </div>
        </div>

        <div className={style.infoGameContainer}>
          <h3>Terran</h3>
          <div className={style.infoStatsContainer}>
            <p>Wins: {infoGames.terran.wins}</p>
            <p>Loses: {infoGames.terran.loses}</p>
            <p>Ties: {infoGames.terran.ties}</p>
          </div>
        </div>

        <div className={style.infoGameContainer}>
          <h3>Total</h3>
          <div className={style.infoStatsContainer}>
            <p>Wins: {infoGames.total.wins}</p>
            <p>Loses: {infoGames.total.loses}</p>
            <p>Ties: {infoGames.total.ties}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
