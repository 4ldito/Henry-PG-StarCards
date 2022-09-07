import React from "react";
import { useState } from "react";
import PackDetail from "./PackDetail";

import css from "../styles/Pack.module.css";
import style from "../styles/PackDetail.module.css";
import { FaDna } from "react-icons/fa";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";

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

  const favPacks = useSelector((state) => state.cardsPacksReducer.favUserPacks);
  let searchFaved = favPacks?.find((p) => p.id === pack.id);

  return (
    <>
      <div className={css.border}>
        <div className={css.background}>
          <img className={css.img} src={pack.image} alt={`${pack.name} pack`} onClick={handleDetail} />
          {searchFaved === undefined ? (
            <button className={`${css.favNull}`} onClick={e => handleFav(e, pack.id, 'add')}>
              <BsSuitHeart size={15} />
            </button>
          ) : (
            <button className={`${css.fav} ${style.btnAddToCart}`} onClick={e => handleFav(e, pack.id, 'delete')}>
              <BsSuitHeartFill size={15} />
            </button>
          )}
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
