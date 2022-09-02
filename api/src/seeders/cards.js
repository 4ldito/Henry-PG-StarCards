const zergCards = [
  {
    name: "Zergling",
    Gdmg: 10,
    Admg: 0,
    life: 70,
    ability: "Atacante: gana 4.1 de daño terrestre.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "Gdmg",
            num: 4.1,
            time: "once",
          },
        },
      ],
    },
    race: "Zerg",
    cost: 50,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FZergling?alt=media&token=161b2622-1a49-4be1-a83b-4fcb36e1c3b7",
  },
  {
    name: "Roach",
    Gdmg: 11.2,
    Admg: 0,
    life: 145,
    ability: "Defensor: gana 14.5 de vida.",
    abilities: {
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "life",
            num: 14.5,
            time: "once",
          },
        },
      ],
    },
    race: "Zerg",
    cost: 125,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FRoach?alt=media&token=6a86441a-fdf4-4c31-9e31-0def6ac4f6ab",
  },
  {
    name: "Queen",
    Gdmg: 11.3,
    Admg: 12.7,
    life: 150,
    ability: "Siempre: otorga 10 de vida.",
    abilities: {
      all: [
        {
          modStat: {
            mod: "inc",
            team: "ally",
            objective: "need",
            stat: "life",
            num: 10,
            time: "everyturn",
          },
        },
      ],
    },
    race: "Zerg",
    cost: 150,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FQueen?alt=media&token=4f621eda-a303-40b8-9cd2-b864333a17ef",
  },
  {
    name: "Hydralisk",
    Gdmg: 22.2,
    Admg: 22.2,
    life: 90,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Zerg",
    cost: 200,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FHydralisk?alt=media&token=7442d781-83cd-4a3a-8472-c5ae33c9997e",
  },
  {
    name: "Ravager",
    Gdmg: 14,
    Admg: 0,
    life: 120,
    ability: "Siempre: daña 7 a los enemigos terrestres.",
    abilities: {
      all: [
        {
          modStat: {
            mod: "dec",
            team: "enemy",
            objective: "ground",
            stat: "life",
            num: 14,
            time: "everyturn",
          },
        },
      ],
    },
    race: "Zerg",
    cost: 300,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FRavager?alt=media&token=8740278a-4d7f-4c12-80de-b2d55f43b3da",
  },
  {
    name: "Baneling",
    Gdmg: 80,
    Admg: 0,
    life: 30,
    ability: "Siempre: al atacar muere.",
    abilities: {
      all: [{ deathOnAttack: "deathOnAttack" }],
    },

    race: "Zerg",
    cost: 100,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FBaneling?alt=media&token=7daf5fc6-cde1-4833-8861-dc6ca6c46c35",
  },
  {
    name: "Lurker",
    Gdmg: 0,
    Admg: 0,
    life: 200,
    ability: "Siempre: invisible, daña 14 en área terrestre.",
    abilities: {
      all: [
        {
          invisible: "invisible",
          splashDmg: { num: 14, objective: "ground", time: "everyturn" },
        },
      ],
    },
    race: "Zerg",
    cost: 450,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FLurker?alt=media&token=304fd625-49d6-48a5-a038-096a0b5bb894",
  },
  {
    name: "Defiler",
    Gdmg: 0,
    Admg: 0,
    life: 80,
    ability: "Siempre: daña 10 a los enemigos terrestres y aéreos en área.",
    abilities: {
      all: [
        { splashDmg: { num: 10, objective: "ground", time: "everyturn" } },
        { splashDmg: { num: 10, objective: "air", time: "everyturn" } },
      ],
    },
    race: "Zerg",
    cost: 350,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FDefiler?alt=media&token=f2414bb7-dda6-480a-9e16-16fbba0e07d6",
  },
  {
    name: "Infestor",
    Gdmg: 0,
    Admg: 0,
    life: 90,
    ability: "Siempre: controla al último enemigo terrestre en llegar.",
    abilities: { all: [{ control: "ground" }] },
    race: "Zerg",
    cost: 400,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FInfestor?alt=media&token=2dfac2f2-e6d2-44e5-a3a6-fb55f723fe4a",
  },
  {
    name: "Swarm Host",
    Gdmg: 46.6,
    Admg: 0,
    life: 160,
    ability: "Siempre: invisible",
    abilities: { all: [{ invisible: "invisible" }] },
    race: "Zerg",
    cost: 250,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FSwarm%20Host?alt=media&token=755a7a3a-395e-4c20-8154-eeb7f837c1d6",
  },
  {
    name: "Ultralisk",
    Gdmg: 57.4,
    Admg: 0,
    life: 500,
    ability:
      "Atacante: gana 4.6 de daño terrestre. Defensor: gana 250 de vida.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "Gdmg",
            num: 4.6,
            time: "once",
          },
        },
      ],
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "life",
            num: 250,
            time: "once",
          },
        },
      ],
    },
    race: "Zerg",
    cost: 700,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FUltralisk?alt=media&token=8e84f06c-93f8-4c84-8a23-95c5b38ac78f",
  },
  {
    name: "Overlord",
    Gdmg: 0,
    Admg: 0,
    life: 200,
    ability: "Siempre: detector",
    abilities: { all: [{ detector: "detector" }] },
    race: "Zerg",
    cost: 100,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FOverlord?alt=media&token=afb05541-96f9-42a1-aae1-dff06020338e",
  },
  {
    name: "Scourge",
    Gdmg: 0,
    Admg: 220,
    life: 25,
    ability: "Siempre: al atacar muere.",
    abilities: {
      all: [{ deathOnAttack: "deathOnAttack" }],
    },
    race: "Zerg",
    cost: 175,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FScourge?alt=media&token=cfbc5d9b-99c8-4258-aacc-6b32fe069336",
  },
  {
    name: "Mutalisk",
    Gdmg: 8.3,
    Admg: 8.3,
    life: 120,
    ability: "Atacante: gana 11.3 de daño terrestre. Defensor: gana 1 de vida.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "Gdmg",
            num: 11.3,
            time: "once",
          },
        },
      ],
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "life",
            num: 1,
            time: "everyturn",
          },
        },
      ],
    },
    race: "Zerg",
    cost: 300,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FMutalisk?alt=media&token=da7bdcd5-0ae5-473d-b6b3-e84f4072e19a",
  },
  {
    name: "Corruptor",
    Gdmg: 0,
    Admg: 10.3,
    life: 200,
    ability: "Defensor: gana 4.4 de daño aéreo.",
    abilities: {
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "Admg",
            num: 4.4,
            time: "once",
          },
        },
      ],
    },
    race: "Zerg",
    cost: 350,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FCorruptor?alt=media&token=5e3236b2-b2d2-44c1-ad65-e1739bcf94ba",
  },
  {
    name: "Viper",
    Gdmg: 0,
    Admg: 0,
    life: 150,
    ability:
      "Atacante: controla al último enemigo aéreo en llegar. Defensor: disminuye el ataque aéreo enemigo un 80%",
    abilities: {
      atk: [{ control: "air" }],
      def: [
        {
          modStat: {
            mod: "dec",
            objective: "air",
            team: "enemy",
            stat: "Admg",
            perc: 10,
            time: "once",
          },
        },
      ],
    },
    race: "Zerg",
    cost: 500,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FViper?alt=media&token=ab742511-a345-4965-bc95-1e6132aa7e17",
  },
  {
    name: "Brood Lord",
    Gdmg: 51.1,
    Admg: 0,
    life: 300,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Zerg",
    cost: 800,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FBrood%20Lord?alt=media&token=68edc8a9-7ff6-42ad-abf7-5f0dc5da56c3",
  },
  {
    name: "Kerrigan",
    Gdmg: 75,
    Admg: 75,
    life: 1000,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Zerg",
    cost: 1500,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FZerg%2FKerrigan?alt=media&token=be3cef6f-33e9-4111-afd0-3aec3191d4fa",
  },
];

