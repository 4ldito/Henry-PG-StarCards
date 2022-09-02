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

function notNegative(num) {
  return num < 0 ? 0 : num;
}

function battle(atk, def) {
  const roundsInfo = {};
  const atkArmy = { ground: [], air: [] },
    defArmy = { ground: [], air: [] };

  while (!defArmy.defeated && !atkArmy.defeated) {
    const newAtk = atk.shift(),
      newDef = def.shift();
    if (newAtk) atkArmy[newAtk.movement].push(newAtk);
    if (newDef) defArmy[newDef.movement].push(newDef);

    for (let army in defArmy) {
      for (let cardIndex in army) {
        const card = army[cardIndex];

        for (let ability in card.abilities) {
          switch (true) {
            case ability === "all" || ability === "def":
              for (let cast of ability) {
                for (let key in cast) {
                  const detection =
                    defArmy.ground.find((c) => {
                      c.abilities.all.find((e) => e.detector) ||
                        c.abilities.def.find((e) => e.detector);
                    }) ||
                    defArmy.air.find((c) => {
                      c.abilities.all.find((e) => e.detector) ||
                        c.abilities.def.find((e) => e.detector);
                    });
                  switch (key) {
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
                                  .abilities.atk.find((a) => a.invisible) &&
                                !atkArmy.ground.at(-1).abilities.cloacked) ||
                              ((atkArmy.ground
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) ||
                                atkArmy.ground
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible) ||
                                atkArmy.ground.at(-1).abilities.cloacked) &&
                                detection)
                            ) {
                              defArmy.ground.unshift(atkArmy.ground.pop());
                            } else {
                              const toControl = atkArmy
                                .reverse()
                                .indexOf(
                                  (c) =>
                                    !c.abilities.all.invisible &&
                                    !c.abilities.atk.invisible &&
                                    !c.abilities.cloacked
                                );
                              defArmy.ground.unshift(
                                atkArmy.splice(toControl, 1)
                              );
                            }
                            break;
                          case "air":
                            if (
                              (!atkArmy.air
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) &&
                                !atkArmy.air
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible) &&
                                !atkArmy.air.at(-1).abilities.cloacked) ||
                              ((atkArmy.air
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) ||
                                atkArmy.air
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible) ||
                                atkArmy.air.at(-1).abilities.cloacked) &&
                                detection)
                            ) {
                              defArmy.air.unshift(atkArmy.air.pop());
                            }
                            break;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "cloackTeam":
                      if (!cast[key].off) {
                        for (let ally of defArmy.ground) {
                          if (ally.id !== card.id)
                            ally.abilities.cloacked = true;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "modStat":
                      if (!cast[key].off) {
                        const objective =
                          cast[key].team === "enemy" ? atkArmy : defArmy;
                        switch (cast[key].mod) {
                          case "changeMov":
                            switch (cast[key.change]) {
                              case "ground":
                                if (card.movement !== "ground") {
                                  defArmy.ground.unshift(
                                    defArmy.air.splice(cardIndex, 1)
                                  );
                                }
                                break;
                              case "air":
                                if (card.movement !== "air") {
                                  defArmy.air.unshift(
                                    defArmy.ground.splice(cardIndex, 1)
                                  );
                                }
                                break;
                              case "need":
                                const groundLife = defArmy.ground.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                const airLife = defArmy.air.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                if (
                                  groundLife <= airLife &&
                                  card.movement === "air"
                                )
                                  defArmy.air.unshift(
                                    defArmy.ground.splice(cardIndex, 1)
                                  );
                                else if (
                                  groundLife > airLife &&
                                  card.movement === "ground"
                                )
                                  defArmy.ground.unshift(
                                    defArmy.air.splice(cardIndex, 1)
                                  );
                                break;
                            }
                          case "inc":
                            switch (cast[key].stat) {
                              case "Gdmg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.Gdmg += cast[key].num;
                                    else {
                                      card.Gdmg =
                                        card.Gdmg +
                                        card.Gdmg * (cast[key].perc / 100);
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].Gdmg += cast[key].num;
                                    else if (objective.ground.length) {
                                      objective.ground[0].Gdmg =
                                        objective.ground[0].Gdmg +
                                        objective.ground[0].Gdmg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].Gdmg += cast[key].num;
                                    else if (objective.air.length) {
                                      objective.air[0].Gdmg =
                                        objective.air[0].Gdmg +
                                        objective.air[0].Gdmg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const groundGdmg =
                                      objective.ground[0]?.Gdmg;
                                    const airGdmg = objective.air[0]?.Gdmg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].Gdmg +=
                                          cast[key].num;
                                      else if (objective.ground.length) {
                                        objective.ground[0].Gdmg =
                                          objective.ground[0].Gdmg +
                                          objective.ground[0].Gdmg *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      objective.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].Gdmg += cast[key].num;
                                      else if (objective.air.length) {
                                        objective.air[0].Gdmg =
                                          objective.air[0].Gdmg +
                                          objective.air[0].Gdmg *
                                            (cast[key].perc / 100);
                                      }
                                    }
                                    break;
                                }
                                break;
                              case "Admg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.Admg += cast[key].num;
                                    else {
                                      card.Admg =
                                        card.Admg +
                                        card.Admg * (cast[key].perc / 100);
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].Admg += cast[key].num;
                                    else if (objective.ground.length) {
                                      objective.ground[0].Admg =
                                        objective.ground[0].Admg +
                                        defArmy.ground[0].Admg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].Admg += cast[key].num;
                                    else if (objective.air.length) {
                                      objective.air[0].Admg =
                                        objective.air[0].Admg +
                                        objective.air[0].Admg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const groundGdmg =
                                      objective.ground[0]?.Admg;
                                    const airGdmg = objective.air[0]?.Admg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].Admg +=
                                          cast[key].num;
                                      else if (objective.ground.length) {
                                        objective.ground[0].Admg =
                                          objective.ground[0].Admg +
                                          objective.ground[0].Admg *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      defAobjectivermy.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].Admg += cast[key].num;
                                      else if (objective.air.length) {
                                        objective.air[0].Admg =
                                          objective.air[0].Admg +
                                          objective.air[0].Admg *
                                            (cast[key].perc / 100);
                                      }
                                    }
                                    break;
                                }
                                break;
                              case "life":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.life += cast[key].num;
                                    else {
                                      card.life =
                                        card.life +
                                        card.life * (cast[key].perc / 100);
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].life += cast[key].num;
                                    else if (objective.ground.length) {
                                      objective.ground[0].life =
                                        objective.ground[0].life +
                                        objective.ground[0].life *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].life += cast[key].num;
                                    else if (objective.air.length) {
                                      objective.air[0].life =
                                        objective.air[0].life +
                                        objective.air[0].life *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const groundGdmg =
                                      objective.ground[0]?.life;
                                    const airGdmg = objective.air[0]?.life;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].life +=
                                          cast[key].num;
                                      else if (objective.ground.length) {
                                        objective.ground[0].life =
                                          objective.ground[0].life +
                                          objective.ground[0].life *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      objective.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].life += cast[key].num;
                                      else if (objective.air.length) {
                                        objective.air[0].life =
                                          objective.air[0].life +
                                          objective.air[0].life *
                                            (cast[key].perc / 100);
                                      }
                                    }
                                    break;
                                }
                                break;
                            }
                          case "dec":
                            switch (cast[key].stat) {
                              case "Gdmg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.Gdmg = notNegative(
                                        card.Gdmg - cast[key].num
                                      );
                                    else {
                                      card.Gdmg = notNegative(
                                        card.Gdmg -
                                          card.Gdmg * (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].Gdmg = notNegative(
                                        objective.ground[0].Gdmg - cast[key].num
                                      );
                                    else if (objective.ground.length) {
                                      objective.ground[0].Gdmg = notNegative(
                                        objective.ground[0].Gdmg -
                                          objective.ground[0].Gdmg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].Gdmg = notNegative(
                                        objective.air[0].Gdmg - cast[key].num
                                      );
                                    else if (objective.air.length) {
                                      objective.air[0].Gdmg = notNegative(
                                        objective.air[0].Gdmg -
                                          objective.air[0].Gdmg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "need":
                                    const groundGdmg =
                                      objective.ground[0]?.Gdmg;
                                    const airGdmg = objective.air[0]?.Gdmg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].Gdmg = notNegative(
                                          objective.ground[0].Gdmg -
                                            cast[key].num
                                        );
                                      else if (objective.ground.length) {
                                        objective.ground[0].Gdmg = notNegative(
                                          objective.ground[0].Gdmg -
                                            objective.ground[0].Gdmg *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                    } else if (
                                      cast[key].num &&
                                      objective.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].Gdmg = notNegative(
                                          objective.air[0].Gdmg - cast[key].num
                                        );
                                      else if (objective.air.length) {
                                        objective.air[0].Gdmg = notNegative(
                                          objective.air[0].Gdmg -
                                            objective.air[0].Gdmg *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                    }
                                    break;
                                }
                                break;
                              case "Admg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.Admg = notNegative(
                                        card.Admg - cast[key].num
                                      );
                                    else {
                                      card.Admg = notNegative(
                                        card.Admg -
                                          card.Admg * (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].Admg = notNegative(
                                        objective.ground[0].Admg - cast[key].num
                                      );
                                    else if (objective.ground.length) {
                                      objective.ground[0].Admg = notNegative(
                                        objective.ground[0].Admg -
                                          defArmy.ground[0].Admg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].Admg = notNegative(
                                        objective.air[0].Admg - cast[key].num
                                      );
                                    else if (objective.air.length) {
                                      objective.air[0].Admg = notNegative(
                                        objective.air[0].Admg -
                                          objective.air[0].Admg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "need":
                                    const groundAdmg =
                                      objective.ground[0]?.Admg;
                                    const airAdmg = objective.air[0]?.Admg;
                                    if (groundAdmg <= airAdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].Admg = notNegative(
                                          objective.ground[0].Admg -
                                            cast[key].num
                                        );
                                      else if (objective.ground.length) {
                                        objective.ground[0].Admg = notNegative(
                                          objective.ground[0].Admg -
                                            objective.ground[0].Admg *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                    } else if (
                                      cast[key].num &&
                                      defAobjectivermy.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].Admg = notNegative(
                                          objective.air[0].Admg - cast[key].num
                                        );
                                      else if (objective.air.length) {
                                        objective.air[0].Admg = notNegative(
                                          objective.air[0].Admg -
                                            objective.air[0].Admg *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                    }
                                    break;
                                }
                                break;
                              case "life":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.life = notNegative(
                                        card.life - cast[key].num
                                      );
                                    else {
                                      card.life = notNegative(
                                        card.life -
                                          card.life * (cast[key].perc / 100)
                                      );
                                    }
                                    if (card.life === 0)
                                      defArmy[card.movement].splice(
                                        cardIndex,
                                        1
                                      );
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].life = notNegative(
                                        objective.ground[0].life - cast[key].num
                                      );
                                    else if (objective.ground.length) {
                                      objective.ground[0].life = notNegative(
                                        objective.ground[0].life -
                                          objective.ground[0].life *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    if (objective.ground[0].life === 0)
                                      objective.ground.shift();
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].life = notNegative(
                                        objective.air[0].life - cast[key].num
                                      );
                                    else if (objective.air.length) {
                                      objective.air[0].life = notNegative(
                                        objective.air[0].life -
                                          objective.air[0].life *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    if (objective.air[0].life === 0)
                                      objective.air.shift();
                                    break;
                                  case "need":
                                    const groundLife =
                                      objective.ground[0]?.life;
                                    const airLife = objective.air[0]?.life;
                                    if (groundLife <= airLife) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].life = notNegative(
                                          objective.ground[0].life -
                                            cast[key].num
                                        );
                                      else if (objective.ground.length) {
                                        objective.ground[0].life = notNegative(
                                          objective.ground[0].life -
                                            objective.ground[0].life *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                      if (objective.ground[0].life === 0)
                                        objective.ground.shift();
                                    } else if (
                                      cast[key].num &&
                                      objective.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].life = notNegative(
                                          objective.air[0].life - cast[key].num
                                        );
                                      else if (objective.air.length) {
                                        objective.air[0].life = notNegative(
                                          objective.air[0].life -
                                            objective.air[0].life *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                      if (objective.air[0].life === 0)
                                        objective.air.shift();
                                    }
                                    break;
                                }
                                break;
                            }
                        }
                        if (cast[key].time === "once") cast[key].off = true;
                      }
                      break;
                  }
                }
              }
          }
        }
      }
    }
    for (let army in atkArmy) {
      for (let cardIndex in army) {
        const card = army[cardIndex];

        for (let ability in card.abilities) {
          switch (true) {
            case ability === "all" || ability === "def":
              for (let cast of ability) {
                for (let key in cast) {
                  const detection =
                    defArmy.ground.find((c) => {
                      c.abilities.all.find((e) => e.detector) ||
                        c.abilities.def.find((e) => e.detector);
                    }) ||
                    defArmy.air.find((c) => {
                      c.abilities.all.find((e) => e.detector) ||
                        c.abilities.def.find((e) => e.detector);
                    });
                  switch (key) {
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
                                  .abilities.atk.find((a) => a.invisible) &&
                                !atkArmy.ground.at(-1).abilities.cloacked) ||
                              ((atkArmy.ground
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) ||
                                atkArmy.ground
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible) ||
                                atkArmy.ground.at(-1).abilities.cloacked) &&
                                detection)
                            ) {
                              defArmy.ground.unshift(atkArmy.ground.pop());
                            } else {
                              const toControl = atkArmy
                                .reverse()
                                .indexOf(
                                  (c) =>
                                    !c.abilities.all.invisible &&
                                    !c.abilities.atk.invisible &&
                                    !c.abilities.cloacked
                                );
                              defArmy.ground.unshift(
                                atkArmy.splice(toControl, 1)
                              );
                            }
                            break;
                          case "air":
                            if (
                              (!atkArmy.air
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) &&
                                !atkArmy.air
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible) &&
                                !atkArmy.air.at(-1).abilities.cloacked) ||
                              ((atkArmy.air
                                .at(-1)
                                .abilities.all.find((a) => a.invisible) ||
                                atkArmy.air
                                  .at(-1)
                                  .abilities.atk.find((a) => a.invisible) ||
                                atkArmy.air.at(-1).abilities.cloacked) &&
                                detection)
                            ) {
                              defArmy.air.unshift(atkArmy.air.pop());
                            }
                            break;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "cloackTeam":
                      if (!cast[key].off) {
                        for (let ally of defArmy.ground) {
                          if (ally.id !== card.id)
                            ally.abilities.cloacked = true;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "modStat":
                      if (!cast[key].off) {
                        const objective =
                          cast[key].team === "enemy" ? atkArmy : defArmy;
                        switch (cast[key].mod) {
                          case "changeMov":
                            switch (cast[key.change]) {
                              case "ground":
                                if (card.movement !== "ground") {
                                  defArmy.ground.unshift(
                                    defArmy.air.splice(cardIndex, 1)
                                  );
                                }
                                break;
                              case "air":
                                if (card.movement !== "air") {
                                  defArmy.air.unshift(
                                    defArmy.ground.splice(cardIndex, 1)
                                  );
                                }
                                break;
                              case "need":
                                const groundLife = defArmy.ground.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                const airLife = defArmy.air.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                if (
                                  groundLife <= airLife &&
                                  card.movement === "air"
                                )
                                  defArmy.air.unshift(
                                    defArmy.ground.splice(cardIndex, 1)
                                  );
                                else if (
                                  groundLife > airLife &&
                                  card.movement === "ground"
                                )
                                  defArmy.ground.unshift(
                                    defArmy.air.splice(cardIndex, 1)
                                  );
                                break;
                            }
                          case "inc":
                            switch (cast[key].stat) {
                              case "Gdmg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.Gdmg += cast[key].num;
                                    else {
                                      card.Gdmg =
                                        card.Gdmg +
                                        card.Gdmg * (cast[key].perc / 100);
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].Gdmg += cast[key].num;
                                    else if (objective.ground.length) {
                                      objective.ground[0].Gdmg =
                                        objective.ground[0].Gdmg +
                                        objective.ground[0].Gdmg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].Gdmg += cast[key].num;
                                    else if (objective.air.length) {
                                      objective.air[0].Gdmg =
                                        objective.air[0].Gdmg +
                                        objective.air[0].Gdmg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const groundGdmg =
                                      objective.ground[0]?.Gdmg;
                                    const airGdmg = objective.air[0]?.Gdmg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].Gdmg +=
                                          cast[key].num;
                                      else if (objective.ground.length) {
                                        objective.ground[0].Gdmg =
                                          objective.ground[0].Gdmg +
                                          objective.ground[0].Gdmg *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      objective.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].Gdmg += cast[key].num;
                                      else if (objective.air.length) {
                                        objective.air[0].Gdmg =
                                          objective.air[0].Gdmg +
                                          objective.air[0].Gdmg *
                                            (cast[key].perc / 100);
                                      }
                                    }
                                    break;
                                }
                                break;
                              case "Admg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.Admg += cast[key].num;
                                    else {
                                      card.Admg =
                                        card.Admg +
                                        card.Admg * (cast[key].perc / 100);
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].Admg += cast[key].num;
                                    else if (objective.ground.length) {
                                      objective.ground[0].Admg =
                                        objective.ground[0].Admg +
                                        defArmy.ground[0].Admg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].Admg += cast[key].num;
                                    else if (objective.air.length) {
                                      objective.air[0].Admg =
                                        objective.air[0].Admg +
                                        objective.air[0].Admg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const groundGdmg =
                                      objective.ground[0]?.Admg;
                                    const airGdmg = objective.air[0]?.Admg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].Admg +=
                                          cast[key].num;
                                      else if (objective.ground.length) {
                                        objective.ground[0].Admg =
                                          objective.ground[0].Admg +
                                          objective.ground[0].Admg *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      defAobjectivermy.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].Admg += cast[key].num;
                                      else if (objective.air.length) {
                                        objective.air[0].Admg =
                                          objective.air[0].Admg +
                                          objective.air[0].Admg *
                                            (cast[key].perc / 100);
                                      }
                                    }
                                    break;
                                }
                                break;
                              case "life":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.life += cast[key].num;
                                    else {
                                      card.life =
                                        card.life +
                                        card.life * (cast[key].perc / 100);
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].life += cast[key].num;
                                    else if (objective.ground.length) {
                                      objective.ground[0].life =
                                        objective.ground[0].life +
                                        objective.ground[0].life *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].life += cast[key].num;
                                    else if (objective.air.length) {
                                      objective.air[0].life =
                                        objective.air[0].life +
                                        objective.air[0].life *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const groundGdmg =
                                      objective.ground[0]?.life;
                                    const airGdmg = objective.air[0]?.life;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].life +=
                                          cast[key].num;
                                      else if (objective.ground.length) {
                                        objective.ground[0].life =
                                          objective.ground[0].life +
                                          objective.ground[0].life *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      objective.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].life += cast[key].num;
                                      else if (objective.air.length) {
                                        objective.air[0].life =
                                          objective.air[0].life +
                                          objective.air[0].life *
                                            (cast[key].perc / 100);
                                      }
                                    }
                                    break;
                                }
                                break;
                            }
                          case "dec":
                            switch (cast[key].stat) {
                              case "Gdmg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.Gdmg = notNegative(
                                        card.Gdmg - cast[key].num
                                      );
                                    else {
                                      card.Gdmg = notNegative(
                                        card.Gdmg -
                                          card.Gdmg * (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].Gdmg = notNegative(
                                        objective.ground[0].Gdmg - cast[key].num
                                      );
                                    else if (objective.ground.length) {
                                      objective.ground[0].Gdmg = notNegative(
                                        objective.ground[0].Gdmg -
                                          objective.ground[0].Gdmg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].Gdmg = notNegative(
                                        objective.air[0].Gdmg - cast[key].num
                                      );
                                    else if (objective.air.length) {
                                      objective.air[0].Gdmg = notNegative(
                                        objective.air[0].Gdmg -
                                          objective.air[0].Gdmg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "need":
                                    const groundGdmg =
                                      objective.ground[0]?.Gdmg;
                                    const airGdmg = objective.air[0]?.Gdmg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].Gdmg = notNegative(
                                          objective.ground[0].Gdmg -
                                            cast[key].num
                                        );
                                      else if (objective.ground.length) {
                                        objective.ground[0].Gdmg = notNegative(
                                          objective.ground[0].Gdmg -
                                            objective.ground[0].Gdmg *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                    } else if (
                                      cast[key].num &&
                                      objective.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].Gdmg = notNegative(
                                          objective.air[0].Gdmg - cast[key].num
                                        );
                                      else if (objective.air.length) {
                                        objective.air[0].Gdmg = notNegative(
                                          objective.air[0].Gdmg -
                                            objective.air[0].Gdmg *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                    }
                                    break;
                                }
                                break;
                              case "Admg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.Admg = notNegative(
                                        card.Admg - cast[key].num
                                      );
                                    else {
                                      card.Admg = notNegative(
                                        card.Admg -
                                          card.Admg * (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].Admg = notNegative(
                                        objective.ground[0].Admg - cast[key].num
                                      );
                                    else if (objective.ground.length) {
                                      objective.ground[0].Admg = notNegative(
                                        objective.ground[0].Admg -
                                          defArmy.ground[0].Admg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].Admg = notNegative(
                                        objective.air[0].Admg - cast[key].num
                                      );
                                    else if (objective.air.length) {
                                      objective.air[0].Admg = notNegative(
                                        objective.air[0].Admg -
                                          objective.air[0].Admg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "need":
                                    const groundAdmg =
                                      objective.ground[0]?.Admg;
                                    const airAdmg = objective.air[0]?.Admg;
                                    if (groundAdmg <= airAdmg) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].Admg = notNegative(
                                          objective.ground[0].Admg -
                                            cast[key].num
                                        );
                                      else if (objective.ground.length) {
                                        objective.ground[0].Admg = notNegative(
                                          objective.ground[0].Admg -
                                            objective.ground[0].Admg *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                    } else if (
                                      cast[key].num &&
                                      defAobjectivermy.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].Admg = notNegative(
                                          objective.air[0].Admg - cast[key].num
                                        );
                                      else if (objective.air.length) {
                                        objective.air[0].Admg = notNegative(
                                          objective.air[0].Admg -
                                            objective.air[0].Admg *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                    }
                                    break;
                                }
                                break;
                              case "life":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (cast[key].num)
                                      card.life = notNegative(
                                        card.life - cast[key].num
                                      );
                                    else {
                                      card.life = notNegative(
                                        card.life -
                                          card.life * (cast[key].perc / 100)
                                      );
                                    }
                                    if (card.life === 0)
                                      defArmy[card.movement].splice(
                                        cardIndex,
                                        1
                                      );
                                    break;
                                  case "ground":
                                    if (
                                      cast[key].num &&
                                      objective.ground.length
                                    )
                                      objective.ground[0].life = notNegative(
                                        objective.ground[0].life - cast[key].num
                                      );
                                    else if (objective.ground.length) {
                                      objective.ground[0].life = notNegative(
                                        objective.ground[0].life -
                                          objective.ground[0].life *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    if (objective.ground[0].life === 0)
                                      objective.ground.shift();
                                    break;
                                  case "air":
                                    if (cast[key].num && objective.air.length)
                                      objective.air[0].life = notNegative(
                                        objective.air[0].life - cast[key].num
                                      );
                                    else if (objective.air.length) {
                                      objective.air[0].life = notNegative(
                                        objective.air[0].life -
                                          objective.air[0].life *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    if (objective.air[0].life === 0)
                                      objective.air.shift();
                                    break;
                                  case "need":
                                    const groundLife =
                                      objective.ground[0]?.life;
                                    const airLife = objective.air[0]?.life;
                                    if (groundLife <= airLife) {
                                      if (
                                        cast[key].num &&
                                        objective.ground.length
                                      )
                                        objective.ground[0].life = notNegative(
                                          objective.ground[0].life -
                                            cast[key].num
                                        );
                                      else if (objective.ground.length) {
                                        objective.ground[0].life = notNegative(
                                          objective.ground[0].life -
                                            objective.ground[0].life *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                      if (objective.ground[0].life === 0)
                                        objective.ground.shift();
                                    } else if (
                                      cast[key].num &&
                                      objective.air.length
                                    ) {
                                      if (cast[key].num)
                                        objective.air[0].life = notNegative(
                                          objective.air[0].life - cast[key].num
                                        );
                                      else if (objective.air.length) {
                                        objective.air[0].life = notNegative(
                                          objective.air[0].life -
                                            objective.air[0].life *
                                              (cast[key].perc / 100)
                                        );
                                      }
                                      if (objective.air[0].life === 0)
                                        objective.air.shift();
                                    }
                                    break;
                                }
                                break;
                            }
                        }
                        if (cast[key].time === "once") cast[key].off = true;
                      }
                      break;
                  }
                }
              }
          }
        }
      }
    }

    if (!defArmy.ground.length && !defArmy.air.length) defArmy.defeated = true;
    if (!atkArmy.ground.length && !atkArmy.air.length) atkArmy.defeated = true;

    if (!defArmy.defeated && !atkArmy.defeated) {
      const largestGroundArmy =
        atkArmy.ground.length >= defArmy.ground.length
          ? atkArmy.ground.length
          : defArmy.ground.length;
      const largestAirArmy =
        atkArmy.air.length >= defArmy.air.length
          ? atkArmy.air.length
          : defArmy.air.length;
      const largestArmy =
        largestAirArmy > largestGroundArmy ? largestAirArmy : largestGroundArmy;

      for (let round = 0; round < largestArmy; round++) {
        const [Gattacker, Aattacker] = [
          atkArmy.ground[round],
          atkArmy.air[round],
        ];
        const [Gdefender, Adefender] = [
          atkArmy.ground[round],
          atkArmy.air[round],
        ];
      }

      if (!defArmy.ground.length && !defArmy.air.length)
        defArmy.defeated = true;
      if (!atkArmy.ground.length && !atkArmy.air.length)
        atkArmy.defeated = true;
    }
  }
}

// case "splashDmg":
//                       if (!cast[key].off) {
//                         let abilityObjective;
//                         switch (cast[key].objective) {
//                           case "ground":
//                             abilityObjective = atkArmy.ground;
//                             break;
//                           case "air":
//                             abilityObjective = atkArmy.air;
//                             break;
//                         }
//                         if (
//                           abilityObjective[0] &&
//                           ((!abilityObjective[0].abilities.all.find(
//                             (e) => e.invisible
//                           ) &&
//                             !abilityObjective[0].abilities.atk.find(
//                               (e) => e.invisible
//                             ) &&
//                             !abilityObjective[0].abilities.cloacked) ||
//                             ((abilityObjective[0].abilities.all.find(
//                               (e) => e.invisible
//                             ) ||
//                               abilityObjective[0].abilities.atk.find(
//                                 (e) => e.invisible
//                               ) ||
//                               abilityObjective[0].abilities.cloacked) &&
//                               detection))
//                         ) {
//                           abilityObjective[0].life =
//                             abilityObjective[0].life - cast[key].num;
//                           if (abilityObjective[1])
//                             abilityObjective[1].life =
//                               abilityObjective[1].life - cast[key].num;
//                           if (abilityObjective[1].life <= 0) {
//                             const front = abilityObjective.shift();
//                             abilityObjective.shift();
//                             if (front.life > 0) abilityObjective.unshift(front);
//                           }

//                           if (cast[key].time === "once") cast[key].off = true;
//                         }
//                       }
//                       break;

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
