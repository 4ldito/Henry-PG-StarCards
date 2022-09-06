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
      <div
        className={
          type === "starsPack" ? style.containerStars : style.container
        }
      >
        {pack.map((p) => {
          return <PacksCard key={p.id} pack={p} type={type} />;
        })}
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
