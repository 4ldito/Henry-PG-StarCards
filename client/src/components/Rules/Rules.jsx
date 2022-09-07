import React from "react";

import css from "./Rules.module.css";
import img from "../../img/rules.png";

export default function Rules() {
  return (
    <div className={css.rules}>
      <section className={css.container}>
        <section className={css.seccionImg}>
          <img className={css.img} src={img} />
        </section>
        <section className={css.seccionInfo}>
          <p>
            Your objective in this game is to create a deck, which will be
            divided into two randomly ordered armies: attacker and defender. The
            attacker army will besiege the enemy base and try to destroy it. The
            defender army will protecto your base and try to defeat the enemy
            attackers. Bases have 1000 life points. At the end of a game, the
            player with the less damaged base will win. If both bases have the
            same life points, the one that resisted more attacks will be the
            winner. Your deck must have a unique race: Zerg, Terran or Protoss.
            Each card, beside a name and an illustration, has: -Movement: ground
            or flying, determinates who can attack the card. -Minerals cost:
            your deck's total cost cannot be higher than 10.000 minerals. -Life:
            armies fight in order of card apparition. Those cards with 0 life
            will be erased from the fight. -Damage: the first and second number
            represent ground and anti-air damage, respectively. -Abilities: can
            be casted always (all), or when the card is specifically attacking
            (atk) or defending (def). --Invisible: can only be attacked if the
            enemy has a detector. --Detector: can detect invisible units.
            --Life/Damage modifiers: represent adding or losing stats,
            regenerating life, causing damage, etc. --Control: controlls the
            last unit of the enemy army and puts it in front. --Cloack: makes
            your units invisible.
          </p>
        </section>
      </section>
    </div>
  );
}
