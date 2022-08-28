import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToShopCart } from "../../../redux/actions/shopCart";
import { favUserPacks } from "../../../redux/actions/cardsPack";
import Swal from "sweetalert2";
import { buyCardPack } from "../../../redux/actions/cardsPack";

import style from "../styles/PackDetail.module.css";

export default function Pack({ handleDetail }) {
  const pack = useSelector((state) => state.cardsPacksReducer.detailPack);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [fav, setFav] = useState({ action: "delete", packId: 0 });

  const user = useSelector((state) => state.userReducer.user);
  const favPacks = useSelector((state) => state.cardsPacksReducer.favUserPacks);
  let searchFaved = favPacks.find((p) => p.id === pack.id);

  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (quantity - 1 <= 0) return;
    setQuantity((state) => state - 1);
  };

  const increaseQuantity = (e) => {
    e.preventDefault();
    if (quantity + 1 > pack.stock) return;
    setQuantity((state) => state + 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    pack.quantity = quantity;
    const info = { data: [{ ...pack }] };

    if (!user.id) {
      return Swal.fire({
        title: "Error!",
        text: "Inicia sesion primero.",
        icon: "error",
      });
    }

    if (checkStock(quantity)) {
      return Swal.fire({
        title: "Error!",
        text: "No hay stock disponible =(",
        icon: "error",
      });
    }

    Swal.fire({
      title: `Confrimar`,
      text: `¿Estás seguro que queres comprar ${pack.name} por ${pack.price} stars?`,
      showCancelButton: true,
      confirmButtonText: "Comprar",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(buyCardPack(info, user.id));
      }
    });
  };

  const checkStock = (totalQuantity) => {
    if (pack.stock && totalQuantity > pack.stock) {
      return true;
    }
    return false;
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!pack.quantity) pack.quantity = 0;
    const totalQuantity = pack.quantity + quantity;

    if (checkStock(totalQuantity)) {
      return Swal.fire({
        title: "Error!",
        text: "No hay stock disponible =(",
        icon: "error",
      });
    }

    Swal.fire({
      title: `Carrito`,
      text: `Añadiste ${quantity} de ${pack.name} correctamente al carrito`,
      icon: "success",
    });
    dispatch(addToShopCart(pack, quantity, type, user.id));
  };

  const handleFav = (e) => {
    e.preventDefault();
    const userId = user.id;
    if (fav.action === "add") {
      setFav({ action: "delete", packId: e.target.id });
      dispatch(
        favUserPacks({ action: "delete", userId: userId, packId: e.target.id })
      );
    } else {
      setFav({ action: "add", packId: e.target.id });
      dispatch(
        favUserPacks({ action: "add", userId: userId, packId: e.target.id })
      );
    }
  };
  return (
    <div className={style.packDetail} onClick={handleDetail}>
      <div className={style.background} onClick={(e) => e.stopPropagation()}>
        <div className={style.left}>
          <img src={pack.image} alt={pack.image} className={style.image} />

          {searchFaved === undefined ? (
            <button
              className={`${style.fav} ${style.btnAddToCart}`}
              id={pack.id}
              onClick={handleFav}
            >
              ❤
            </button>
          ) : (
            <button
              className={`${style.fav} ${style.btnAddToCart}`}
              id={pack.id}
              onClick={handleFav}
            >
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
                      {card[0]} - {card[1]}%
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
              {/* <button className={style.car}>🛒</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
