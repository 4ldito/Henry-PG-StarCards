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
      <div className={type === "starsPack" ? style.containerStars : style.container}>
        {pack.length ? pack.map((p) => {
          return <PacksCard key={p.id} pack={p} type={type} />;
        }) : <h2>Not found xd</h2> }
      </div>
      {/* <div className={style.containerStars}>
        {pack.map((p) => {
          return <PacksCard key={p.id} pack={p} type={type} />;
        })}
      </div> */}
    </>
  );
};

export default Packs;
