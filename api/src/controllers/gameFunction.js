function shuffle(array) {
  // Starts from last element
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    // Random index between 0 and currentIndex
    randomIndex = Math.floor(Math.random() * currentIndex);

    // Decrease currentIndex each time current element is exhanged with a random one
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function battle(atk, def) {
  const roundsInfo = {},
    nRounds = atk.length >= def.length ? atk.length : def.length;
  const atkArmy = { ground: [], air: [] },
    defArmy = { ground: [], air: [] };

  for (let i = 0; i < nRounds; i++) {
    if (atk.length && def.length) {
      const newAtk = atk.shift(),
        newDef = def.shift();
      atkArmy[newAtk.movement].push(newAtk);
      defArmy[newDef.movement].push(newDef);

      for (let cardIndex in defArmy.ground) {
        const card = defArmy[cardIndex];

        for (let ability in card.abilities) {
          switch (ability) {
            case "all":
              for (let cast of ability) {
                for (let key in cast) {
                  const detection =
                    defArmy.ground.find((c) => {
                      c.all.find((e) => e.detector) ||
                        c.def.find((e) => e.detector);
                    }) ||
                    defArmy.air.find((c) => {
                      c.all.find((e) => e.detector) ||
                        c.def.find((e) => e.detector);
                    });
                  switch (key) {
                    case "splashDmg":
                      if (!cast[key].off) {
                        let abilityObjective;
                        switch (cast[key].objective) {
                          case "ground":
                            abilityObjective = atkArmy.ground;
                            break;
                          case "air":
                            abilityObjective = atkArmy.air;
                            break;
                          case "need":
                            const groundLife =
                              atkArmy.ground[0]?.life ||
                              0 + atkArmy.ground[1]?.life ||
                              0;
                            const airLife =
                              atkArmy.air[0]?.life ||
                              0 + atkArmy.air[1]?.life ||
                              0;
                            abilityObjective =
                              groundLife >= airLife
                                ? atkArmy.ground
                                : atkArmy.air;
                            break;
                        }
                        if (
                          abilityObjective[0] &&
                          ((!abilityObjective[0].all.find((e) => e.invisible) &&
                            !abilityObjective[0].atk.find(
                              (e) => e.invisible
                            )) ||
                            ((abilityObjective[0].all.find(
                              (e) => e.invisible
                            ) ||
                              abilityObjective[0].atk.find(
                                (e) => e.invisible
                              )) &&
                              detection))
                        ) {
                          abilityObjective[0].life =
                            abilityObjective[0].life - cast[key].num;
                          if (abilityObjective[1])
                            abilityObjective[1].life =
                              abilityObjective[1].life - cast[key].num;
                          if (abilityObjective[1].life <= 0) {
                            const front = abilityObjective.shift();
                            abilityObjective.shift();
                            if (front.life > 0) abilityObjective.unshift(front);
                          }

                          if (cast[key].time === "once") cast[key].off = true;
                        }
                      }
                      break;
                    case "control":
                      if (!cast[key].off) {
                        switch (cast[key]) {
                          case "ground":
                            if (
                              (!atkArmy.ground
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) &&
                                !atkArmy.ground
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible)) ||
                              ((atkArmy.ground
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) ||
                                atkArmy.ground
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible)) &&
                                detection)
                            ) {
                              defArmy.ground.unshift(atkArmy.ground.pop());
                            }
                            break;
                          case "air":
                            if (
                              (!atkArmy.air
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) &&
                                !atkArmy.air
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible)) ||
                              ((atkArmy.air
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) ||
                                atkArmy.air
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible)) &&
                                detection)
                            ) {
                              defArmy.air.unshift(atkArmy.air.pop());
                            }
                            break;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "allMoves":
                      break;
                    case "cloackTeam":
                      break;
                    case "deathOnAttack":
                      break;
                    case "modStat":
                      break;
                  }
                }
              }
            case "def":
              break;
          }
        }
      }
    }
  }
}

function gameFunction(deck1, deck2) {
  const [atk1, atk2, def1, def2] = [
    shuffle(
      deck1.length % 2 === 0
        ? deck1.map((c, i) => {
            if (i < deck1.length / 2) return c;
          })
        : deck1.map((c, i) => {
            if (i <= deck1.length / 2) return c;
          })
    ),
    shuffle(
      deck2.length % 2 === 0
        ? deck2.map((c, i) => {
            if (i < deck2.length / 2) return c;
          })
        : deck2.map((c, i) => {
            if (i <= deck2.length / 2) return c;
          })
    ),
    shuffle(
      deck1.length % 2 === 0
        ? deck1.map((c, i) => {
            if (i >= deck1.length / 2) return c;
          })
        : deck1.map((c, i) => {
            if (i > deck1.length / 2) return c;
          })
    ),
    shuffle(
      deck2.length % 2 === 0
        ? deck2.map((c, i) => {
            if (i >= deck2.length / 2) return c;
          })
        : deck2.map((c, i) => {
            if (i > deck2.length / 2) return c;
          })
    ),
  ];

  battle(atk1, def2);
  battle(atk2, def1);

  return {};
}

module.exports = gameFunction;