const terranCards = [
  {
    name: "Marine",
    Gdmg: 9.8,
    Admg: 9.8,
    life: 45,
    ability:
      "Atacante: gana 5.2 de daño terrestre y aéreo, y pierde 15 de vida.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "dmg",
            num: 5.2,
          },
        },
        {
          modStat: {
            mod: "dec",
            objective: "self",
            time: "once",
            stat: "life",
            num: 15,
          },
        },
      ],
    },
    race: "Terran",
    cost: 50,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FMarine?alt=media&token=c4076462-aa2a-445d-8877-f0c7988d3842",
  },
  {
    name: "Marauder",
    Gdmg: 9.3,
    Admg: 0,
    life: 125,
    ability:
      "Defensor: gana 4.8 de daño terrestre y aéreo, y pierde 25 de vida.",
    abilities: {
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "Gdmg",
            num: 4.8,
          },
        },
        {
          modStat: {
            mod: "dec",
            objective: "self",
            time: "once",
            stat: "life",
            num: 25,
          },
        },
      ],
    },
    race: "Terran",
    cost: 150,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FMarauder?alt=media&token=52b72677-79e6-4aad-8eb0-9ea8da6a9fb2",
  },
  {
    name: "Ghost",
    Gdmg: 9.3,
    Admg: 9.3,
    life: 100,
    ability: "Atacante: invisible. Defensor: daña 80 al enemigo.",
    abilities: {
      atk: [{ invisible: "invisible" }],
      def: [
        {
          modStat: {
            mod: "dec",
            objective: "need",
            team: "enemy",
            stat: "life",
            num: 80,
            time: "once",
          },
        },
      ],
    },
    race: "Terran",
    cost: 400,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FGhost?alt=media&token=24eef538-898e-4a21-ac35-84899e43b071",
  },
  {
    name: "Reaper",
    Gdmg: 10.1,
    Admg: 0,
    life: 60,
    ability: "Atacante: gana 20 de daño terrestre. Defensor: gana 1 de vida.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "Gdmg",
            num: 20,
          },
        },
      ],
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "everyturn",
            stat: "life",
            num: 1,
          },
        },
      ],
    },
    race: "Terran",
    cost: 150,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FReaper?alt=media&token=faabcd55-a2a5-4fc7-83c5-121c7839992e",
  },
  {
    name: "Hellion",
    Gdmg: 4.5,
    Admg: 0,
    life: 90,
    ability:
      "Atacante: gana 3.4 de daño terrestre. Defensor: gana 6 de daño terrestre.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "Gdmg",
            num: 3.4,
          },
        },
      ],
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "Gdmg",
            num: 6,
          },
        },
      ],
    },
    race: "Terran",
    cost: 100,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FHellion?alt=media&token=7de28d5c-10eb-4086-b058-c934271985c1",
  },
  {
    name: "Vulture",
    Gdmg: 20,
    Admg: 0,
    life: 80,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Terran",
    cost: 75,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FVulture?alt=media&token=3d5d84ba-476d-44f7-aaf8-ec6c80dfe2a6",
  },
  {
    name: "Widow Mine",
    Gdmg: 5.7,
    Admg: 5.7,
    life: 75,
    ability: "Defensor: invisible.",
    abilities: { def: [{ invisible: "invisible" }] },
    race: "Terran",
    cost: 125,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FWidow%20Mine?alt=media&token=cbe29c34-dffc-46ec-b1ab-cbd7d0ad85cf",
  },
  {
    name: "Goliath",
    Gdmg: 12,
    Admg: 20,
    life: 125,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Terran",
    cost: 200,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FGoliath?alt=media&token=57a7660b-4bd2-4f30-a528-96c208504924",
  },
  {
    name: "Siege Tank",
    Gdmg: 0,
    Admg: 0,
    life: 175,
    ability: "Atacante: daña 20 al siguiente enemigo terrestre.",
    abilities: {
      atk: [{ splashDmg: { num: 30, objective: "ground", time: "everyturn" } }],
    },
    race: "Terran",
    cost: 400,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FSiege%20Tank?alt=media&token=ff3bb143-5fe4-41d4-a755-70270e0bde2a",
  },
  {
    name: "Thor",
    Gdmg: 65.9,
    Admg: 11.2,
    life: 400,
    ability:
      "Atacante: gana 4.1 de daño terrestre. Defensor: gana 30 de daño aéreo.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "Gdmg",
            num: 4.1,
          },
        },
      ],
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "Admg",
            num: 30,
          },
        },
      ],
    },
    race: "Terran",
    cost: 700,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FThor?alt=media&token=6061e006-db4f-4bb6-bf70-0e3fc7f5c163",
  },
  {
    name: "Medivac",
    Gdmg: 0,
    Admg: 0,
    life: 150,
    ability: "Siempre: gana 20 de vida terrestre.",
    abilities: {
      all: [
        {
          modStat: {
            mod: "inc",
            objective: "ground",
            team: "ally",
            time: "everyturn",
            stat: "life",
            num: 20,
          },
        },
      ],
    },
    race: "Terran",
    cost: 300,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FMedivac?alt=media&token=7262758b-1db9-46fc-b2fd-bad6d86b0329",
  },
  {
    name: "Viking",
    Gdmg: 16.9,
    Admg: 14,
    life: 125,
    ability: "Siempre: toma el movimiento más requerido.",
    abilities: {
      all: [
        {
          modStat: {
            mod: "changeMov",
            change: "need",
          },
        },
      ],
    },
    race: "Terran",
    cost: 300,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FViking?alt=media&token=0fb82978-7c28-4df0-8611-74f0c13e5d95",
  },
  {
    name: "Wraith",
    Gdmg: 8,
    Admg: 20,
    life: 120,
    ability: "Atacante: invisible.",
    abilities: { atk: [{ invisible: "invisible" }] },
    race: "Terran",
    cost: 350,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FWraith?alt=media&token=76d95153-d1f3-4193-82e5-39dc60b1993c",
  },
  {
    name: "Banshee",
    Gdmg: 0,
    Admg: 0,
    life: 140,
    ability: "Atacante: daña 27 en área terrestre. Defensor: invisible.",
    abilities: {
      atk: [{ splashDmg: { num: 27, objective: "ground", time: "everyturn" } }],
      def: [{ invisible: "invisible" }],
    },
    race: "Terran",
    cost: 350,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FBanshee?alt=media&token=c3cbd14f-f308-4698-95ca-856dd8d0d401",
  },
  {
    name: "Raven",
    Gdmg: 31.6,
    Admg: 31.6,
    life: 140,
    ability: "Siempre: detector.",
    abilities: { all: [{ detector: "detector" }] },
    race: "Terran",
    cost: 500,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FRaven?alt=media&token=4261c511-623d-43f0-967a-4363a4d7f5a8",
  },
  {
    name: "Liberator",
    Gdmg: 0,
    Admg: 7.8,
    life: 180,
    ability: "Defensor: gana 65.8 de daño terrestre, pierde 7.8 de daño aéreo.",
    abilities: {
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "Gdmg",
            num: 65.8,
          },
        },
        {
          modStat: {
            mod: "dec",
            objective: "self",
            time: "once",
            stat: "Admg",
            num: 7.8,
          },
        },
      ],
    },
    race: "Terran",
    cost: 450,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FLiberator?alt=media&token=2b248017-c9b9-442f-b9b2-5df8ce28e38f",
  },
  {
    name: "Battlecruiser",
    Gdmg: 50,
    Admg: 31.3,
    life: 550,
    ability: "Atacante: daña 25 a un enemigo.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "dec",
            objective: "need",
            team: "enemy",
            stat: "life",
            num: 25,
            time: "everyturn",
          },
        },
      ],
    },
    race: "Terran",
    cost: 1000,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FBattlecruiser?alt=media&token=72ec1370-fd3b-4b48-9f76-7e64a347b05b",
  },
  {
    name: "Raynor",
    Gdmg: 75,
    Admg: 75,
    life: 1000,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Terran",
    cost: 1500,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FTerran%2FRaynor?alt=media&token=71379b06-67a0-4082-bbb6-b5b0e953dc28",
  },
];

