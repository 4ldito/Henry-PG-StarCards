import React from "react";
import { useFetchStarsPack } from "../../../hooks/useFetchStarsPack";
import { useFetchCardsPack } from "./../../../hooks/useFetchCardsPack";

import PacksCard from "./PacksCard";

import style from "../styles/Packs.module.css";

const Packs = ({ type }) => {
  let pack;
  if (type === "starsPack") pack = useFetchStarsPack().starsPacks;
  else pack = useFetchCardsPack().cardsPack;

  return (
    <>
      <h2 className={style.title}>
        {type === "starsPack" ? "Stars Packs" : "Cards Packs"} Disponibles:
      </h2>
      <div className={style.container}>
        {pack.map((p) => {
          return <PacksCard key={p.id} pack={p} type={type} />;
        })}
      </div>
    </>
  );
};

export default Packs;
