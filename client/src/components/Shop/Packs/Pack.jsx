import React from "react";
import { useState } from "react";
import PackDetail from "./PackDetail";

import css from "../styles/Pack.module.css";
import { FaDna } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";

export default function Pack({
  pack,
  increaseQuantity,
  handleFav,
  handleAddItem,
  handleBuyNow,
  decreaseQuantity,
  quantity,
}) {
  const [viewDetail, setViewDetail] = useState(false);

  const handleDetail = (e) => {
    setViewDetail(!viewDetail);
  };

  return (
    <>
      <div className={css.border} onClick={handleDetail}>
        <div className={css.background}>
          <img className={css.img} src={pack.image} alt={`${pack.name} pack`} />
          <button className={css.favNull}>
            <BsSuitHeart size={15} />
          </button>
          {/* /////No BORRAR///// */}
          {/* <button className={css.fav}><BsSuitHeartFill size={15}/></button> */}
          {/* /////No BORRAR///// */}
          <div className={css.text}>
            <div className={css.nameCard}>{pack.name}</div>
            <div className={css.raceCard}>
              <FaDna size={15} /> Race {pack.race}
            </div>
            <div className={css.amountCard}>{pack.amount} cards</div>
          </div>
        </div>
      </div>
      {viewDetail && (
        <PackDetail
          pack={pack}
          handleDetail={handleDetail}
          increaseQuantity={increaseQuantity}
          handleFav={handleFav}
          handleAddItem={handleAddItem}
          handleBuyNow={handleBuyNow}
          decreaseQuantity={decreaseQuantity}
          quantity={quantity}
        />
      )}
    </>
  );
}
