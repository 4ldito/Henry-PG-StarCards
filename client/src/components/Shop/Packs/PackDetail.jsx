import React from "react";
import { useSelector } from 'react-redux';

import style from "../styles/PackDetail.module.css";

export default function Pack({ handleDetail, pack, increaseQuantity, handleFav, handleBuyNow, decreaseQuantity, quantity }) {
  const favPacks = useSelector((state) => state.cardsPacksReducer.favUserPacks);
  let searchFaved = favPacks.find((p) => p.id === pack.id);

  return (
    <div className={style.packDetail} onClick={handleDetail}>
      <div className={style.background} onClick={(e) => e.stopPropagation()}>
        <div className={style.left}>
          <img src={pack.image} alt={pack.image} className={style.image} />
          {searchFaved === undefined ? (
            <button className={`${style.fav} ${style.btnAddToCart}`} id={pack.id} onClick={handleFav}>
              ❤
            </button>
          ) : (
            <button className={`${style.fav} ${style.btnAddToCart}`} id={pack.id} onClick={handleFav}>
              Unfav
            </button>
          )}

          <div className={style.textImage}>
            <h1>{pack.name}</h1>
            <p>Raza {pack.race}</p>
            <p>{pack.amount} cartas</p>
          </div>
        </div>

        <div className={style.right}>
          <div>
            <h1 className={style.title}>Cards</h1>
            <div className={style.cards}>
              {pack.stock > 0 && (
                <div className={style.probability}>
                  {pack.cards.map((card) => (
                    <h5 key={card[0]}>
                      {card[0]} - {Math.floor(card[1] * 100)}%
                    </h5>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={style.buttons}>
            <div className={style.seccionPrice}>
              <h1 className={style.price}>{pack.price} Stars</h1>
            </div>
            <div className={style.seccionBuy}>
              <div className={style.seccionBuytop}>
                <button className={style.btnM} onClick={decreaseQuantity}>
                  -
                </button>
                <h1 className={style.amount}>{quantity}</h1>
                <button className={style.btnM} onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <button className={style.buyNow} onClick={handleBuyNow}>
                Comprar ahora
              </button>
            </div>
            <div className={style.seccionCar}>
              <button className={`${style.btn} ${style.btnAddToCart}`}>
                🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
