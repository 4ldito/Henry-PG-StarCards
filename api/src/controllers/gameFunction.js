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
  const defBase = { life: 5000, attacked: 0 };
  const atkArmy = { ground: [], air: [] },
    defArmy = { ground: [], air: [] };

  while (!defArmy.defeated && !atkArmy.defeated) {
    const newAtk = atk.shift(),
      newDef = def.shift();
    if (newAtk) atkArmy[newAtk.movement].push(newAtk);
    if (newDef) defArmy[newDef.movement].push(newDef);

    // Defender abilities casting
    for (let army in defArmy) {
      for (let cardIndex in defArmy[army]) {
        const card = army[cardIndex];

        for (let ability in card.abilities) {
          switch (true) {
            case (ability === "all" || ability === "def") && card.life > 0:
              for (let cast of card[ability]) {
                for (let key in cast) {
                  const detection =
                    atkArmy.ground.find((c) => {
                      c.abilities.all.find((e) => e.detector && c.life > 0) ||
                        c.abilities.atk.find((e) => e.detector && c.life > 0);
                    }) ||
                    atkArmy.air.find((c) => {
                      c.abilities.all.find((e) => e.detector && c.life > 0) ||
                        c.abilities.atk.find((e) => e.detector && c.life > 0);
                    });
                  switch (key) {
                    case "control":
                      if (!cast[key].off) {
                        switch (cast[key]) {
                          case "ground":
                            let ind = atkArmy.ground.findLastIndex(
                              (c) =>
                                ((!c.abilities.all.invisible &&
                                  !c.abilities.atk.invisible &&
                                  !c.abilities.cloacked) ||
                                  detection) &&
                                c.life > 0
                            );
                            if (ind !== -1) {
                              defArmy.ground.unshift(atkArmy.ground[ind]);
                              atkArmy.ground[ind] = { empty: true };
                            }
                            break;
                          case "air":
                            ind = atkArmy.air.findLastIndex(
                              (c) =>
                                ((!c.abilities.all.invisible &&
                                  !c.abilities.atk.invisible &&
                                  !c.abilities.cloacked) ||
                                  detection) &&
                                c.life > 0
                            );
                            if (ind !== -1) {
                              defArmy.air.unshift(atkArmy.air[ind]);
                              atkArmy.air[ind] = { empty: true };
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
                                    defArmy.air[cardIndex]
                                  );
                                  defArmy.air[cardIndex] = { empty: true };
                                }
                                break;
                              case "air":
                                if (card.movement !== "air") {
                                  defArmy.air.unshift(
                                    defArmy.ground[cardIndex]
                                  );
                                  defArmy.ground[cardIndex] = { empty: true };
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
                                ) {
                                  defArmy.air.unshift(
                                    defArmy.ground[cardIndex]
                                  );
                                  defArmy.ground[cardIndex] = { empty: true };
                                } else if (
                                  groundLife > airLife &&
                                  card.movement === "ground"
                                ) {
                                  defArmy.ground.unshift(
                                    defArmy.air[cardIndex]
                                  );
                                  defArmy.air[cardIndex] = { empty: true };
                                }
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
                                    const GobjectiveIndex =
                                      objective.ground.find((e) => e.life > 0);
                                    if (cast[key].num && GobjectiveIndex !== -1)
                                      objective.ground[GobjectiveIndex].Gdmg +=
                                        cast[key].num;
                                    else if (GobjectiveIndex !== -1) {
                                      objective.ground[GobjectiveIndex].Gdmg =
                                        objective.ground[GobjectiveIndex].Gdmg +
                                        objective.ground[GobjectiveIndex].Gdmg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    const AobjectiveIndex = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    if (cast[key].num && AobjectiveIndex !== -1)
                                      objective.air[AobjectiveIndex].Gdmg +=
                                        cast[key].num;
                                    else if (AobjectiveIndex !== -1) {
                                      objective.air[AobjectiveIndex].Gdmg =
                                        objective.air[AobjectiveIndex].Gdmg +
                                        objective.air[AobjectiveIndex].Gdmg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.ground.find((e) => e.life > 0);
                                    const AobjectiveIndex2 = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    const groundGdmg =
                                      objective.ground[GobjectiveIndex2]?.Gdmg;
                                    const airGdmg =
                                      objective.air[AobjectiveIndex2]?.Gdmg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].Gdmg += cast[key].num;
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].Gdmg =
                                          objective.ground[GobjectiveIndex2]
                                            .Gdmg +
                                          objective.ground[GobjectiveIndex2]
                                            .Gdmg *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (cast[key].num)
                                        objective.air[AobjectiveIndex2].Gdmg +=
                                          cast[key].num;
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.air[AobjectiveIndex2].Gdmg =
                                          objective.air[AobjectiveIndex2].Gdmg +
                                          objective.air[AobjectiveIndex2].Gdmg *
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
                                    const GobjectiveIndex =
                                      objective.ground.find((e) => e.life > 0);
                                    if (cast[key].num && GobjectiveIndex !== -1)
                                      objective.ground[GobjectiveIndex].Admg +=
                                        cast[key].num;
                                    else if (GobjectiveIndex !== -1) {
                                      objective.ground[GobjectiveIndex].Admg =
                                        objective.ground[GobjectiveIndex].Admg +
                                        objective.ground[GobjectiveIndex].Admg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    const AobjectiveIndex =
                                      objective.ground.find((e) => e.life > 0);
                                    if (cast[key].num && AobjectiveIndex !== -1)
                                      objective.air[AobjectiveIndex].Admg +=
                                        cast[key].num;
                                    else if (AobjectiveIndex !== -1) {
                                      objective.air[AobjectiveIndex].Admg =
                                        objective.air[AobjectiveIndex].Admg +
                                        objective.air[AobjectiveIndex].Admg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.ground.find((e) => e.life > 0);
                                    const AobjectiveIndex2 = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    const groundGdmg =
                                      objective.ground[GobjectiveIndex2]?.Admg;
                                    const airGdmg =
                                      objective.air[AobjectiveIndex2]?.Admg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].Admg += cast[key].num;
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].Admg =
                                          objective.ground[GobjectiveIndex2]
                                            .Admg +
                                          objective.ground[GobjectiveIndex2]
                                            .Admg *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (cast[key].num)
                                        objective.air[AobjectiveIndex2].Admg +=
                                          cast[key].num;
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.air[AobjectiveIndex2].Admg =
                                          objective.air[AobjectiveIndex2].Admg +
                                          objective.air[AobjectiveIndex2].Admg *
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
                                    const GobjectiveIndex =
                                      objective.ground.find((e) => e.life > 0);
                                    if (cast[key].num && GobjectiveIndex !== -1)
                                      objective.ground[GobjectiveIndex].life +=
                                        cast[key].num;
                                    else if (GobjectiveIndex !== -1) {
                                      objective.ground[GobjectiveIndex].life =
                                        objective.ground[GobjectiveIndex].life +
                                        objective.ground[GobjectiveIndex].life *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    const AobjectiveIndex = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    if (cast[key].num && AobjectiveIndex !== -1)
                                      objective.air[AobjectiveIndex].life +=
                                        cast[key].num;
                                    else if (AobjectiveIndex !== -1) {
                                      objective.air[AobjectiveIndex].life =
                                        objective.air[AobjectiveIndex].life +
                                        objective.air[AobjectiveIndex].life *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.ground.find((e) => e.life > 0);
                                    const AobjectiveIndex2 = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    const groundGdmg =
                                      objective.ground[GobjectiveIndex2]?.life;
                                    const airGdmg =
                                      objective.air[AobjectiveIndex2]?.life;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].life += cast[key].num;
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].life =
                                          objective.ground[GobjectiveIndex2]
                                            .life +
                                          objective.ground[GobjectiveIndex2]
                                            .life *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (cast[key].num)
                                        objective.air[AobjectiveIndex2].life +=
                                          cast[key].num;
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.air[AobjectiveIndex2].life =
                                          objective.air[AobjectiveIndex2].life +
                                          objective.air[AobjectiveIndex2].life *
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        (c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection) &&
                                        c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        (c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection) &&
                                        c.life > 0
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
                                    break;
                                  case "ground":
                                    const GenemyObjectiveIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                    break;
                                  case "air":
                                    const AenemyObjectiveIndex =
                                      objective.air.indexOf(
                                        (c) =>
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.atk.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        (c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c.abilities.atk.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection) &&
                                        c.life > 0
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
    atkArmy.ground = atkArmy.ground.filter((c) => c.life > 0);
    atkArmy.air = atkArmy.air.filter((c) => c.life > 0);

    // Attacker abilities casting
    for (let army in atkArmy) {
      for (let cardIndex in atkArmy[army]) {
        const card = army[cardIndex];

        for (let ability in card.abilities) {
          switch (true) {
            case (ability === "all" || ability === "atk") && card.life > 0:
              for (let cast of card[ability]) {
                for (let key in cast) {
                  const detection =
                    atkArmy.ground.find((c) => {
                      c.abilities.all.find((e) => e.detector && c.life > 0) ||
                        c.abilities.atk.find((e) => e.detector && c.life > 0);
                    }) ||
                    atkArmy.air.find((c) => {
                      c.abilities.all.find((e) => e.detector && c.life > 0) ||
                        c.abilities.atk.find((e) => e.detector && c.life > 0);
                    });
                  switch (key) {
                    case "control":
                      if (!cast[key].off) {
                        switch (cast[key]) {
                          case "ground":
                            let ind = defArmy.ground.findLastIndex(
                              (c) =>
                                ((!c.abilities.all.invisible &&
                                  !c.abilities.def.invisible &&
                                  !c.abilities.cloacked) ||
                                  detection) &&
                                c.life > 0
                            );
                            if (ind !== -1) {
                              atkArmy.ground.unshift(defArmy.ground[ind]);
                              defArmy.ground[ind] = { empty: true };
                            }
                            break;
                          case "air":
                            ind = defArmy.air.findLastIndex(
                              (c) =>
                                ((!c.abilities.all.invisible &&
                                  !c.abilities.def.invisible &&
                                  !c.abilities.cloacked) ||
                                  detection) &&
                                c.life > 0
                            );
                            if (ind !== -1) {
                              atkArmy.air.unshift(defArmy.air[ind]);
                              defArmy.air[ind] = { empty: true };
                            }
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
                                    atkArmy.air[cardIndex]
                                  );
                                  atkArmy.air[cardIndex] = { empty: true };
                                }
                                break;
                              case "air":
                                if (card.movement !== "air") {
                                  atkArmy.air.unshift(
                                    atkArmy.ground[cardIndex]
                                  );
                                  atkArmy.ground[cardIndex] = { empty: true };
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
                                ) {
                                  atkArmy.air.unshift(
                                    atkArmy.ground[cardIndex]
                                  );
                                  atkArmy.ground[cardIndex] = { empty: true };
                                } else if (
                                  groundLife > airLife &&
                                  card.movement === "ground"
                                ) {
                                  atkArmy.ground.unshift(
                                    atkArmy.air[cardIndex]
                                  );
                                  atkArmy.air[cardIndex] = { empty: true };
                                }
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
                                    const GobjectiveIndex =
                                      objective.ground.find((e) => e.life > 0);
                                    if (cast[key].num && GobjectiveIndex !== -1)
                                      objective.ground[GobjectiveIndex].Gdmg +=
                                        cast[key].num;
                                    else if (GobjectiveIndex !== -1) {
                                      objective.ground[GobjectiveIndex].Gdmg =
                                        objective.ground[GobjectiveIndex].Gdmg +
                                        objective.ground[GobjectiveIndex].Gdmg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    const AobjectiveIndex = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    if (cast[key].num && AobjectiveIndex !== -1)
                                      objective.air[AobjectiveIndex].Gdmg +=
                                        cast[key].num;
                                    else if (AobjectiveIndex !== -1) {
                                      objective.air[AobjectiveIndex].Gdmg =
                                        objective.air[AobjectiveIndex].Gdmg +
                                        objective.air[AobjectiveIndex].Gdmg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.ground.find((e) => e.life > 0);
                                    const AobjectiveIndex2 = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    const groundGdmg =
                                      objective.ground[GobjectiveIndex2]?.Gdmg;
                                    const airGdmg =
                                      objective.air[AobjectiveIndex2]?.Gdmg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].Gdmg += cast[key].num;
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].Gdmg =
                                          objective.ground[GobjectiveIndex2]
                                            .Gdmg +
                                          objective.ground[GobjectiveIndex2]
                                            .Gdmg *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (cast[key].num)
                                        objective.air[AobjectiveIndex2].Gdmg +=
                                          cast[key].num;
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.air[AobjectiveIndex2].Gdmg =
                                          objective.air[AobjectiveIndex2].Gdmg +
                                          objective.air[AobjectiveIndex2].Gdmg *
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
                                    const GobjectiveIndex =
                                      objective.ground.find((e) => e.life > 0);
                                    if (cast[key].num && GobjectiveIndex !== -1)
                                      objective.ground[GobjectiveIndex].Admg +=
                                        cast[key].num;
                                    else if (GobjectiveIndex !== -1) {
                                      objective.ground[GobjectiveIndex].Admg =
                                        objective.ground[GobjectiveIndex].Admg +
                                        objective.ground[GobjectiveIndex].Admg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    const AobjectiveIndex =
                                      objective.ground.find((e) => e.life > 0);
                                    if (cast[key].num && AobjectiveIndex !== -1)
                                      objective.air[AobjectiveIndex].Admg +=
                                        cast[key].num;
                                    else if (AobjectiveIndex !== -1) {
                                      objective.air[AobjectiveIndex].Admg =
                                        objective.air[AobjectiveIndex].Admg +
                                        objective.air[AobjectiveIndex].Admg *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.ground.find((e) => e.life > 0);
                                    const AobjectiveIndex2 = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    const groundGdmg =
                                      objective.ground[GobjectiveIndex2]?.Admg;
                                    const airGdmg =
                                      objective.air[AobjectiveIndex2]?.Admg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].Admg += cast[key].num;
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].Admg =
                                          objective.ground[GobjectiveIndex2]
                                            .Admg +
                                          objective.ground[GobjectiveIndex2]
                                            .Admg *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (cast[key].num)
                                        objective.air[AobjectiveIndex2].Admg +=
                                          cast[key].num;
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.air[AobjectiveIndex2].Admg =
                                          objective.air[AobjectiveIndex2].Admg +
                                          objective.air[AobjectiveIndex2].Admg *
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
                                    const GobjectiveIndex =
                                      objective.ground.find((e) => e.life > 0);
                                    if (cast[key].num && GobjectiveIndex !== -1)
                                      objective.ground[GobjectiveIndex].life +=
                                        cast[key].num;
                                    else if (GobjectiveIndex !== -1) {
                                      objective.ground[GobjectiveIndex].life =
                                        objective.ground[GobjectiveIndex].life +
                                        objective.ground[GobjectiveIndex].life *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "air":
                                    const AobjectiveIndex = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    if (cast[key].num && AobjectiveIndex !== -1)
                                      objective.air[AobjectiveIndex].life +=
                                        cast[key].num;
                                    else if (AobjectiveIndex !== -1) {
                                      objective.air[AobjectiveIndex].life =
                                        objective.air[AobjectiveIndex].life +
                                        objective.air[AobjectiveIndex].life *
                                          (cast[key].perc / 100);
                                    }
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.ground.find((e) => e.life > 0);
                                    const AobjectiveIndex2 = objective.air.find(
                                      (e) => e.life > 0
                                    );
                                    const groundGdmg =
                                      objective.ground[GobjectiveIndex2]?.life;
                                    const airGdmg =
                                      objective.air[AobjectiveIndex2]?.life;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        cast[key].num &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].life += cast[key].num;
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.ground[
                                          GobjectiveIndex2
                                        ].life =
                                          objective.ground[GobjectiveIndex2]
                                            .life +
                                          objective.ground[GobjectiveIndex2]
                                            .life *
                                            (cast[key].perc / 100);
                                      }
                                    } else if (
                                      cast[key].num &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (cast[key].num)
                                        objective.air[AobjectiveIndex2].life +=
                                          cast[key].num;
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.air[AobjectiveIndex2].life =
                                          objective.air[AobjectiveIndex2].life +
                                          objective.air[AobjectiveIndex2].life *
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        (c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c.abilities.def.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection) &&
                                        c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        (c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c.abilities.def.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection) &&
                                        c.life > 0
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
                                    break;
                                  case "ground":
                                    const GenemyObjectiveIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                    break;
                                  case "air":
                                    const AenemyObjectiveIndex =
                                      objective.air.indexOf(
                                        (c) =>
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
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
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.ground.indexOf(
                                        (c) =>
                                          (c.abilities.all.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c.abilities.def.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c.abilities.cloacked ||
                                            detection) &&
                                          c.life > 0
                                      );
                                    const airIndex = objective.air.indexOf(
                                      (c) =>
                                        (c.abilities.all.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c.abilities.def.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c.abilities.cloacked ||
                                          detection) &&
                                        c.life > 0
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
    atkArmy.ground = atkArmy.ground.filter((c) => c.life > 0);
    atkArmy.air = atkArmy.air.filter((c) => c.life > 0);

    if (!defArmy.ground.length && !defArmy.air.length) defArmy.defeated = true;
    if (!atkArmy.ground.length && !atkArmy.air.length) atkArmy.defeated = true;

    // Battle
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
        const attackArray = [atkArmy.ground[round], atkArmy.air[round]];

        if (defBase.life > 0) {
          for (let fighter of defendArray) {
            const detection =
              defArmy.ground.find((c) => {
                c.abilities.all.find((e) => e.detector && c.life > 0) ||
                  c.abilities.def.find((e) => e.detector && c.life > 0);
              }) ||
              defArmy.air.find((c) => {
                c.abilities.all.find((e) => e.detector && c.life > 0) ||
                  c.abilities.def.find((e) => e.detector && c.life > 0);
              });
            if (fighter && fighter.life > 0) {
              for (let ability in fighter.abilities) {
                if (
                  ability !== "atk" &&
                  fighter[ability].find((a) => a.hasOwnProperty("splashDmg"))
                ) {
                  for (let cast of fighter[ability]) {
                    for (let key in cast) {
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
                            (c.abilities.all.find((e) =>
                              e.invisible ? false : true
                            ) ||
                              c.abilities.atk.find((e) =>
                                e.invisible ? false : true
                              ) ||
                              !c.abilities.cloacked ||
                              detection) &&
                            c.life > 0
                        );

                        let cardSplashedIndex = -1;
                        if (cardObjectiveIndex !== -1)
                          for (
                            let i = cardObjectiveIndex + 1;
                            i < abilityObjective.length;
                            i++
                          ) {
                            if (abilityObjective[i].life > 0) {
                              cardSplashedIndex = i;
                              break;
                            }
                          }

                        if (cardObjectiveIndex !== -1) {
                          abilityObjective[cardObjectiveIndex].life =
                            notNegative(
                              abilityObjective[cardObjectiveIndex].life -
                                cast[key].num
                            );
                          if (abilityObjective[cardSplashedIndex])
                            abilityObjective[cardSplashedIndex].life =
                              notNegative(
                                abilityObjective[cardSplashedIndex].life -
                                  cast[key].num
                              );
                        }
                        if (cast[key].time === "once") cast[key].off = true;
                      }
                    }
                  }
                }
              }
              const Genemy = atkArmy.ground.find(
                (c) =>
                  ((!c.abilities.all.invisible &&
                    !c.abilities.atk.invisible &&
                    !c.abilities.cloacked) ||
                    detection) &&
                  c.life > 0
              );
              const Aenemy =
                atkArmy.air.find(
                  (c) =>
                    ((!c.abilities.all.invisible &&
                      !c.abilities.atk.invisible &&
                      !c.abilities.cloacked) ||
                      detection) &&
                    c.life > 0
                ) ||
                atkArmy.ground.find(
                  (c) =>
                    ((!c.abilities.all.invisible &&
                      !c.abilities.def.invisible &&
                      !c.abilities.cloacked) ||
                      detection) &&
                    c.life > 0 &&
                    (c.abilities.all.allMoves || c.abilities.atk.allMoves)
                );
              let fightObjective;
              let attackType;
              switch (true) {
                case fighter.Gdmg === 0 && fighter.Admg === 0:
                  break;
                case fighter.Gdmg === 0:
                  fightObjective = Aenemy;
                  attackType = "Admg";
                  break;
                case fighter.Admg === 0:
                  fightObjective = Genemy;
                  attackType = "Gdmg";
                  break;
                case fighter.Gdmg > 0 && fighter.Admg > 0:
                  switch (true) {
                    case fighter.Gdmg >= fighter.Admg:
                      fightObjective = Genemy
                        ? Genemy
                        : Aenemy
                        ? Aenemy
                        : undefined;
                      break;
                    case fighter.Gdmg < fighter.Admg:
                      fightObjective = Aenemy
                        ? Aenemy
                        : Genemy
                        ? Genemy
                        : undefined;
                      break;
                  }
                  break;
              }
              if (fightObjective) {
                fightObjective.life = notNegative(
                  fightObjective.life - fighter[attackType]
                );
                if (
                  fighter.abilities.find((a) =>
                    a.hasOwnProperty("deathOnAttack")
                  )
                )
                  fighter.life = 0;
              }
            }
          }

          for (let fighter of attackArray) {
            const detection =
              atkArmy.ground.find((c) => {
                c.abilities.all.find((e) => e.detector && c.life > 0) ||
                  c.abilities.atk.find((e) => e.detector && c.life > 0);
              }) ||
              atkArmy.air.find((c) => {
                c.abilities.all.find((e) => e.detector && c.life > 0) ||
                  c.abilities.atk.find((e) => e.detector && c.life > 0);
              });
            if (fighter && fighter.life > 0) {
              for (let ability in fighter.abilities) {
                if (
                  ability !== "def" &&
                  fighter[ability].find((a) => a.hasOwnProperty("splashDmg"))
                ) {
                  for (let cast of fighter[ability]) {
                    for (let key in cast) {
                      if (!cast[key].off) {
                        let abilityObjective;
                        switch (cast[key].objective) {
                          case "ground":
                            abilityObjective = defArmy.ground;
                            break;
                          case "air":
                            abilityObjective = defArmy.air;
                            break;
                        }
                        let cardObjectiveIndex = abilityObjective.indexOf(
                          (c) =>
                            (c.abilities.all.find((e) =>
                              e.invisible ? false : true
                            ) ||
                              c.abilities.def.find((e) =>
                                e.invisible ? false : true
                              ) ||
                              !c.abilities.cloacked ||
                              detection) &&
                            c.life > 0
                        );

                        let cardSplashedIndex = -1;
                        if (cardObjectiveIndex !== -1)
                          for (
                            let i = cardObjectiveIndex + 1;
                            i < abilityObjective.length;
                            i++
                          ) {
                            if (abilityObjective[i].life > 0) {
                              cardSplashedIndex = i;
                              break;
                            }
                          }

                        if (cardObjectiveIndex !== -1) {
                          abilityObjective[cardObjectiveIndex].life =
                            notNegative(
                              abilityObjective[cardObjectiveIndex].life -
                                cast[key].num
                            );
                          if (abilityObjective[cardSplashedIndex])
                            abilityObjective[cardSplashedIndex].life =
                              notNegative(
                                abilityObjective[cardSplashedIndex].life -
                                  cast[key].num
                              );
                        }
                        if (cast[key].time === "once") cast[key].off = true;
                      }
                    }
                  }
                }
              }
              const Genemy = defArmy.ground.find(
                (c) =>
                  ((!c.abilities.all.invisible &&
                    !c.abilities.def.invisible &&
                    !c.abilities.cloacked) ||
                    detection) &&
                  c.life > 0
              );
              const Aenemy =
                defArmy.air.find(
                  (c) =>
                    ((!c.abilities.all.invisible &&
                      !c.abilities.def.invisible &&
                      !c.abilities.cloacked) ||
                      detection) &&
                    c.life > 0
                ) ||
                defArmy.ground.find(
                  (c) =>
                    ((!c.abilities.all.invisible &&
                      !c.abilities.def.invisible &&
                      !c.abilities.cloacked) ||
                      detection) &&
                    c.life > 0 &&
                    (c.abilities.all.allMoves || c.abilities.def.allMoves)
                );
              let fightObjective;
              let attackType;
              switch (true) {
                case fighter.Gdmg === 0 && fighter.Admg === 0:
                  break;
                case fighter.Gdmg === 0:
                  fightObjective = Aenemy || defBase;
                  attackType = "Admg";
                  break;
                case fighter.Admg === 0:
                  fightObjective = Genemy || defBase;
                  attackType = "Gdmg";
                  break;
                case fighter.Gdmg > 0 && fighter.Admg > 0:
                  switch (true) {
                    case fighter.Gdmg >= fighter.Admg:
                      fightObjective = Genemy
                        ? Genemy
                        : Aenemy
                        ? Aenemy
                        : defBase;
                      break;
                    case fighter.Gdmg < fighter.Admg:
                      fightObjective = Aenemy
                        ? Aenemy
                        : Genemy
                        ? Genemy
                        : defBase;
                      break;
                  }
                  break;
              }
              if (fightObjective) {
                fightObjective.life = notNegative(
                  fightObjective.life - fighter[attackType]
                );
                if (fightObjective === defBase && figther[attackType] > 0)
                  defBase.attacked = defBase.attacked + 1;
                if (
                  fighter.abilities.find((a) =>
                    a.hasOwnProperty("deathOnAttack")
                  )
                )
                  fighter.life = 0;
              }
            }
          }
        } else defArmy.defeated = true;
      }

      defArmy.ground = defArmy.ground.filter((c) => c.life > 0);
      defArmy.air = defArmy.air.filter((c) => c.life > 0);
      atkArmy.ground = atkArmy.ground.filter((c) => c.life > 0);
      atkArmy.air = atkArmy.air.filter((c) => c.life > 0);

      if (!defArmy.ground.length && !defArmy.air.length)
        defArmy.defeated = true;
      if (!atkArmy.ground.length && !atkArmy.air.length)
        atkArmy.defeated = true;
    }
  }

  if (defArmy.defeated === true) return roundsInfo;
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

  const battle1 = battle(atk1, def2);
  const battle2 = battle(atk2, def1);

  return {};
}

module.exports = gameFunction;
