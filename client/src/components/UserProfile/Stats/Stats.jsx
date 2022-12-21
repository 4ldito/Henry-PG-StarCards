import React, { useEffect, useState } from "react";
import { getUserGames } from "./../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import ZERG from "../../../img/zerg.svg";
import PROTOSS from "../../../img/protoss.svg";
import TERRAN from "../../../img/terran.svg";
import style from "./Stats.module.css";

const Stats = ({ user }) => {
  const dispatch = useDispatch();

  const games = useSelector((state) => state.userReducer.games);

  const [infoGames, setInfoGames] = useState({
    zerg: { wins: 0, loses: 0, ties: 0 },
    protoss: { wins: 0, loses: 0, ties: 0 },
    terran: { wins: 0, loses: 0, ties: 0 },
    total: { wins: 0, loses: 0, ties: 0 },
  });

  useEffect(() => {
    games.forEach(({ info }) => {
      const result =
        info.winner === user.id
          ? "wins"
          : info.winner === "tie"
          ? "ties"
          : "loses";
      const player = info.player1.userId === user.id ? "player1" : "player2";
      const race = info[player].race.toLowerCase();

      const newInfoGames = { ...infoGames };
      newInfoGames[race][result] = newInfoGames[race][result] + 1;
      newInfoGames.total[result] = newInfoGames.total[result] + 1;

      setInfoGames(newInfoGames);
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
    <div className={style.containerTo}>
      <div className={style.div}>
        <img className={style.race} src={ZERG} alt="Zerg Icon" />
        <span>ZERG</span>
        <div className={style.seccion}>
          <strong>WINS: </strong>
          <span className={style.span}>{infoGames.zerg.wins}</span>
        </div>
        <div className={style.seccion}>
          <strong>LOSES: </strong>
          <span className={style.span}>{infoGames.zerg.loses}</span>
        </div>
        <div className={style.seccion}>
          <strong>TIES: </strong>
          <span className={style.span}>{infoGames.zerg.ties}</span>
        </div>
      </div>

      <div className={style.div}>
        <img className={style.race} src={PROTOSS} alt="Protoss Icon" />
        <span>PROTOSS</span>

        <div className={style.seccion}>
          <strong>WINS: </strong>
          <span className={style.span}>{infoGames.protoss.wins}</span>
        </div>
        <div className={style.seccion}>
          <strong>LOSES: </strong>
          <span className={style.span}>{infoGames.protoss.loses}</span>
        </div>
        <div className={style.seccion}>
          <strong>TIES: </strong>
          <span className={style.span}>{infoGames.protoss.ties}</span>
        </div>
      </div>

      <div className={style.div}>
        <img className={style.race} src={TERRAN} alt="Terran Icon" />
        <span>TERRAN</span>

        <div className={style.seccion}>
          <strong>WINS: </strong>
          <span className={style.span}>{infoGames.terran.wins}</span>
        </div>
        <div className={style.seccion}>
          <strong>LOSES: </strong>
          <span className={style.span}>{infoGames.terran.loses}</span>
        </div>
        <div className={style.seccion}>
          <strong>TIES: </strong>
          <span className={style.span}>{infoGames.terran.ties}</span>
        </div>
      </div>

      <div className={style.div}>
        <div className={style.race} />
        <span>TOTAL</span>

        <div className={style.seccion}>
          <strong>WINS: </strong>
          <span className={style.span}>{infoGames.total.wins}</span>
        </div>
        <div className={style.seccion}>
          <strong>LOSES: </strong>
          <span className={style.span}>{infoGames.total.loses}</span>
        </div>
        <div className={style.seccion}>
          <strong>TIES: </strong>
          <span className={style.span}>{infoGames.total.ties}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
