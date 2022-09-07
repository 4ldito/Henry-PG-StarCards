import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";

export default function GameView({ info, close }) {
  const [battle, setBattle] = useState(info.info.battle1);
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
    } else {
      setAttacker(info.info.player2.username);
      setDefender(info.info.player1.username);
    }

    setRoundInfo({
      AirAtkArmy: battle.AirAtkArmy[0],
      AirDefArmy: battle.AirDefArmy[0],
      GroundAtkArmy: battle.GroundAtkArmy[0],
      GroundDefArmy: battle.GroundDefArmy[0],
      Base: battle.Base[0],
    });
    setRound(0);

    setTotalRounds(battle.AirAtkArmy.length);
  }, [battle]);

  useEffect(() => {
    if (round < totalRounds) {
      setRoundInfo({
        AirAtkArmy: battle.AirAtkArmy[round],
        AirDefArmy: battle.AirDefArmy[round],
        GroundAtkArmy: battle.GroundAtkArmy[round],
        GroundDefArmy: battle.GroundDefArmy[round],
        Base: battle.Base[round],
      });
      setTimeout(() => {
        setRound((prev) => prev + 1);
      }, 3000);
    } else {
      if (battle !== info.info.battle2) setBattle(info.info.battle2);
      else setFinal(true);
    }
  }, [round]);

  console.log(
    roundInfo.GroundAtkArmy.reduce((acc, e) => {
      return e.life === 0 ? acc + 1 : acc;
    }, 0)
  );
  return (
    <div>
      <button onClick={close}>X</button>
      {!final ? (
        <>
          <div>
            <span>Attacker: {attacker}</span>
            <span>Base Lifepoints: {roundInfo.Base[round]}</span>
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
        </>
      ) : (
        <div>
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
