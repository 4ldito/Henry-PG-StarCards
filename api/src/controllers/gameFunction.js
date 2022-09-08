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
  return Number(num) < 0 ? 0 : Math.round(num * 10) / 10;
}

function battle(atk, def) {
  const roundsInfo = {
    GroundDefArmy: [],
    GroundAtkArmy: [],
    AirDefArmy: [],
    AirAtkArmy: [],
    Base: [],
    log: [],
  };

  const defBase = { life: 1000, attacked: 0 };
  const atkArmy = { Ground: [], Flying: [] },
    defArmy = { Ground: [], Flying: [] };

  // for (let asd = 0; asd < 30; asd++) {
  while (defBase.life > 0 && !atkArmy.defeated) {
    const newAtk = { ...atk?.shift() },
      newDef = { ...def?.shift() };
    if (newAtk.movement) atkArmy[newAtk.movement].push(newAtk);
    if (newDef.movement) defArmy[newDef.movement].push(newDef);

    roundsInfo.GroundDefArmy.push(defArmy.Ground.map((u) => ({ ...u })));
    roundsInfo.GroundAtkArmy.push(atkArmy.Ground.map((u) => ({ ...u })));
    roundsInfo.AirDefArmy.push(defArmy.Flying.map((u) => ({ ...u })));
    roundsInfo.AirAtkArmy.push(atkArmy.Flying.map((u) => ({ ...u })));
    roundsInfo.Base.push(defBase.life);

    // Defender abilities casting
    for (let army in defArmy) {
      for (let cardIndex in defArmy[army]) {
        const card = defArmy[army][cardIndex];

        for (let ability in card.abilities) {
          switch (true) {
            case (ability === "all" || ability === "def") && card.life > 0:
              for (let cast of card.abilities[ability]) {
                for (let key in cast) {
                  const detection =
                    atkArmy.Ground.find(
                      (c) =>
                        c?.abilities?.all?.find(
                          (e) => e.detector && c?.life > 0
                        ) ||
                        c?.abilities?.atk?.find(
                          (e) => e.detector && c?.life > 0
                        )
                    ) ||
                    atkArmy.Flying.find(
                      (c) =>
                        c?.abilities?.all?.find(
                          (e) => e.detector && c?.life > 0
                        ) ||
                        c?.abilities?.atk?.find(
                          (e) => e.detector && c?.life > 0
                        )
                    );
                  switch (key) {
                    case "control":
                      if (!cast[key].off) {
                        switch (cast[key]) {
                          case "Ground":
                            var ind = atkArmy.Ground.reverse().findIndex(
                              (c) =>
                                ((!c?.abilities?.all?.invisible &&
                                  !c?.abilities?.atk?.invisible &&
                                  !c?.abilities?.cloacked) ||
                                  detection) &&
                                c?.life > 0
                            );
                            ind =
                              ind !== -1
                                ? atkArmy.Ground.length - 1 - ind
                                : ind;
                            if (ind !== -1) {
                              defArmy.Ground.unshift(atkArmy.Ground[ind]);
                              atkArmy.Ground[ind] = { empty: true };
                            }
                            // // roundsInfo.log.push("defArmy casts");
                            break;
                          case "Flying":
                            var ind = atkArmy.Flying.reverse().findIndex(
                              (c) =>
                                ((!c?.abilities?.all?.invisible &&
                                  !c?.abilities?.atk?.invisible &&
                                  !c?.abilities?.cloacked) ||
                                  detection) &&
                                c?.life > 0
                            );
                            ind =
                              ind !== -1
                                ? atkArmy.Flying.length - 1 - ind
                                : ind;
                            if (ind !== -1) {
                              defArmy.Flying.unshift(atkArmy.Flying[ind]);
                              atkArmy.Flying[ind] = { empty: true };
                            }
                            // // roundsInfo.log.push("defArmy casts");
                            break;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "cloackTeam":
                      if (!cast[key].off) {
                        for (let ally of defArmy.Ground) {
                          if (ally.id !== card.id)
                            ally.abilities.cloacked = true;
                        }
                        cast[key].off = true;
                      }
                      // // roundsInfo.log.push("defArmy casts");
                      break;
                    case "modStat":
                      if (!cast[key].off) {
                        const objective =
                          cast[key].team === "enemy" ? atkArmy : defArmy;
                        switch (cast[key].mod) {
                          case "changeMov":
                            switch (cast[key.change]) {
                              case "Ground":
                                if (card.movement !== "Ground") {
                                  defArmy.Ground.unshift(
                                    defArmy.Flying[cardIndex]
                                  );
                                  defArmy.Flying[cardIndex] = { empty: true };
                                }
                                // // roundsInfo.log.push("defArmy casts");
                                break;
                              case "Flying":
                                if (card.movement !== "Flying") {
                                  defArmy.Flying.unshift(
                                    defArmy.Ground[cardIndex]
                                  );
                                  defArmy.Ground[cardIndex] = { empty: true };
                                }
                                // // roundsInfo.log.push("defArmy casts");
                                break;
                              case "need":
                                const groundLife = defArmy.Ground.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                const airLife = defArmy.Flying.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                if (
                                  groundLife <= airLife &&
                                  card.movement === "Flying"
                                ) {
                                  defArmy.Flying.unshift(
                                    defArmy.Ground[cardIndex]
                                  );
                                  defArmy.Ground[cardIndex] = { empty: true };
                                } else if (
                                  groundLife > airLife &&
                                  card.movement === "Ground"
                                ) {
                                  defArmy.Ground.unshift(
                                    defArmy.Flying[cardIndex]
                                  );
                                  defArmy.Flying[cardIndex] = { empty: true };
                                }
                                // // roundsInfo.log.push("defArmy casts");
                                break;
                            }
                            break;
                          case "inc":
                            switch (cast[key].stat) {
                              case "Gdmg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.Gdmg += Number(cast[key].num);
                                    else {
                                      card.Gdmg =
                                        Math.round(
                                          (card.Gdmg +
                                            card.Gdmg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Ground":
                                    const GobjectiveIndex =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GobjectiveIndex !== -1
                                    )
                                      objective.Ground[GobjectiveIndex].Gdmg +=
                                        Number(cast[key].num);
                                    else if (GobjectiveIndex !== -1) {
                                      objective.Ground[GobjectiveIndex].Gdmg =
                                        Math.round(
                                          (objective.Ground[GobjectiveIndex]
                                            .Gdmg +
                                            objective.Ground[GobjectiveIndex]
                                              .Gdmg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Flying":
                                    const AobjectiveIndex =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex !== -1
                                    )
                                      objective.Flying[AobjectiveIndex].Gdmg +=
                                        Number(cast[key].num);
                                    else if (AobjectiveIndex !== -1) {
                                      objective.Flying[AobjectiveIndex].Gdmg =
                                        Math.round(
                                          (objective.Flying[AobjectiveIndex]
                                            .Gdmg +
                                            objective.Flying[AobjectiveIndex]
                                              .Gdmg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const AobjectiveIndex2 =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const groundGdmg =
                                      objective.Ground[GobjectiveIndex2]?.Gdmg;
                                    const airGdmg =
                                      objective.Flying[AobjectiveIndex2]?.Gdmg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].Gdmg += Number(cast[key].num);
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].Gdmg =
                                          Math.round(
                                            (objective.Ground[GobjectiveIndex2]
                                              .Gdmg +
                                              objective.Ground[GobjectiveIndex2]
                                                .Gdmg *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    } else if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (Number(cast[key].num))
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].Gdmg += Number(cast[key].num);
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].Gdmg =
                                          Math.round(
                                            (objective.Flying[AobjectiveIndex2]
                                              .Gdmg +
                                              objective.Flying[AobjectiveIndex2]
                                                .Gdmg *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    }
                                    // // roundsInfo.log.push("defArmy casts");
                                    break;
                                }
                                break;
                              case "Admg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.Admg += Number(cast[key].num);
                                    else {
                                      card.Admg =
                                        Math.round(
                                          (card.Admg +
                                            card.Admg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Ground":
                                    const GobjectiveIndex =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GobjectiveIndex !== -1
                                    )
                                      objective.Ground[GobjectiveIndex].Admg +=
                                        Number(cast[key].num);
                                    else if (GobjectiveIndex !== -1) {
                                      objective.Ground[GobjectiveIndex].Admg =
                                        Math.round(
                                          (objective.Ground[GobjectiveIndex]
                                            .Admg +
                                            objective.Ground[GobjectiveIndex]
                                              .Admg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Flying":
                                    const AobjectiveIndex =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex !== -1
                                    )
                                      objective.Flying[AobjectiveIndex].Admg +=
                                        Number(cast[key].num);
                                    else if (AobjectiveIndex !== -1) {
                                      objective.Flying[AobjectiveIndex].Admg =
                                        Math.round(
                                          (objective.Flying[AobjectiveIndex]
                                            .Admg +
                                            objective.Flying[AobjectiveIndex]
                                              .Admg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const AobjectiveIndex2 =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const groundGdmg =
                                      objective.Ground[GobjectiveIndex2]?.Admg;
                                    const airGdmg =
                                      objective.Flying[AobjectiveIndex2]?.Admg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].Admg += Number(cast[key].num);
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].Admg =
                                          Math.round(
                                            (objective.Ground[GobjectiveIndex2]
                                              .Admg +
                                              objective.Ground[GobjectiveIndex2]
                                                .Admg *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    } else if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (Number(cast[key].num))
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].Admg += Number(cast[key].num);
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].Admg =
                                          Math.round(
                                            (objective.Flying[AobjectiveIndex2]
                                              .Admg +
                                              objective.Flying[AobjectiveIndex2]
                                                .Admg *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                }
                                break;
                              case "life":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.life += Number(cast[key].num);
                                    else {
                                      card.life =
                                        Math.round(
                                          (card.life +
                                            card.life *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Ground":
                                    const GobjectiveIndex =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GobjectiveIndex !== -1
                                    )
                                      objective.Ground[GobjectiveIndex].life +=
                                        Number(cast[key].num);
                                    else if (GobjectiveIndex !== -1) {
                                      objective.Ground[GobjectiveIndex].life =
                                        Math.round(
                                          (objective.Ground[GobjectiveIndex]
                                            .life +
                                            objective.Ground[GobjectiveIndex]
                                              .life *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Flying":
                                    const AobjectiveIndex =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex !== -1
                                    )
                                      objective.Flying[AobjectiveIndex].life +=
                                        Number(cast[key].num);
                                    else if (AobjectiveIndex !== -1) {
                                      objective.Flying[AobjectiveIndex].life =
                                        Math.round(
                                          (objective.Flying[AobjectiveIndex]
                                            .life +
                                            objective.Flying[AobjectiveIndex]
                                              .life *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const AobjectiveIndex2 =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const groundGdmg =
                                      objective.Ground[GobjectiveIndex2]?.life;
                                    const airGdmg =
                                      objective.Flying[AobjectiveIndex2]?.life;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].life += Number(cast[key].num);
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].life =
                                          Math.round(
                                            (objective.Ground[GobjectiveIndex2]
                                              .life +
                                              objective.Ground[GobjectiveIndex2]
                                                .life *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    } else if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (Number(cast[key].num))
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].life += Number(cast[key].num);
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].life =
                                          Math.round(
                                            (objective.Flying[AobjectiveIndex2]
                                              .life +
                                              objective.Flying[AobjectiveIndex2]
                                                .life *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                }
                                break;
                            }
                            break;
                          case "dec":
                            switch (cast[key].stat) {
                              case "Gdmg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.Gdmg =
                                        Math.round(
                                          notNegative(
                                            card.Gdmg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else {
                                      card.Gdmg =
                                        Math.round(
                                          notNegative(
                                            card.Gdmg -
                                              card.Gdmg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Ground":
                                    const GenemyObjectiveIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].Gdmg =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].Gdmg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].Gdmg =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].Gdmg -
                                              objective.Ground[
                                                GenemyObjectiveIndex
                                              ].Gdmg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Flying":
                                    const AenemyObjectiveIndex =
                                      objective.Flying.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].Gdmg =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].Gdmg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].Gdmg =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].Gdmg -
                                              objective.Flying[
                                                AenemyObjectiveIndex
                                              ].Gdmg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    const airIndex = objective.Flying.findIndex(
                                      (c) =>
                                        (c?.abilities?.all?.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c?.abilities?.atk?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c?.abilities?.cloacked ||
                                          detection) &&
                                        c?.life > 0
                                    );
                                    const groundGdmg =
                                      objective.Ground[groundIndex]?.Gdmg;
                                    const airGdmg =
                                      objective.Flying[airIndex]?.Gdmg;

                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        groundIndex !== -1
                                      )
                                        objective.Ground[groundIndex].Gdmg =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .Gdmg - Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (groundIndex !== -1) {
                                        objective.Ground[groundIndex].Gdmg =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .Gdmg -
                                                objective.Ground[groundIndex]
                                                  .Gdmg *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    } else {
                                      if (
                                        Number(cast[key].num) &&
                                        airIndex !== -1
                                      )
                                        objective.Flying[airIndex].Gdmg =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].Gdmg -
                                                Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (airIndex !== -1) {
                                        objective.Flying[airIndex].Gdmg =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].Gdmg -
                                                objective.Flying[airIndex]
                                                  .Gdmg *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                }
                                break;
                              case "Admg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.Admg =
                                        Math.round(
                                          notNegative(
                                            card.Admg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else {
                                      card.Admg =
                                        Math.round(
                                          notNegative(
                                            card.Admg -
                                              card.Admg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Ground":
                                    const GenemyObjectiveIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].Admg =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].Admg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].Admg =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].Admg -
                                              objective.Ground[
                                                GenemyObjectiveIndex
                                              ].Admg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Flying":
                                    const AenemyObjectiveIndex =
                                      objective.Flying.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].Admg =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].Admg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].Admg =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].Admg -
                                              objective.Flying[
                                                AenemyObjectiveIndex
                                              ].Admg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    const airIndex = objective.Flying.findIndex(
                                      (c) =>
                                        (c?.abilities?.all?.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c?.abilities?.atk?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c?.abilities?.cloacked ||
                                          detection) &&
                                        c?.life > 0
                                    );
                                    const groundGdmg =
                                      objective.Ground[groundIndex]?.Admg;
                                    const airGdmg =
                                      objective.Flying[airIndex]?.Admg;

                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        groundIndex !== -1
                                      )
                                        objective.Ground[groundIndex].Admg =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .Admg - Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (groundIndex !== -1) {
                                        objective.Ground[groundIndex].Admg =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .Admg -
                                                objective.Ground[groundIndex]
                                                  .Admg *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    } else {
                                      if (
                                        Number(cast[key].num) &&
                                        airIndex !== -1
                                      )
                                        objective.Flying[airIndex].Admg =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].Admg -
                                                Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (airIndex !== -1) {
                                        objective.Flying[airIndex].Admg =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].Admg -
                                                objective.Flying[airIndex]
                                                  .Admg *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                }
                                break;
                              case "life":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.life =
                                        Math.round(
                                          notNegative(
                                            card.life - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else {
                                      card.life =
                                        Math.round(
                                          notNegative(
                                            card.life -
                                              card.life *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Ground":
                                    const GenemyObjectiveIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].life =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].life - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].life =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].life -
                                              objective.Ground[
                                                GenemyObjectiveIndex
                                              ].life *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "Flying":
                                    const AenemyObjectiveIndex =
                                      objective.Flying.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].life =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].life - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].life =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].life -
                                              objective.Flying[
                                                AenemyObjectiveIndex
                                              ].life *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.atk?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    const airIndex = objective.Flying.findIndex(
                                      (c) =>
                                        (c?.abilities?.all?.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c?.abilities?.atk?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c?.abilities?.cloacked ||
                                          detection) &&
                                        c?.life > 0
                                    );
                                    const groundLife =
                                      objective.Ground[groundIndex]?.life;
                                    const airLife =
                                      objective.Flying[airIndex]?.life;
                                    if (groundLife <= airLife) {
                                      if (
                                        Number(cast[key].num) &&
                                        groundIndex !== -1
                                      )
                                        objective.Ground[groundIndex].life =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .life - Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (groundIndex !== -1) {
                                        objective.Ground[groundIndex].life =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .life -
                                                objective.Ground[groundIndex]
                                                  .life *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    } else if (
                                      Number(cast[key].num) &&
                                      airIndex !== -1
                                    ) {
                                      if (Number(cast[key].num))
                                        objective.Flying[airIndex].life =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].life -
                                                Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (airIndex !== -1) {
                                        objective.Flying[airIndex].life =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].life -
                                                objective.Flying[airIndex]
                                                  .life *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("defArmy casts");
                                    break;
                                }
                                break;
                            }
                            break;
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
    // defArmy.Ground = defArmy.Ground.filter((c) => c?.life > 0);
    // defArmy.Flying = defArmy.Flying.filter((c) => c?.life > 0);
    // atkArmy.Ground = atkArmy.Ground.filter((c) => c?.life > 0);
    // atkArmy.Flying = atkArmy.Flying.filter((c) => c?.life > 0);

    // roundsInfo.GroundDefArmy = [...roundsInfo.GroundDefArmy, defArmy.Ground];
    // roundsInfo.GroundAtkArmy = [...roundsInfo.GroundAtkArmy, atkArmy.Ground];
    // roundsInfo.AirDefArmy = [...roundsInfo.AirDefArmy, defArmy.Flying];
    // roundsInfo.AirAtkArmy = [...roundsInfo.AirAtkArmy, atkArmy.Flying];

    // Attacker abilities casting
    for (let army in atkArmy) {
      for (let cardIndex in atkArmy[army]) {
        const card = atkArmy[army][cardIndex];

        for (let ability in card.abilities) {
          switch (true) {
            case (ability === "all" || ability === "atk") && card.life > 0:
              for (let cast of card.abilities[ability]) {
                for (let key in cast) {
                  const detection =
                    atkArmy.Ground.find(
                      (c) =>
                        c?.abilities?.all?.find(
                          (e) => e.detector && c?.life > 0
                        ) ||
                        c?.abilities?.atk?.find(
                          (e) => e.detector && c?.life > 0
                        )
                    ) ||
                    atkArmy.Flying.find(
                      (c) =>
                        c?.abilities?.all?.find(
                          (e) => e.detector && c?.life > 0
                        ) ||
                        c?.abilities?.atk?.find(
                          (e) => e.detector && c?.life > 0
                        )
                    );
                  switch (key) {
                    case "control":
                      if (!cast[key].off) {
                        switch (cast[key]) {
                          case "Ground":
                            var ind = defArmy.Ground.reverse().findIndex(
                              (c) =>
                                ((!c?.abilities?.all?.invisible &&
                                  !c?.abilities?.def?.invisible &&
                                  !c?.abilities?.cloacked) ||
                                  detection) &&
                                c?.life > 0
                            );
                            ind =
                              ind !== -1
                                ? atkArmy.Ground.length - 1 - ind
                                : ind;
                            if (ind !== -1) {
                              atkArmy.Ground.unshift(defArmy.Ground[ind]);
                              defArmy.Ground[ind] = { empty: true };
                            }
                            // roundsInfo.log.push("atkArmy casts");
                            break;
                          case "Flying":
                            var ind = defArmy.Flying.reverse().findIndex(
                              (c) =>
                                ((!c?.abilities?.all?.invisible &&
                                  !c?.abilities?.def?.invisible &&
                                  !c?.abilities?.cloacked) ||
                                  detection) &&
                                c?.life > 0
                            );
                            ind =
                              ind !== -1
                                ? atkArmy.Flying.length - 1 - ind
                                : ind;
                            if (ind !== -1) {
                              atkArmy.Flying.unshift(defArmy.Flying[ind]);
                              defArmy.Flying[ind] = { empty: true };
                            }
                            // roundsInfo.log.push("atkArmy casts");
                            break;
                        }
                        cast[key].off = true;
                      }
                      break;
                    case "cloackTeam":
                      if (!cast[key].off) {
                        for (let ally of atkArmy.Ground) {
                          if (ally.id !== card.id)
                            ally.abilities.cloacked = true;
                        }
                        cast[key].off = true;
                      }
                      // roundsInfo.log.push("atkArmy casts");
                      break;
                    case "modStat":
                      if (!cast[key].off) {
                        const objective =
                          cast[key].team === "enemy" ? defArmy : atkArmy;

                        switch (cast[key].mod) {
                          case "changeMov":
                            switch (cast[key.change]) {
                              case "Ground":
                                if (card.movement !== "Ground") {
                                  atkArmy.Ground.unshift(
                                    atkArmy.Flying[cardIndex]
                                  );
                                  atkArmy.Flying[cardIndex] = { empty: true };
                                }
                                // roundsInfo.log.push("atkArmy casts");
                                break;
                              case "Flying":
                                if (card.movement !== "Flying") {
                                  atkArmy.Flying.unshift(
                                    atkArmy.Ground[cardIndex]
                                  );
                                  atkArmy.Ground[cardIndex] = { empty: true };
                                }
                                // roundsInfo.log.push("atkArmy casts");
                                break;
                              case "need":
                                const groundLife = atkArmy.Ground.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                const airLife = atkArmy.Flying.reduce(
                                  (acc, ele) => {
                                    return acc + ele.life;
                                  },
                                  0
                                );
                                if (
                                  groundLife <= airLife &&
                                  card.movement === "Flying"
                                ) {
                                  atkArmy.Flying.unshift(
                                    atkArmy.Ground[cardIndex]
                                  );
                                  atkArmy.Ground[cardIndex] = { empty: true };
                                } else if (
                                  groundLife > airLife &&
                                  card.movement === "Ground"
                                ) {
                                  atkArmy.Ground.unshift(
                                    atkArmy.Flying[cardIndex]
                                  );
                                  atkArmy.Flying[cardIndex] = { empty: true };
                                }
                                // roundsInfo.log.push("atkArmy casts");
                                break;
                            }
                            break;
                          case "inc":
                            switch (cast[key].stat) {
                              case "Gdmg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.Gdmg += Number(cast[key].num);
                                    else {
                                      card.Gdmg =
                                        Math.round(
                                          (card.Gdmg +
                                            card.Gdmg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Ground":
                                    const GobjectiveIndex =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GobjectiveIndex !== -1
                                    )
                                      objective.Ground[GobjectiveIndex].Gdmg +=
                                        Number(cast[key].num);
                                    else if (GobjectiveIndex !== -1) {
                                      objective.Ground[GobjectiveIndex].Gdmg =
                                        Math.round(
                                          (objective.Ground[GobjectiveIndex]
                                            .Gdmg +
                                            objective.Ground[GobjectiveIndex]
                                              .Gdmg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Flying":
                                    const AobjectiveIndex =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex !== -1
                                    )
                                      objective.Flying[AobjectiveIndex].Gdmg +=
                                        Number(cast[key].num);
                                    else if (AobjectiveIndex !== -1) {
                                      objective.Flying[AobjectiveIndex].Gdmg =
                                        Math.round(
                                          (objective.Flying[AobjectiveIndex]
                                            .Gdmg +
                                            objective.Flying[AobjectiveIndex]
                                              .Gdmg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const AobjectiveIndex2 =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const groundGdmg =
                                      objective.Ground[GobjectiveIndex2]?.Gdmg;
                                    const airGdmg =
                                      objective.Flying[AobjectiveIndex2]?.Gdmg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].Gdmg += Number(cast[key].num);
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].Gdmg =
                                          Math.round(
                                            (objective.Ground[GobjectiveIndex2]
                                              .Gdmg +
                                              objective.Ground[GobjectiveIndex2]
                                                .Gdmg *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    } else if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (Number(cast[key].num))
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].Gdmg += Number(cast[key].num);
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].Gdmg =
                                          Math.round(
                                            (objective.Flying[AobjectiveIndex2]
                                              .Gdmg +
                                              objective.Flying[AobjectiveIndex2]
                                                .Gdmg *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                }
                                break;
                              case "Admg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.Admg += Number(cast[key].num);
                                    else {
                                      card.Admg =
                                        Math.round(
                                          (card.Admg +
                                            card.Admg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Ground":
                                    const GobjectiveIndex =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GobjectiveIndex !== -1
                                    )
                                      objective.Ground[GobjectiveIndex].Admg +=
                                        Number(cast[key].num);
                                    else if (GobjectiveIndex !== -1) {
                                      objective.Ground[GobjectiveIndex].Admg =
                                        Math.round(
                                          (objective.Ground[GobjectiveIndex]
                                            .Admg +
                                            objective.Ground[GobjectiveIndex]
                                              .Admg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Flying":
                                    const AobjectiveIndex =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex !== -1
                                    )
                                      objective.Flying[AobjectiveIndex].Admg +=
                                        Number(cast[key].num);
                                    else if (AobjectiveIndex !== -1) {
                                      objective.Flying[AobjectiveIndex].Admg =
                                        Math.round(
                                          (objective.Flying[AobjectiveIndex]
                                            .Admg +
                                            objective.Flying[AobjectiveIndex]
                                              .Admg *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const AobjectiveIndex2 =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const groundGdmg =
                                      objective.Ground[GobjectiveIndex2]?.Admg;
                                    const airGdmg =
                                      objective.Flying[AobjectiveIndex2]?.Admg;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].Admg += Number(cast[key].num);
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].Admg =
                                          Math.round(
                                            (objective.Ground[GobjectiveIndex2]
                                              .Admg +
                                              objective.Ground[GobjectiveIndex2]
                                                .Admg *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    } else if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (Number(cast[key].num))
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].Admg += Number(cast[key].num);
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].Admg =
                                          Math.round(
                                            (objective.Flying[AobjectiveIndex2]
                                              .Admg +
                                              objective.Flying[AobjectiveIndex2]
                                                .Admg *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                }
                                break;
                              case "life":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.life += Number(cast[key].num);
                                    else {
                                      card.life =
                                        Math.round(
                                          (card.life +
                                            card.life *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Ground":
                                    const GobjectiveIndex =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GobjectiveIndex !== -1
                                    )
                                      objective.Ground[GobjectiveIndex].life +=
                                        Number(cast[key].num);
                                    else if (GobjectiveIndex !== -1) {
                                      objective.Ground[GobjectiveIndex].life =
                                        Math.round(
                                          (objective.Ground[GobjectiveIndex]
                                            .life +
                                            objective.Ground[GobjectiveIndex]
                                              .life *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Flying":
                                    const AobjectiveIndex =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex !== -1
                                    )
                                      objective.Flying[AobjectiveIndex].life +=
                                        Number(cast[key].num);
                                    else if (AobjectiveIndex !== -1) {
                                      objective.Flying[AobjectiveIndex].life =
                                        Math.round(
                                          (objective.Flying[AobjectiveIndex]
                                            .life +
                                            objective.Flying[AobjectiveIndex]
                                              .life *
                                              (Number(cast[key].perc) / 100)) *
                                            10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "need":
                                    const GobjectiveIndex2 =
                                      objective.Ground.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const AobjectiveIndex2 =
                                      objective.Flying.findIndex(
                                        (e) => e.life > 0
                                      );
                                    const groundGdmg =
                                      objective.Ground[GobjectiveIndex2]?.life;
                                    const airGdmg =
                                      objective.Flying[AobjectiveIndex2]?.life;
                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        GobjectiveIndex2 !== -1
                                      )
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].life += Number(cast[key].num);
                                      else if (GobjectiveIndex2 !== -1) {
                                        objective.Ground[
                                          GobjectiveIndex2
                                        ].life =
                                          Math.round(
                                            (objective.Ground[GobjectiveIndex2]
                                              .life +
                                              objective.Ground[GobjectiveIndex2]
                                                .life *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    } else if (
                                      Number(cast[key].num) &&
                                      AobjectiveIndex2 !== -1
                                    ) {
                                      if (Number(cast[key].num))
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].life += Number(cast[key].num);
                                      else if (AobjectiveIndex2 !== -1) {
                                        objective.Flying[
                                          AobjectiveIndex2
                                        ].life =
                                          Math.round(
                                            (objective.Flying[AobjectiveIndex2]
                                              .life +
                                              objective.Flying[AobjectiveIndex2]
                                                .life *
                                                (Number(cast[key].perc) /
                                                  100)) *
                                              10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                }
                                break;
                            }
                            break;
                          case "dec":
                            switch (cast[key].stat) {
                              case "Gdmg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.Gdmg =
                                        Math.round(
                                          notNegative(
                                            card.Gdmg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else {
                                      card.Gdmg =
                                        Math.round(
                                          notNegative(
                                            card.Gdmg -
                                              card.Gdmg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Ground":
                                    const GenemyObjectiveIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].Gdmg =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].Gdmg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].Gdmg =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].Gdmg -
                                              objective.Ground[
                                                GenemyObjectiveIndex
                                              ].Gdmg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Flying":
                                    const AenemyObjectiveIndex =
                                      objective.Flying.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].Gdmg =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].Gdmg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].Gdmg =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].Gdmg -
                                              objective.Flying[
                                                AenemyObjectiveIndex
                                              ].Gdmg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    const airIndex = objective.Flying.findIndex(
                                      (c) =>
                                        (c?.abilities?.all?.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c?.abilities?.def?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c?.abilities?.cloacked ||
                                          detection) &&
                                        c?.life > 0
                                    );
                                    const groundGdmg =
                                      objective.Ground[groundIndex]?.Gdmg;
                                    const airGdmg =
                                      objective.Flying[airIndex]?.Gdmg;

                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        groundIndex !== -1
                                      )
                                        objective.Ground[groundIndex].Gdmg =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .Gdmg - Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (groundIndex !== -1) {
                                        objective.Ground[groundIndex].Gdmg =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .Gdmg -
                                                objective.Ground[groundIndex]
                                                  .Gdmg *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    } else {
                                      if (
                                        Number(cast[key].num) &&
                                        airIndex !== -1
                                      )
                                        objective.Flying[airIndex].Gdmg =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].Gdmg -
                                                Number(cast[key].num) * 10
                                            ) / 10
                                          );
                                      else if (airIndex !== -1) {
                                        objective.Flying[airIndex].Gdmg =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].Gdmg -
                                                objective.Flying[airIndex]
                                                  .Gdmg *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                }
                                break;
                              case "Admg":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.Admg =
                                        Math.round(
                                          notNegative(
                                            card.Admg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else {
                                      card.Admg =
                                        Math.round(
                                          notNegative(
                                            card.Admg -
                                              card.Admg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Ground":
                                    const GenemyObjectiveIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].Admg =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].Admg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].Admg =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].Admg -
                                              objective.Ground[
                                                GenemyObjectiveIndex
                                              ].Admg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Flying":
                                    const AenemyObjectiveIndex =
                                      objective.Flying.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].Admg =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].Admg - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].Admg =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].Admg -
                                              objective.Flying[
                                                AenemyObjectiveIndex
                                              ].Admg *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    const airIndex = objective.Flying.findIndex(
                                      (c) =>
                                        (c?.abilities?.all?.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c?.abilities?.def?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c?.abilities?.cloacked ||
                                          detection) &&
                                        c?.life > 0
                                    );
                                    const groundGdmg =
                                      objective.Ground[groundIndex]?.Admg;
                                    const airGdmg =
                                      objective.Flying[airIndex]?.Admg;

                                    if (groundGdmg <= airGdmg) {
                                      if (
                                        Number(cast[key].num) &&
                                        groundIndex !== -1
                                      )
                                        objective.Ground[groundIndex].Admg =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .Admg - Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (groundIndex !== -1) {
                                        objective.Ground[groundIndex].Admg =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .Admg -
                                                objective.Ground[groundIndex]
                                                  .Admg *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    } else {
                                      if (
                                        Number(cast[key].num) &&
                                        airIndex !== -1
                                      )
                                        objective.Flying[airIndex].Admg =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].Admg -
                                                Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (airIndex !== -1) {
                                        objective.Flying[airIndex].Admg =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].Admg -
                                                objective.Flying[airIndex]
                                                  .Admg *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                }
                                break;
                              case "life":
                                switch (cast[key].objective) {
                                  case "self":
                                    if (Number(cast[key].num))
                                      card.life =
                                        Math.round(
                                          notNegative(
                                            card.life - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else {
                                      card.life =
                                        Math.round(
                                          notNegative(
                                            card.life -
                                              card.life *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Ground":
                                    const GenemyObjectiveIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      GenemyObjectiveIndex !== -1
                                    )
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].life =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].life - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (GenemyObjectiveIndex !== -1) {
                                      objective.Ground[
                                        GenemyObjectiveIndex
                                      ].life =
                                        Math.round(
                                          notNegative(
                                            objective.Ground[
                                              GenemyObjectiveIndex
                                            ].life -
                                              objective.Ground[
                                                GenemyObjectiveIndex
                                              ].life *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "Flying":
                                    const AenemyObjectiveIndex =
                                      objective.Flying.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    if (
                                      Number(cast[key].num) &&
                                      AenemyObjectiveIndex !== -1
                                    )
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].life =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].life - Number(cast[key].num)
                                          ) * 10
                                        ) / 10;
                                    else if (AenemyObjectiveIndex !== -1) {
                                      objective.Flying[
                                        AenemyObjectiveIndex
                                      ].life =
                                        Math.round(
                                          notNegative(
                                            objective.Flying[
                                              AenemyObjectiveIndex
                                            ].life -
                                              objective.Flying[
                                                AenemyObjectiveIndex
                                              ].life *
                                                (Number(cast[key].perc) / 100)
                                          ) * 10
                                        ) / 10;
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                  case "need":
                                    const groundIndex =
                                      objective.Ground.findIndex(
                                        (c) =>
                                          (c?.abilities?.all?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                            c?.abilities?.def?.find((e) =>
                                              e.invisible ? false : true
                                            ) ||
                                            !c?.abilities?.cloacked ||
                                            detection) &&
                                          c?.life > 0
                                      );
                                    const airIndex = objective.Flying.findIndex(
                                      (c) =>
                                        (c?.abilities?.all?.find((e) =>
                                          e.invisible ? false : true
                                        ) ||
                                          c?.abilities?.def?.find((e) =>
                                            e.invisible ? false : true
                                          ) ||
                                          !c?.abilities?.cloacked ||
                                          detection) &&
                                        c?.life > 0
                                    );
                                    const groundLife =
                                      objective.Ground[groundIndex]?.life;
                                    const airLife =
                                      objective.Flying[airIndex]?.life;
                                    if (groundLife <= airLife) {
                                      if (
                                        Number(cast[key].num) &&
                                        groundIndex !== -1
                                      )
                                        objective.Ground[groundIndex].life =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .life - Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (groundIndex !== -1) {
                                        objective.Ground[groundIndex].life =
                                          Math.round(
                                            notNegative(
                                              objective.Ground[groundIndex]
                                                .life -
                                                objective.Ground[groundIndex]
                                                  .life *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    } else if (
                                      Number(cast[key].num) &&
                                      airIndex !== -1
                                    ) {
                                      if (Number(cast[key].num))
                                        objective.Flying[airIndex].life =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].life -
                                                Number(cast[key].num)
                                            ) * 10
                                          ) / 10;
                                      else if (airIndex !== -1) {
                                        objective.Flying[airIndex].life =
                                          Math.round(
                                            notNegative(
                                              objective.Flying[airIndex].life -
                                                objective.Flying[airIndex]
                                                  .life *
                                                  (Number(cast[key].perc) / 100)
                                            ) * 10
                                          ) / 10;
                                      }
                                    }
                                    // roundsInfo.log.push("atkArmy casts");
                                    break;
                                }
                                break;
                            }
                            break;
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
    // defArmy.Ground = defArmy.Ground.filter((c) => c?.life > 0);
    // defArmy.Flying = defArmy.Flying.filter((c) => c?.life > 0);
    // atkArmy.Ground = atkArmy.Ground.filter((c) => c?.life > 0);
    // atkArmy.Flying = atkArmy.Flying.filter((c) => c?.life > 0);

    // roundsInfo.GroundDefArmy = [...roundsInfo.GroundDefArmy, defArmy.Ground];
    // roundsInfo.GroundAtkArmy = [...roundsInfo.GroundAtkArmy, atkArmy.Ground];
    // roundsInfo.AirDefArmy = [...roundsInfo.AirDefArmy, defArmy.Flying];
    // roundsInfo.AirAtkArmy = [...roundsInfo.AirAtkArmy, atkArmy.Flying];

    if (!defArmy.Ground.length && !defArmy.Flying.length)
      defArmy.defeated = true;
    if (!atkArmy.Ground.length && !atkArmy.Flying.length)
      atkArmy.defeated = true;

    // Battle
    // if (!defArmy.defeated && !atkArmy.defeated) {
    const largestGroundArmy =
      atkArmy.Ground.length >= defArmy.Ground.length
        ? atkArmy.Ground.length
        : defArmy.Ground.length;
    const largestAirArmy =
      atkArmy.Flying.length >= defArmy.Flying.length
        ? atkArmy.Flying.length
        : defArmy.Flying.length;
    const largestArmy =
      largestAirArmy > largestGroundArmy ? largestAirArmy : largestGroundArmy;

    for (let round = 0; round < largestArmy; round++) {
      const defendArray = [defArmy.Ground[round], defArmy.Flying[round]];
      const attackArray = [atkArmy.Ground[round], atkArmy.Flying[round]];

      if (defBase.life > 0) {
        for (let fighter of defendArray) {
          const detection =
            defArmy.Ground.find(
              (c) =>
                c?.abilities?.all?.find((e) => e.detector && c?.life > 0) ||
                c?.abilities?.def?.find((e) => e.detector && c?.life > 0)
            ) ||
            defArmy.Flying.find(
              (c) =>
                c?.abilities?.all?.find((e) => e.detector && c?.life > 0) ||
                c?.abilities?.def?.find((e) => e.detector && c?.life > 0)
            );
          if (fighter && fighter.life > 0) {
            for (let ability in fighter.abilities) {
              if (
                ability !== "atk" &&
                ability !== "cloacked" &&
                Array.isArray(fighter.abilities[ability]) &&
                fighter.abilities[ability] &&
                fighter.abilities[ability].find((a) =>
                  a.hasOwnProperty("splashDmg")
                )
              ) {
                for (let cast of ability !== "cloacked" &&
                  Array.isArray(fighter.abilities[ability]) &&
                  fighter.abilities[ability] &&
                  fighter.abilities[ability]) {
                  for (let key in cast) {
                    if (!cast[key].off && cast[key] === "splashDmg") {
                      let abilityObjective;
                      switch (cast[key].objective) {
                        case "Ground":
                          abilityObjective = atkArmy.Ground;
                          break;
                        case "Flying":
                          abilityObjective = atkArmy.Flying;
                          break;
                      }

                      let cardObjectiveIndex = abilityObjective.findIndex(
                        (c) =>
                          (c?.abilities?.all?.find((e) =>
                            e.invisible ? false : true
                          ) ||
                            c?.abilities?.atk?.find((e) =>
                              e.invisible ? false : true
                            ) ||
                            !c?.abilities?.cloacked ||
                            detection) &&
                          c?.life > 0
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
                          Math.round(
                            notNegative(
                              abilityObjective[cardObjectiveIndex].life -
                                Number(cast[key].num)
                            ) * 10
                          ) / 10;
                        if (abilityObjective[cardSplashedIndex])
                          abilityObjective[cardSplashedIndex].life =
                            Math.round(
                              notNegative(
                                abilityObjective[cardSplashedIndex].life -
                                  Number(cast[key].num)
                              ) * 10
                            ) / 10;
                      }
                      if (cast[key].time === "once") cast[key].off = true;
                    }
                  }
                }
              }
            }
            const Genemy = atkArmy.Ground.find(
              (c) =>
                ((!c?.abilities?.all?.invisible &&
                  !c?.abilities?.atk?.invisible &&
                  !c?.abilities?.cloacked) ||
                  detection) &&
                c?.life > 0
            );
            const Aenemy =
              atkArmy.Flying.find(
                (c) =>
                  ((!c?.abilities?.all?.invisible &&
                    !c?.abilities?.atk?.invisible &&
                    !c?.abilities?.cloacked) ||
                    detection) &&
                  c?.life > 0
              ) ||
              atkArmy.Ground.find(
                (c) =>
                  ((!c?.abilities?.all?.invisible &&
                    !c?.abilities?.def?.invisible &&
                    !c?.abilities?.cloacked) ||
                    detection) &&
                  c?.life > 0 &&
                  (c?.abilities?.all?.allMoves || c?.abilities?.atk?.allMoves)
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
                    attackType = Genemy ? "Gdmg" : Aenemy ? "Admg" : undefined;
                    break;
                  case fighter.Gdmg < fighter.Admg:
                    fightObjective = Aenemy
                      ? Aenemy
                      : Genemy
                      ? Genemy
                      : undefined;
                    attackType = Aenemy ? "Admg" : Genemy ? "Gdmg" : undefined;
                    break;
                }
                break;
            }
            if (fightObjective) {
              fightObjective.life =
                Math.round(
                  notNegative(fightObjective.life - fighter[attackType]) * 10
                ) / 10;
              // roundsInfo.log.push("defArmy attacks");
              if (
                fighter.abilities.all?.find((a) =>
                  a.hasOwnProperty("deathOnAttack")
                ) ||
                fighter.abilities.def?.find((a) =>
                  a.hasOwnProperty("deathOnAttack")
                )
              )
                fighter.life = 0;
            }
          }
        }

        for (let fighter of attackArray) {
          const detection =
            atkArmy.Ground.find(
              (c) =>
                c?.abilities?.all?.find((e) => e.detector && c?.life > 0) ||
                c?.abilities?.atk?.find((e) => e.detector && c?.life > 0)
            ) ||
            atkArmy.Flying.find(
              (c) =>
                c?.abilities?.all?.find((e) => e.detector && c?.life > 0) ||
                c?.abilities?.atk?.find((e) => e.detector && c?.life > 0)
            );

          if (fighter && fighter.life > 0) {
            for (let ability in fighter.abilities) {
              if (
                ability !== "def" &&
                ability !== "cloacked" &&
                Array.isArray(fighter.abilities[ability]) &&
                fighter.abilities[ability] &&
                fighter.abilities[ability].find((a) =>
                  a.hasOwnProperty("splashDmg")
                )
              ) {
                for (let cast of ability !== "cloacked" &&
                  Array.isArray(fighter.abilities[ability]) &&
                  fighter.abilities[ability] &&
                  fighter.abilities[ability]) {
                  for (let key in cast) {
                    if (!cast[key].off && cast[key] === "splashDmg") {
                      let abilityObjective;
                      switch (cast[key].objective) {
                        case "Ground":
                          abilityObjective = defArmy.Ground;
                          break;
                        case "Flying":
                          abilityObjective = defArmy.Flying;
                          break;
                      }
                      let cardObjectiveIndex = abilityObjective.findIndex(
                        (c) =>
                          (c?.abilities?.all?.find((e) =>
                            e.invisible ? false : true
                          ) ||
                            c?.abilities?.def?.find((e) =>
                              e.invisible ? false : true
                            ) ||
                            !c?.abilities?.cloacked ||
                            detection) &&
                          c?.life > 0
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
                          Math.round(
                            notNegative(
                              abilityObjective[cardObjectiveIndex].life -
                                Number(cast[key].num)
                            ) * 10
                          ) / 10;

                        if (abilityObjective[cardSplashedIndex])
                          abilityObjective[cardSplashedIndex].life =
                            Math.round(
                              notNegative(
                                abilityObjective[cardSplashedIndex].life -
                                  Number(cast[key].num)
                              ) * 10
                            ) / 10;
                      }
                      if (cast[key].time === "once") cast[key].off = true;
                    }
                  }
                }
              }
            }
            const Genemy = defArmy.Ground.find(
              (c) =>
                ((!c?.abilities?.all?.invisible &&
                  !c?.abilities?.def?.invisible &&
                  !c?.abilities?.cloacked) ||
                  detection) &&
                c?.life > 0
            );
            const Aenemy =
              defArmy.Flying.find(
                (c) =>
                  ((!c?.abilities?.all?.invisible &&
                    !c?.abilities?.def?.invisible &&
                    !c?.abilities?.cloacked) ||
                    detection) &&
                  c?.life > 0
              ) ||
              defArmy.Ground.find(
                (c) =>
                  ((!c?.abilities?.all?.invisible &&
                    !c?.abilities?.def?.invisible &&
                    !c?.abilities?.cloacked) ||
                    detection) &&
                  c?.life > 0 &&
                  (c?.abilities?.all?.allMoves || c?.abilities?.def?.allMoves)
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
                    attackType = Genemy ? "Gdmg" : Aenemy ? "Admg" : "Gdmg";
                    break;
                  case fighter.Gdmg < fighter.Admg:
                    fightObjective = Aenemy
                      ? Aenemy
                      : Genemy
                      ? Genemy
                      : defBase;
                    attackType = Aenemy ? "Admg" : Genemy ? "Gdmg" : "Admg";
                    break;
                }
                break;
            }
            if (fightObjective) {
              fightObjective.life =
                Math.round(
                  notNegative(fightObjective.life - fighter[attackType]) * 10
                ) / 10;
              // roundsInfo.log.push("atkArmy attacks");
              if (fightObjective === defBase && fighter[attackType] > 0)
                defBase.attacked = defBase.attacked + 1;
              if (
                fighter.abilities.all?.find((a) =>
                  a.hasOwnProperty("deathOnAttack")
                ) ||
                fighter.abilities.atk?.find((a) =>
                  a.hasOwnProperty("deathOnAttack")
                )
              )
                fighter.life = 0;
            }
          }
        }
      } else defArmy.defeated = true;
    }

    var dummy = [...defArmy.Ground.filter((c) => c?.life > 0)];
    defArmy.Ground = [...dummy];
    var dummy = [...defArmy.Flying.filter((c) => c?.life > 0)];
    defArmy.Flying = [...dummy];
    var dummy = [...atkArmy.Ground.filter((c) => c?.life > 0)];
    atkArmy.Ground = [...dummy];
    var dummy = [...atkArmy.Flying.filter((c) => c?.life > 0)];
    atkArmy.Flying = [...dummy];

    roundsInfo.GroundDefArmy.push(defArmy.Ground.map((u) => ({ ...u })));
    roundsInfo.GroundAtkArmy.push(atkArmy.Ground.map((u) => ({ ...u })));
    roundsInfo.AirDefArmy.push(defArmy.Flying.map((u) => ({ ...u })));
    roundsInfo.AirAtkArmy.push(atkArmy.Flying.map((u) => ({ ...u })));
    roundsInfo.Base.push(defBase.life);

    if (!defArmy.Ground.length && !defArmy.Flying.length)
      defArmy.defeated = true;
    if (!atkArmy.Ground.length && !atkArmy.Flying.length)
      atkArmy.defeated = true;
    // }
  }

  roundsInfo.defArmy = defArmy.defeated ? "defeated" : "not defeated";
  roundsInfo.atkArmy = atkArmy.defeated ? "defeated" : "not defeated";
  roundsInfo.defBase = defBase;

  return roundsInfo;
}

function gameFunction(deck1, deck2) {
  const gameResult = { winner: undefined };
  const [atk1, atk2, def1, def2] = [
    deck1.cards.length % 2 === 0
      ? shuffle(deck1.cards).filter((c, i) => i < deck1.cards.length / 2)
      : shuffle(deck1.cards).filter((c, i) => i <= deck1.cards.length / 2),
    deck2.cards.length % 2 === 0
      ? shuffle(deck2.cards).filter((c, i) => i < deck2.cards.length / 2)
      : shuffle(deck2.cards).filter((c, i) => i <= deck2.cards.length / 2),
    deck1.cards.length % 2 === 0
      ? shuffle(deck1.cards).filter((c, i) => i >= deck1.cards.length / 2)
      : shuffle(deck1.cards).filter((c, i) => i > deck1.cards.length / 2),
    deck2.cards.length % 2 === 0
      ? shuffle(deck2.cards).filter((c, i) => i >= deck2.cards.length / 2)
      : shuffle(deck2.cards).filter((c, i) => i > deck2.cards.length / 2),
  ];

  const battle1 = battle(atk1, def2);
  const battle2 = battle(atk2, def1);

  battle1.attacker = deck1.userId;
  battle1.defender = deck2.userId;
  battle2.attacker = deck2.userId;
  battle2.defender = deck1.userId;

  gameResult.battle1 = battle1;
  gameResult.battle2 = battle2;

  switch (true) {
    case battle1.defBase.life > battle2.defBase.life:
      gameResult.winner = deck2.userId;
      break;
    case battle1.defBase.life < battle2.defBase.life:
      gameResult.winner = deck1.userId;
      break;
    case battle1.defBase.life === battle2.defBase.life:
      switch (true) {
        case battle1.defBase.attacked > battle2.defBase.attacked:
          gameResult.winner = deck2.userId;
          break;
        case battle1.defBase.attacked < battle2.defBase.attacked:
          gameResult.winner = deck1.userId;
          break;
        case battle1.defBase.attacked === battle2.defBase.attacked:
          gameResult.winner = "tie";
          break;
      }
      break;
  }

  return gameResult;
}

module.exports = gameFunction;