const protossCards = [
  {
    name: "Zealot",
    Gdmg: 18.6,
    Admg: 0,
    life: 150,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Protoss",
    cost: 100,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FZealot?alt=media&token=7242840a-f70a-4955-a6ed-a3e53a769add",
  },
  {
    name: "Sentry",
    Gdmg: 8.5,
    Admg: 8.5,
    life: 80,
    ability: "Defensor: aumenta 10 de vida a un aliado terrestre.",
    abilities: {
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "ground",
            team: "ally",
            time: "everyturn",
            stat: "life",
            num: 10,
          },
        },
      ],
    },
    race: "Protoss",
    cost: 250,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FSentry?alt=media&token=49fa1132-ab60-4e03-96b5-efe4e8a82a1b",
  },
  {
    name: "Stalker",
    Gdmg: 9.7,
    Admg: 9.7,
    life: 125,
    ability: "Atacante: gana 20 de vida.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "life",
            num: 20,
            time: "once",
          },
        },
      ],
    },
    race: "Protoss",
    cost: 225,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FStalker?alt=media&token=cb9b731d-3ca0-4092-b6f0-44a6bcfd0b65",
  },
  {
    name: "Dragoon",
    Gdmg: 12,
    Admg: 12,
    life: 180,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Protoss",
    cost: 225,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FDragoon?alt=media&token=28ad1db2-68d8-4b36-904c-9fbe0c4f5b42",
  },
  {
    name: "Dark Templar",
    Gdmg: 37.2,
    Admg: 0,
    life: 120,
    ability: "Atacante: invisible.",
    abilities: { atk: [{ invisible: "invisible" }] },
    race: "Protoss",
    cost: 375,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FDark%20Templar?alt=media&token=7ef6e0a5-3387-4b75-8e28-d3928bcb730e",
  },
  {
    name: "Archon",
    Gdmg: 20,
    Admg: 20,
    life: 360,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Protoss",
    cost: 350,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FArchon?alt=media&token=dc3bb3d4-cf6a-404a-9947-6945d62592bd",
  },
  {
    name: "Immortal",
    Gdmg: 19.2,
    Admg: 0,
    life: 300,
    ability: "Defensor: gana 200 de vida.",
    abilities: {
      def: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "once",
            stat: "life",
            num: 200,
          },
        },
      ],
    },
    race: "Protoss",
    cost: 475,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FImmortal?alt=media&token=19206eb4-8648-4546-b125-9f1b0dbfc262",
  },
  {
    name: "Disruptor",
    Gdmg: 0,
    Admg: 0,
    life: 250,
    ability:
      "Atacante: daña 20 en área terrestre. Defensor: daña 30 en área terrestre.",
    abilities: {
      atk: [{ splashDmg: { num: 20, objective: "ground", time: "everyturn" } }],
      def: [{ splashDmg: { num: 30, objective: "ground", time: "everyturn" } }],
    },
    race: "Protoss",
    cost: 450,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FDisruptor?alt=media&token=c689adef-f42c-4c02-b23f-51d2c3647836",
  },
  {
    name: "Reaver",
    Gdmg: 0,
    Admg: 0,
    life: 180,
    ability: "Siempre: daña 40 en área terrestre.",
    abilities: {
      all: [{ splashDmg: { num: 40, objective: "ground", time: "everyturn" } }],
    },
    race: "Protoss",
    cost: 400,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FReaver?alt=media&token=907c36ad-e9ec-4921-8669-4690c919d6ce",
  },
  {
    name: "Colossus",
    Gdmg: 0,
    Admg: 0,
    life: 350,
    ability: "Siempre: es afectado por daño aéreo, daña 28 en área terrestre.",
    abilities: {
      all: [
        { allMoves: "allMoves" },
        { splashDmg: { num: 28, objective: "ground", time: "everyturn" } },
      ],
    },
    race: "Protoss",
    cost: 700,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FColossus?alt=media&token=2c216219-6072-451b-8551-68f7c1c9b5db",
  },
  {
    name: "Observer",
    Gdmg: 0,
    Admg: 0,
    life: 60,
    ability: "Siempre: detector, invisible.",
    abilities: { all: [{ detector: "detector" }, { invisible: "invisible" }] },
    race: "Protoss",
    cost: 175,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FObserver?alt=media&token=a4898109-d030-4406-87d2-a5b31985054f",
  },
  {
    name: "Corsair",
    Gdmg: 0,
    Admg: 12.6,
    life: 180,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Protoss",
    cost: 350,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FCorsair?alt=media&token=937a11a7-f032-4fba-8936-baed70a80ec8",
  },
  {
    name: "Arbiter",
    Gdmg: 10,
    Admg: 10,
    life: 350,
    ability: "Siempre: reduce 30% el daño enemigo.",
    abilities: {
      all: [
        {
          modStat: {
            mod: "dec",
            objective: "need",
            stat: "Gdmg",
            perc: 30,
            team: "enemy",
            time: "once",
          },
        },
        {
          modStat: {
            mod: "dec",
            objective: "need",
            stat: "Admg",
            perc: 30,
            team: "enemy",
            time: "once",
          },
        },
      ],
    },
    race: "Protoss",
    cost: 800,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FArbiter?alt=media&token=464ffbb0-9c48-4f52-b046-236c6b6e956a",
  },
  {
    name: "Void Ray",
    Gdmg: 16.8,
    Admg: 16.8,
    life: 250,
    ability: "Siempre: gana 2 de daño por turno.",
    abilities: {
      all: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "everyturn",
            stat: "Gdmg",
            num: 2,
          },
        },
        {
          modStat: {
            mod: "inc",
            objective: "self",
            time: "everyturn",
            stat: "Admg",
            num: 2,
          },
        },
      ],
    },
    race: "Protoss",
    cost: 550,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FVoid%20Ray?alt=media&token=15715ba9-e2c7-4f5c-92b5-504b7526d802",
  },
  {
    name: "Tempest",
    Gdmg: 17,
    Admg: 12.7,
    life: 300,
    ability: "Atacante: gana 22 de daño terrestre y aéreo.",
    abilities: {
      atk: [
        {
          modStat: {
            mod: "inc",
            objective: "self",
            stat: "dmg",
            num: 22,
            time: "once",
          },
        },
      ],
    },
    race: "Protoss",
    cost: 600,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FTempest?alt=media&token=bef7957a-19c2-4972-9e2a-65622b9cbc60",
  },
  {
    name: "Carrier",
    Gdmg: 37.3,
    Admg: 37.3,
    life: 650,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Protoss",
    cost: 970,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FCarrier?alt=media&token=f262246d-edfd-47a5-889d-1c105441c4e6",
  },
  {
    name: "Mothership",
    Gdmg: 22.8,
    Admg: 22.8,
    life: 700,
    ability: "Siempre: tus unidades son invisibles excepto ésta.",
    abilities: { all: [{ cloackTema: "cloackTeam" }] },
    race: "Protoss",
    cost: 1200,
    movement: "Flying",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FMothership?alt=media&token=baee18c9-824c-4137-ad99-e0d5b7abb22b",
  },
  {
    name: "Zeratul",
    Gdmg: 75,
    Admg: 75,
    life: 1000,
    ability: "Sin habilidad.",
    abilities: {},
    race: "Protoss",
    cost: 1500,
    movement: "Ground",
    image:
      "https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/cardUnit%2FProtoss%2FZeratul?alt=media&token=872e6c4b-46e7-4add-bb04-26e7ec22abe1",
  },
];

module.exports = { zergCards, terranCards, protossCards };
