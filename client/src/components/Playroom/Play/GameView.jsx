import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import CardInPlayroom from './CardInPlayroom'
import css from "../Playroom.module.css";
import styles from './GameView.module.css';
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

  useEffect(() => {
    if (info.info.winner === info.info.player1.userId)
      setWinner(info.info.player1.username);
    else if (info.info.winner === info.info.player2.userId)
      setWinner(info.info.player2.username);
    else setWinner("It is a tie!");
  }, [info]);

  useEffect(() => {
    if (info.info.player1.userId === battle.attacker) {
      setAttacker(info.info.player1.username);
      setDefender(info.info.player2.username);
      setRace(info.info.player2.race);
    } else {
      setAttacker(info.info.player2.username);
      setDefender(info.info.player1.username);
      setRace(info.info.player1.race);
    }

    // setRoundInfo({
    //   AirAtkArmy: battle.AirAtkArmy[0],
    //   AirDefArmy: battle.AirDefArmy[0],
    //   GroundAtkArmy: battle.GroundAtkArmy[0],
    //   GroundDefArmy: battle.GroundDefArmy[0],
    //   Base: battle.Base[0],
    // });
    setRound(0);

    setTotalRounds(battle.AirAtkArmy.length);
  }, [battle]);

  useEffect(() => {
    if (round >= 0 && totalRounds) {
      if (round < totalRounds) {
        setRoundInfo({
          AirAtkArmy: battle.AirAtkArmy[round],
          AirDefArmy: battle.AirDefArmy[round],
          GroundAtkArmy: battle.GroundAtkArmy[round],
          GroundDefArmy: battle.GroundDefArmy[round],
          Base: battle.Base[round],
        });
        setTimeOut(
          setTimeout(() => {
            setRound((prev) => prev + 1);
          }, 2000)
        );
      } else {
        if (battleNum < 2) {
          setBattle(info.info.battle2);
          setBattleNum(2);
        } else setFinal(true);
      }
    }
  }, [round]);

  function handleNextBattle() {
    clearTimeout(timeOut);
    if (battleNum === 1) {
      setBattle(() => {
        setRoundInfo({
          AirAtkArmy: [],
          AirDefArmy: [],
          GroundAtkArmy: [],
          GroundDefArmy: [],
          Base: [],
        });
        return info.info.battle2;
      });
      setBattleNum(2);
    } else setFinal(true);
  }

  function handlePrevBattle() {
    clearTimeout(timeOut);
    if (battleNum !== 0 && !final) {
      setBattle(() => {
        setRoundInfo({
          AirAtkArmy: [],
          AirDefArmy: [],
          GroundAtkArmy: [],
          GroundDefArmy: [],
          Base: [],
        });
        return info.info.battle1;
      });
      setBattleNum(1);
    } else {
      setBattle(() => {
        setRoundInfo({
          AirAtkArmy: [],
          AirDefArmy: [],
          GroundAtkArmy: [],
          GroundDefArmy: [],
          Base: [],
        });
        return info.info.battle2;
      });
      setBattleNum(2);
      setFinal(false);
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
            <div className={styles.components}>
              <div className={styles.attacker}>
                <span>Attacker: {attacker}</span>
              </div>
              <div className={styles.card}>
                {roundInfo.AirAtkArmy?.length ? (
                  <CardInPlayroom card={roundInfo.AirAtkArmy[0]}></CardInPlayroom>
                ) : (
                  <div />
                )}
              </div>
              <div className={styles.card}>
                {roundInfo.GroundAtkArmy?.length ? (
                  <CardInPlayroom card={roundInfo.GroundAtkArmy[0]}></CardInPlayroom>
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className={styles.components}>
              <div className={styles.baseData}>
                <span>Base Lifepoints: {roundInfo.Base}</span>
                <span>Defender: {defender}</span>
              </div>
              <div className={styles.card}>
                {roundInfo.AirDefArmy?.length ? (
                
                  <CardInPlayroom card={roundInfo.AirDefArmy[0]}></CardInPlayroom>
                ) : (
                  <div />
                )}
              </div>
              <div className={styles.card}>
                {roundInfo.GroundDefArmy?.length ? (
                 
                  <CardInPlayroom card={roundInfo.GroundDefArmy[0]}></CardInPlayroom>
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
