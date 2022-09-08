import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import CardInPlayroom from "./CardInPlayroom";
import css from "../Playroom.module.css";
import styles from "./GameView.module.css";
export default function GameView({ info, close }) {
  const [battle, setBattle] = useState(info.info.battle1);
  const [battleNum, setBattleNum] = useState(1);
  const [roundInfo, setRoundInfo] = useState({
    AirAtkArmy: [],
    AirDefArmy: [],
    GroundAtkArmy: [],
    GroundDefArmy: [],
    Base: [],
  });
  const [round, setRound] = useState();
  const [totalRounds, setTotalRounds] = useState();
  const [attacker, setAttacker] = useState(),
    [defender, setDefender] = useState();
  const [final, setFinal] = useState();
  const [winner, setWinner] = useState();
  const [timeOut, setTimeOut] = useState();
  const [race, setRace] = useState();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (info.info.winner === info.info.player1.userId)
      setWinner(info.info.player1.username);
    else if (info.info.winner === info.info.player2.userId)
      setWinner(info.info.player2.username);
    else setWinner("It is a tie!");
  }, [info]);

  useEffect(() => {
    if (!final) {
      if (info.info.player1.userId === battle.attacker) {
        setAttacker(info.info.player1.username);
        setDefender(info.info.player2.username);
        setRace(info.info.player2.race);
      } else {
        setAttacker(info.info.player2.username);
        setDefender(info.info.player1.username);
        setRace(info.info.player1.race);
      }
      setTotalRounds(battle.AirAtkArmy.length);
      setRound(0);
    }
    if (battle.attacker) {
      setChanged((prev) => !prev);
    }
  }, [battle]);

  const [roundGo, setRoundGo] = useState(true);
  useEffect(() => {
    if (round !== 0) {
      setRoundInfo({
        AirAtkArmy: battle.AirAtkArmy[round],
        AirDefArmy: battle.AirDefArmy[round],
        GroundAtkArmy: battle.GroundAtkArmy[round],
        GroundDefArmy: battle.GroundDefArmy[round],
        Base: battle.Base[round],
      });
      setRoundGo((prev) => !prev);
    }
  }, [round]);

  useEffect(() => {
    setRoundInfo({
      AirAtkArmy: battle.AirAtkArmy[round],
      AirDefArmy: battle.AirDefArmy[round],
      GroundAtkArmy: battle.GroundAtkArmy[round],
      GroundDefArmy: battle.GroundDefArmy[round],
      Base: battle.Base[round],
    });
    setRoundGo((prev) => !prev);
  }, [changed]);

  useEffect(() => {
    if (round >= 0 && totalRounds && !final) {
      if (round < totalRounds - 1) {
        if (round === 0 || round === totalRounds - 2) {
          setTimeOut(
            setTimeout(() => {
              setRound((prev) => prev + 1);
            }, 2500)
          );
        } else {
          setTimeOut(
            setTimeout(() => {
              setRound((prev) => prev + 1);
            }, 500)
          );
        }
      } else {
        if (battleNum === 1) {
          setBattle(info.info.battle2);
          setRoundInfo({
            AirAtkArmy: [],
            AirDefArmy: [],
            GroundAtkArmy: [],
            GroundDefArmy: [],
            Base: [],
          });
          setBattleNum(2);
        } else {
          setFinal(true);
          setBattle({});
        }
      }
    }
  }, [roundGo]);

  function handleNextBattle() {
    clearTimeout(timeOut);
    if (battleNum === 1) {
      setRoundInfo({
        AirAtkArmy: [],
        AirDefArmy: [],
        GroundAtkArmy: [],
        GroundDefArmy: [],
        Base: [],
      });
      setBattleNum(2);
      setBattle(info.info.battle2);
    } else {
      setFinal(true);
      setBattle({});
    }
  }

  function handlePrevBattle() {
    clearTimeout(timeOut);
    if (!final) {
      setRoundInfo({
        AirAtkArmy: [],
        AirDefArmy: [],
        GroundAtkArmy: [],
        GroundDefArmy: [],
        Base: [],
      });
      setBattleNum(1);
      setBattle(info.info.battle1);
    } else {
      setRoundInfo({
        AirAtkArmy: [],
        AirDefArmy: [],
        GroundAtkArmy: [],
        GroundDefArmy: [],
        Base: [],
      });
      setBattleNum(2);
      setFinal(false);
      setBattle(info.info.battle2);
    }
  }

  return (
    <div className={css.battleContainer}>
      <button onClick={close} className={css.close}>
        X
      </button>
      <div className={css.battleButtons}>
        {battleNum === 2 || final ? (
          <button onClick={handlePrevBattle} className={css.battleButton}>
            {"<"}
          </button>
        ) : (
          <></>
        )}
        <span className={css.battleText}>Battle</span>
        {!final ? (
          <button onClick={handleNextBattle} className={css.battleButton}>
            {">"}
          </button>
        ) : (
          <></>
        )}
      </div>
      {!final ? (
        <div
          className={
            race === "Zerg"
              ? css.battleZerg
              : race === "Terran"
              ? css.battleTerran
              : css.battleProtoss
          }
        >
          <div className={styles.cardsContainer}>
            <div className={styles.componentsAtk}>
              <div className={styles.attacker}>
                <span>Attacker: {attacker}</span>
              </div>
              <div className={styles.card}>
                {roundInfo.AirAtkArmy?.length ? (
                  <CardInPlayroom
                    card={roundInfo.AirAtkArmy[0]}
                  ></CardInPlayroom>
                ) : (
                  <div />
                )}
              </div>
              <div className={styles.card}>
                {roundInfo.GroundAtkArmy?.length ? (
                  <CardInPlayroom
                    card={roundInfo.GroundAtkArmy[0]}
                  ></CardInPlayroom>
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className={styles.base}>Base Lifepoints: {roundInfo.Base}</div>
            <div className={styles.componentsDef}>
              <div className={styles.baseData}>
                <span>Defender: {defender}</span>
              </div>
              <div className={styles.card}>
                {roundInfo.AirDefArmy?.length ? (
                  <CardInPlayroom
                    card={roundInfo.AirDefArmy[0]}
                  ></CardInPlayroom>
                ) : (
                  <div />
                )}
              </div>
              <div className={styles.card}>
                {roundInfo.GroundDefArmy?.length ? (
                  <CardInPlayroom
                    card={roundInfo.GroundDefArmy[0]}
                  ></CardInPlayroom>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={css.battleFinal}>
          {winner === "It is a tie!" ? (
            <span className={css.winner}>{winner}</span>
          ) : (
            <span className={css.winner}>Winner: {winner}</span>
          )}
        </div>
      )}
    </div>
  );
}
