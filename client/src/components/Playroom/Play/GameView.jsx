import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import css from "../Playroom.module.css";

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
          <div>
            <span>Attacker: {attacker}</span>
            <span>Base Lifepoints: {roundInfo.Base}</span>
            <span>Defender: {defender}</span>
          </div>
          <div>
            <div>
              {roundInfo.AirAtkArmy?.length ? (
                <Card
                  id={roundInfo.AirAtkArmy[0].id}
                  name={roundInfo.AirAtkArmy[0].name}
                  image={roundInfo.AirAtkArmy[0].image}
                  cost={roundInfo.AirAtkArmy[0].cost}
                  Gdmg={roundInfo.AirAtkArmy[0].Gdmg}
                  Admg={roundInfo.AirAtkArmy[0].Admg}
                  life={roundInfo.AirAtkArmy[0].life}
                  ability={roundInfo.AirAtkArmy[0].ability}
                  abilities={roundInfo.AirAtkArmy[0].abilities}
                  race={roundInfo.AirAtkArmy[0].race}
                  movement={roundInfo.AirAtkArmy[0].movement}
                />
              ) : (
                <div />
              )}
            </div>
            <div>
              {roundInfo.GroundAtkArmy?.length ? (
                <Card
                  id={roundInfo.GroundAtkArmy[0].id}
                  name={roundInfo.GroundAtkArmy[0].name}
                  image={roundInfo.GroundAtkArmy[0].image}
                  cost={roundInfo.GroundAtkArmy[0].cost}
                  Gdmg={roundInfo.GroundAtkArmy[0].Gdmg}
                  Admg={roundInfo.GroundAtkArmy[0].Admg}
                  life={roundInfo.GroundAtkArmy[0].life}
                  ability={roundInfo.GroundAtkArmy[0].ability}
                  abilities={roundInfo.GroundAtkArmy[0].abilities}
                  race={roundInfo.GroundAtkArmy[0].race}
                  movement={roundInfo.GroundAtkArmy[0].movement}
                />
              ) : (
                <div />
              )}
            </div>
          </div>
          <div>
            <div>
              {roundInfo.AirDefArmy?.length ? (
                <Card
                  id={roundInfo.AirDefArmy[0].id}
                  name={roundInfo.AirDefArmy[0].name}
                  image={roundInfo.AirDefArmy[0].image}
                  cost={roundInfo.AirDefArmy[0].cost}
                  Gdmg={roundInfo.AirDefArmy[0].Gdmg}
                  Admg={roundInfo.AirDefArmy[0].Admg}
                  life={roundInfo.AirDefArmy[0].life}
                  ability={roundInfo.AirDefArmy[0].ability}
                  abilities={roundInfo.AirDefArmy[0].abilities}
                  race={roundInfo.AirDefArmy[0].race}
                  movement={roundInfo.AirDefArmy[0].movement}
                />
              ) : (
                <div />
              )}
            </div>
            <div>
              {roundInfo.GroundDefArmy?.length ? (
                <Card
                  id={roundInfo.GroundDefArmy[0].id}
                  name={roundInfo.GroundDefArmy[0].name}
                  image={roundInfo.GroundDefArmy[0].image}
                  cost={roundInfo.GroundDefArmy[0].cost}
                  Gdmg={roundInfo.GroundDefArmy[0].Gdmg}
                  Admg={roundInfo.GroundDefArmy[0].Admg}
                  life={roundInfo.GroundDefArmy[0].life}
                  ability={roundInfo.GroundDefArmy[0].ability}
                  abilities={roundInfo.GroundDefArmy[0].abilities}
                  race={roundInfo.GroundDefArmy[0].race}
                  movement={roundInfo.GroundDefArmy[0].movement}
                />
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={css.battleFinal}>
          {winner === "It is a tie!" ? (
            <span>{winner}</span>
          ) : (
            <span>Winner: {winner}</span>
          )}
        </div>
      )}
    </div>
  );
}
