import React from "react";
import { useFetchStarsPack } from "../../../hooks/useFetchStarsPack";
import { useFetchCardsPack } from "./../../../hooks/useFetchCardsPack";

import PacksCard from "./PacksCard";

import css from "../styles/Packs.module.css";

const Packs = ({ type }) => {
  let pack;
  if (type === "starsPack") pack = useFetchStarsPack().starsPacks;
  else pack = useFetchCardsPack().cardsPack;

  return (
    <>
      {type === "starsPack" ? (
        <div className={css.containerStars}>
          {pack.map((p) => {
            return <PacksCard key={p.id} pack={p} type={type} />;
          })}
        </div>
      ) : (
        <div className={css.container}>
          {pack.length ? (
            pack.map((p) => {
              return <PacksCard key={p.id} pack={p} type={type} />;
            })
          ) : (
            <div className={css.notFound}>
              No favorites <br /> 💔
            </div>
          )}
        </div>
      )}

      {/* <div
        className={type === "starsPack" ? css.containerStars : css.container}
      >
        {pack.length ? (
          pack.map((p) => {
            return <PacksCard key={p.id} pack={p} type={type} />;
          })
        ) : (
          <div className={css.notFound}>
            No favorites <br /> 💔
          </div>
        )}
      </div> */}
      {/* <div className={css.containerStars}>
        {pack.map((p) => {
          return <PacksCard key={p.id} pack={p} type={type} />;
        })}
      </div> */}
    </>
  );
};

export default Packs;
