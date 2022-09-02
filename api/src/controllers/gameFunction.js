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
      for (let cardIndex in defArmy[army]) {
        const card = army[cardIndex];

        for (let ability in card.abilities) {
          switch (true) {
            case ability === "all" || ability === "def":
              for (let cast of card[ability]) {
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
                            defArmy.ground.unshift(
                              atkArmy.ground.splice(
                                atkArmy.ground.findLastIndex(
                                  (c) =>
                                    (!c.abilities.all.invisible &&
                                      !c.abilities.atk.invisible &&
                                      !c.abilities.cloacked) ||
                                    detection
                                ),
                                1
                              )
                            );
                            break;
                          case "air":
                            defArmy.air.unshift(
                              atkArmy.air.splice(
                                atkArmy.air.findLastIndex(
                                  (c) =>
                                    (!c.abilities.all.invisible &&
                                      !c.abilities.atk.invisible &&
                                      !c.abilities.cloacked) ||
                                    detection
                                ),
                                1
                              )
                            );
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
                                    const GenemyObjectiveIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].Gdmg = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .Gdmg - cast[key].num
                                      );
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].Gdmg = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .Gdmg -
                                          objective.ground[GenemyObjectiveIndex]
                                            .Gdmg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "air":
                                    const AenemyObjectiveIndex =
                                      objective.air.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.air[AenemyObjectiveIndex].Gdmg =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .Gdmg - cast[key].num
                                        );
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.air[AenemyObjectiveIndex].Gdmg =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .Gdmg -
                                            objective.air[AenemyObjectiveIndex]
                                              .Gdmg *
                                              (cast[key].perc / 100)
                                        );
                                    }
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        c.abilities.atk.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        !c.abilities.cloacked ||
                                        detection
                                    );
                                    const groundGdmg =
                                      objective.ground[groundIndex]?.Gdmg;
                                    const airGdmg =
                                      objective.air[airIndex]?.Gdmg;

                                    if (groundGdmg <= airGdmg) {
                                      if (cast[key].num && groundIndex !== -1)
                                        objective.ground[groundIndex].Gdmg =
                                          notNegative(
                                            objective.ground[groundIndex].Gdmg -
                                              cast[key].num
                                          );
                                      else if (groundIndex !== -1) {
                                        objective.ground[groundIndex].Gdmg =
                                          notNegative(
                                            objective.ground[groundIndex].Gdmg -
                                              objective.ground[groundIndex]
                                                .Gdmg *
                                                (cast[key].perc / 100)
                                          );
                                      }
                                    } else {
                                      if (cast[key].num && airIndex !== -1)
                                        objective.air[airIndex].Gdmg =
                                          notNegative(
                                            objective.air[airIndex].Gdmg -
                                              cast[key].num
                                          );
                                      else if (airIndex !== -1) {
                                        objective.air[airIndex].Gdmg =
                                          notNegative(
                                            objective.air[airIndex].Gdmg -
                                              objective.air[airIndex].Gdmg *
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
                                    const GenemyObjectiveIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].Admg = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .Admg - cast[key].num
                                      );
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].Admg = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .Admg -
                                          objective.ground[GenemyObjectiveIndex]
                                            .Admg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "air":
                                    const AenemyObjectiveIndex =
                                      objective.air.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.air[AenemyObjectiveIndex].Admg =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .Admg - cast[key].num
                                        );
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.air[AenemyObjectiveIndex].Admg =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .Admg -
                                            objective.air[AenemyObjectiveIndex]
                                              .Admg *
                                              (cast[key].perc / 100)
                                        );
                                    }
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        c.abilities.atk.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        !c.abilities.cloacked ||
                                        detection
                                    );
                                    const groundGdmg =
                                      objective.ground[groundIndex]?.Admg;
                                    const airGdmg =
                                      objective.air[airIndex]?.Admg;

                                    if (groundGdmg <= airGdmg) {
                                      if (cast[key].num && groundIndex !== -1)
                                        objective.ground[groundIndex].Admg =
                                          notNegative(
                                            objective.ground[groundIndex].Admg -
                                              cast[key].num
                                          );
                                      else if (groundIndex !== -1) {
                                        objective.ground[groundIndex].Admg =
                                          notNegative(
                                            objective.ground[groundIndex].Admg -
                                              objective.ground[groundIndex]
                                                .Admg *
                                                (cast[key].perc / 100)
                                          );
                                      }
                                    } else {
                                      if (cast[key].num && airIndex !== -1)
                                        objective.air[airIndex].Admg =
                                          notNegative(
                                            objective.air[airIndex].Admg -
                                              cast[key].num
                                          );
                                      else if (airIndex !== -1) {
                                        objective.air[airIndex].Admg =
                                          notNegative(
                                            objective.air[airIndex].Admg -
                                              objective.air[airIndex].Admg *
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
                                    const GenemyObjectiveIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].life = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .life - cast[key].num
                                      );
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].life = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .life -
                                          objective.ground[GenemyObjectiveIndex]
                                            .life *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    if (
                                      objective.ground[GenemyObjectiveIndex]
                                        .life === 0
                                    )
                                      objective.ground.splice(
                                        GenemyObjectiveIndex,
                                        1
                                      );
                                    break;
                                  case "air":
                                    const AenemyObjectiveIndex =
                                      objective.air.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.air[AenemyObjectiveIndex].life =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .life - cast[key].num
                                        );
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.air[AenemyObjectiveIndex].life =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .life -
                                            objective.air[AenemyObjectiveIndex]
                                              .life *
                                              (cast[key].perc / 100)
                                        );
                                    }
                                    if (
                                      objective.air[AenemyObjectiveIndex]
                                        .life === 0
                                    )
                                      objective.air.splice(
                                        AenemyObjectiveIndex,
                                        1
                                      );
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        c.abilities.atk.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        !c.abilities.cloacked ||
                                        detection
                                    );
                                    const groundLife =
                                      objective.ground[groundIndex]?.life;
                                    const airLife =
                                      objective.air[airIndex]?.life;
                                    if (groundLife <= airLife) {
                                      if (cast[key].num && groundIndex !== -1)
                                        objective.ground[groundIndex].life =
                                          notNegative(
                                            objective.ground[groundIndex].life -
                                              cast[key].num
                                          );
                                      else if (groundIndex !== -1) {
                                        objective.ground[groundIndex].life =
                                          notNegative(
                                            objective.ground[groundIndex].life -
                                              objective.ground[groundIndex]
                                                .life *
                                                (cast[key].perc / 100)
                                          );
                                      }
                                      if (
                                        objective.ground[groundIndex].life === 0
                                      )
                                        objective.ground.splice(groundIndex, 1);
                                    } else if (
                                      cast[key].num &&
                                      airIndex !== -1
                                    ) {
                                      if (cast[key].num)
                                        objective.air[airIndex].life =
                                          notNegative(
                                            objective.air[airIndex].life -
                                              cast[key].num
                                          );
                                      else if (airIndex !== -1) {
                                        objective.air[airIndex].life =
                                          notNegative(
                                            objective.air[airIndex].life -
                                              objective.air[airIndex].life *
                                                (cast[key].perc / 100)
                                          );
                                      }
                                      if (objective.air[airIndex].life === 0)
                                        objective.air.splice(airIndex, 1);
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
    defArmy.ground = defArmy.ground.filter((c) => c.life > 0);
    defArmy.air = defArmy.air.filter((c) => c.life > 0);

    for (let army in atkArmy) {
      for (let cardIndex in atkArmy[army]) {
        const card = army[cardIndex];

        for (let ability in card.abilities) {
          switch (true) {
            case ability === "all" || ability === "atk":
              for (let cast of card[ability]) {
                for (let key in cast) {
                  const detection =
                    atkArmy.ground.find((c) => {
                      c.abilities.all.find((e) => e.detector) ||
                        c.abilities.atk.find((e) => e.detector);
                    }) ||
                    atkArmy.air.find((c) => {
                      c.abilities.all.find((e) => e.detector) ||
                        c.abilities.atk.find((e) => e.detector);
                    });
                  switch (key) {
                    case "control":
                      if (!cast[key].off) {
                        switch (cast[key]) {
                          case "ground":
                            atkArmy.ground.unshift(
                              defArmy.ground.splice(
                                defArmy.ground.findLastIndex(
                                  (c) =>
                                    (!c.abilities.all.invisible &&
                                      !c.abilities.atk.invisible &&
                                      !c.abilities.cloacked) ||
                                    detection
                                ),
                                1
                              )
                            );
                            break;
                          case "air":
                            atkArmy.air.unshift(
                              defArmy.air.splice(
                                defArmy.air.findLastIndex(
                                  (c) =>
                                    (!c.abilities.all.invisible &&
                                      !c.abilities.atk.invisible &&
                                      !c.abilities.cloacked) ||
                                    detection
                                ),
                                1
                              )
                            );
                            break;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "cloackTeam":
                      if (!cast[key].off) {
                        for (let ally of atkArmy.ground) {
                          if (ally.id !== card.id)
                            ally.abilities.cloacked = true;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "modStat":
                      if (!cast[key].off) {
                        const objective =
                          cast[key].team === "enemy" ? defArmy : atkArmy;
                        switch (cast[key].mod) {
                          case "changeMov":
                            switch (cast[key.change]) {
                              case "ground":
                                if (card.movement !== "ground") {
                                  atkArmy.ground.unshift(
                                    atkArmy.air.splice(cardIndex, 1)
                                  );
                                }
                                break;
                              case "air":
                                if (card.movement !== "air") {
                                  atkArmy.air.unshift(
                                    atkArmy.ground.splice(cardIndex, 1)
                                  );
                                }
                                break;
                              case "need":
                                const groundLife = atkArmy.ground.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                const airLife = atkArmy.air.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                if (
                                  groundLife <= airLife &&
                                  card.movement === "air"
                                )
                                  atkArmy.air.unshift(
                                    atkArmy.ground.splice(cardIndex, 1)
                                  );
                                else if (
                                  groundLife > airLife &&
                                  card.movement === "ground"
                                )
                                  atkArmy.ground.unshift(
                                    atkArmy.air.splice(cardIndex, 1)
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
                                    const GenemyObjectiveIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].Gdmg = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .Gdmg - cast[key].num
                                      );
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].Gdmg = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .Gdmg -
                                          objective.ground[GenemyObjectiveIndex]
                                            .Gdmg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "air":
                                    const AenemyObjectiveIndex =
                                      objective.air.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.air[AenemyObjectiveIndex].Gdmg =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .Gdmg - cast[key].num
                                        );
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.air[AenemyObjectiveIndex].Gdmg =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .Gdmg -
                                            objective.air[AenemyObjectiveIndex]
                                              .Gdmg *
                                              (cast[key].perc / 100)
                                        );
                                    }
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        c.abilities.atk.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        !c.abilities.cloacked ||
                                        detection
                                    );
                                    const groundGdmg =
                                      objective.ground[groundIndex]?.Gdmg;
                                    const airGdmg =
                                      objective.air[airIndex]?.Gdmg;

                                    if (groundGdmg <= airGdmg) {
                                      if (cast[key].num && groundIndex !== -1)
                                        objective.ground[groundIndex].Gdmg =
                                          notNegative(
                                            objective.ground[groundIndex].Gdmg -
                                              cast[key].num
                                          );
                                      else if (groundIndex !== -1) {
                                        objective.ground[groundIndex].Gdmg =
                                          notNegative(
                                            objective.ground[groundIndex].Gdmg -
                                              objective.ground[groundIndex]
                                                .Gdmg *
                                                (cast[key].perc / 100)
                                          );
                                      }
                                    } else {
                                      if (cast[key].num && airIndex !== -1)
                                        objective.air[airIndex].Gdmg =
                                          notNegative(
                                            objective.air[airIndex].Gdmg -
                                              cast[key].num
                                          );
                                      else if (airIndex !== -1) {
                                        objective.air[airIndex].Gdmg =
                                          notNegative(
                                            objective.air[airIndex].Gdmg -
                                              objective.air[airIndex].Gdmg *
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
                                    const GenemyObjectiveIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].Admg = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .Admg - cast[key].num
                                      );
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].Admg = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .Admg -
                                          objective.ground[GenemyObjectiveIndex]
                                            .Admg *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    break;
                                  case "air":
                                    const AenemyObjectiveIndex =
                                      objective.air.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.air[AenemyObjectiveIndex].Admg =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .Admg - cast[key].num
                                        );
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.air[AenemyObjectiveIndex].Admg =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .Admg -
                                            objective.air[AenemyObjectiveIndex]
                                              .Admg *
                                              (cast[key].perc / 100)
                                        );
                                    }
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        c.abilities.atk.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        !c.abilities.cloacked ||
                                        detection
                                    );
                                    const groundGdmg =
                                      objective.ground[groundIndex]?.Admg;
                                    const airGdmg =
                                      objective.air[airIndex]?.Admg;

                                    if (groundGdmg <= airGdmg) {
                                      if (cast[key].num && groundIndex !== -1)
                                        objective.ground[groundIndex].Admg =
                                          notNegative(
                                            objective.ground[groundIndex].Admg -
                                              cast[key].num
                                          );
                                      else if (groundIndex !== -1) {
                                        objective.ground[groundIndex].Admg =
                                          notNegative(
                                            objective.ground[groundIndex].Admg -
                                              objective.ground[groundIndex]
                                                .Admg *
                                                (cast[key].perc / 100)
                                          );
                                      }
                                    } else {
                                      if (cast[key].num && airIndex !== -1)
                                        objective.air[airIndex].Admg =
                                          notNegative(
                                            objective.air[airIndex].Admg -
                                              cast[key].num
                                          );
                                      else if (airIndex !== -1) {
                                        objective.air[airIndex].Admg =
                                          notNegative(
                                            objective.air[airIndex].Admg -
                                              objective.air[airIndex].Admg *
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
                                      atkArmy[card.movement].splice(
                                        cardIndex,
                                        1
                                      );
                                    break;
                                  case "ground":
                                    const GenemyObjectiveIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].life = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .life - cast[key].num
                                      );
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.ground[
                                        GenemyObjectiveIndex
                                      ].life = notNegative(
                                        objective.ground[GenemyObjectiveIndex]
                                          .life -
                                          objective.ground[GenemyObjectiveIndex]
                                            .life *
                                            (cast[key].perc / 100)
                                      );
                                    }
                                    if (
                                      objective.ground[GenemyObjectiveIndex]
                                        .life === 0
                                    )
                                      objective.ground.splice(
                                        GenemyObjectiveIndex,
                                        1
                                      );
                                    break;
                                  case "air":
                                    const AenemyObjectiveIndex =
                                      objective.air.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    if (
                                      cast[key].num &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.air[AenemyObjectiveIndex].life =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .life - cast[key].num
                                        );
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.air[AenemyObjectiveIndex].life =
                                        notNegative(
                                          objective.air[AenemyObjectiveIndex]
                                            .life -
                                            objective.air[AenemyObjectiveIndex]
                                              .life *
                                              (cast[key].perc / 100)
                                        );
                                    }
                                    if (
                                      objective.air[AenemyObjectiveIndex]
                                        .life === 0
                                    )
                                      objective.air.splice(
                                        AenemyObjectiveIndex,
                                        1
                                      );
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        c.abilities.atk.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                        !c.abilities.cloacked ||
                                        detection
                                    );
                                    const groundLife =
                                      objective.ground[groundIndex]?.life;
                                    const airLife =
                                      objective.air[airIndex]?.life;
                                    if (groundLife <= airLife) {
                                      if (cast[key].num && groundIndex !== -1)
                                        objective.ground[groundIndex].life =
                                          notNegative(
                                            objective.ground[groundIndex].life -
                                              cast[key].num
                                          );
                                      else if (groundIndex !== -1) {
                                        objective.ground[groundIndex].life =
                                          notNegative(
                                            objective.ground[groundIndex].life -
                                              objective.ground[groundIndex]
                                                .life *
                                                (cast[key].perc / 100)
                                          );
                                      }
                                      if (
                                        objective.ground[groundIndex].life === 0
                                      )
                                        objective.ground.splice(groundIndex, 1);
                                    } else if (
                                      cast[key].num &&
                                      airIndex !== -1
                                    ) {
                                      if (cast[key].num)
                                        objective.air[airIndex].life =
                                          notNegative(
                                            objective.air[airIndex].life -
                                              cast[key].num
                                          );
                                      else if (airIndex !== -1) {
                                        objective.air[airIndex].life =
                                          notNegative(
                                            objective.air[airIndex].life -
                                              objective.air[airIndex].life *
                                                (cast[key].perc / 100)
                                          );
                                      }
                                      if (objective.air[airIndex].life === 0)
                                        objective.air.splice(airIndex, 1);
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
    atkArmy.ground = atkArmy.ground.filter((c) => c.life > 0);
    atkArmy.air = atkArmy.air.filter((c) => c.life > 0);

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
        const defendArray = [atkArmy.ground[round], atkArmy.air[round]];
        const [Gdefender, Adefender] = defendArray;

        for (let fighter of defendArray) {
          if (fighter && fighter.life > 0) {
            for (let ability in fighter.abilities) {
              if (
                ability !== "atk" &&
                fighter[ability].find((a) => a.hasOwnProperty("splashDmg"))
              ) {
                for (let cast of fighter[ability]) {
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
                    if (!cast[key].off) {
                      let abilityObjective;
                      switch (cast[key].objective) {
                        case "ground":
                          abilityObjective = atkArmy.ground;

                          break;
                        case "air":
                          abilityObjective = atkArmy.air;
                          break;
                      }
                      let cardObjectiveIndex = abilityObjective.indexOf(
                        (c) =>
                          c.abilities.all.find((e) =>
                            e.invisible ? false : true
                          ) ||
                          c.abilities.atk.find((e) =>
                            e.invisible ? false : true
                          ) ||
                          !c.abilities.cloacked ||
                          detection
                      );

                      if (cardObjectiveIndex !== -1) {
                        abilityObjective[cardObjectiveIndex].life = notNegative(
                          abilityObjective[cardObjectiveIndex].life -
                            cast[key].num
                        );
                        if (abilityObjective[cardObjectiveIndex + 1])
                          abilityObjective[cardObjectiveIndex + 1].life =
                            notNegative(
                              abilityObjective[cardObjectiveIndex + 1].life -
                                cast[key].num
                            );
                      }
                      if (cast[key].time === "once") cast[key].off = true;
                    }
                  }
                }
              }
            }
          }
        }

        const attackArray = [atkArmy.ground[round], atkArmy.air[round]];
        const [Gattacker, Aattacker] = attackArray;
      }

      if (!defArmy.ground.length && !defArmy.air.length)
        defArmy.defeated = true;
      if (!atkArmy.ground.length && !atkArmy.air.length)
        atkArmy.defeated = true;
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
