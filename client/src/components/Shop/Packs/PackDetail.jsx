import React from "react";
import { useSelector } from "react-redux";

import style from "../styles/PackDetail.module.css";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { FaDna } from "react-icons/fa";

export default function Pack({
  handleDetail,
  pack,
  increaseQuantity,
  handleFav,
  handleBuyNow,
  decreaseQuantity,
  quantity,
}) {
  const favPacks = useSelector((state) => state.cardsPacksReducer.favUserPacks);
  let searchFaved = favPacks.find((p) => p.id === pack.id);

  return (
    <div className={style.packDetail} onClick={handleDetail}>
      <div className={style.background} onClick={(e) => e.stopPropagation()}>
        <span className={style.titleDetail}>CARDS PACK</span>
        <div className={style.left}>
          <img src={pack.image} alt={pack.image} className={style.image} />
          {searchFaved === undefined ? (
            <button
              className={`${style.favNull}`}
              id={pack.id}
              onClick={(e) => handleFav(e, pack.id, "add")}
            >
              <BsSuitHeart size={15} />
            </button>
          ) : (
            <button
              className={`${style.fav}`}
              onClick={(e) => handleFav(e, pack.id, "delete")}
            >
              <BsSuitHeartFill size={15} />
            </button>
          )}

          <div className={style.textImage}>
            <h1>{pack.name.toUpperCase()}</h1>
            <span>
              <FaDna size={15} /> Race {pack.race}
            </span>
            <span>{pack.amount} Cards</span>
          </div>
        </div>

        <div className={style.right}>
          <div>
            <h1 className={style.title}>CARDS</h1>
            <div className={style.cards}>
              {pack.stock > 0 && (
                <div className={style.probability}>
                  {pack.cards.map((card) => (
                    <span key={card[0]}>
                      {card[0]} - {Math.round(card[1] * 1000)/10}%
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={style.buttons}>
            <div className={style.containerQuantity}>
              <button className={style.btnMinus} onClick={decreaseQuantity} />
              <span>{quantity}</span>
              <button className={style.btnMore} onClick={increaseQuantity} />
            </div>
            <div className={style.buttonsLown}>
              <div className={style.seccionPrice}>
                <span className={style.price}>{pack.price} Stars</span>
              </div>

              <button className={style.buyNow} onClick={handleBuyNow}>
                BUY NOW
              </button>

              <button className={`${style.btnCart} ${style.btnAddToCart}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
