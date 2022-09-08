import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToShopCart } from "../../../redux/actions/shopCart";
import { favUserPacks } from "../../../redux/actions/cardsPack";
import Swal from "sweetalert2";
import { buyCardPack } from "../../../redux/actions/cardsPack";

import style from "../styles/PacksCards.module.css";
import css from "../styles/buyPack.module.css";
import Pack from "./Pack";

const PacksCard = ({ pack, type }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(
    pack.stock <= 0 && type === "cardsPack" ? 0 : 1
  );

  const user = useSelector((state) => state.userReducer.user);

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

    if (checkStock(quantity)) {
      return Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error!",
        text: "No stock available =(",
        icon: "error",
      });
    }

    if (!user.id) {
      return Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error!",
        text: "Sign in first to buy",
        icon: "error",
      });
    }

    if (checkStock(quantity)) {
      return Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error!",
        text: "No stock available =(",
        icon: "error",
      });
    }

    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      icon: "question",
      title: `Confirm`,
      text: `Are you sure you want to buy ${pack.quantity} ${pack.name} for ${pack.price * pack.quantity
        } stars?`,
      showCancelButton: true,
      confirmButtonText: "Buy",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(buyCardPack(info, user.id));
      }
    });
  };

  const checkStock = (totalQuantity) => {
    if (totalQuantity > pack.stock) {
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
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error!",
        text: "No stock available =(",
        icon: "error",
      });
    }

    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      title: `Shopcart`,
      text: `You added ${quantity} of ${pack.name} successfully to the cart`,
      icon: "success",
    });
    dispatch(addToShopCart(pack, quantity, type, user.id));
  };

  const handleFav = (e, packId, action) => {
    e.preventDefault();
    const userId = user.id;
    if (!userId) {
      return Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error!",
        text: "Sign in to add to favorites.",
        icon: "error",
      });
    }

    dispatch(favUserPacks({ action, userId, packId }));
  };

  if (type === "cardsPack") {
    return (
      <>
        {/* {pack.stock > 0 && ( */}
        <div
          className={css.containerPack}
          name={pack.name}
          id={pack.id}
          key={pack.id}
        >
          {/* <div className={style.pack}> */}
          <Pack
            pack={pack}
            increaseQuantity={increaseQuantity}
            handleFav={handleFav}
            handleAddItem={handleAddItem}
            handleBuyNow={handleBuyNow}
            decreaseQuantity={decreaseQuantity}
            quantity={quantity}
          />
          {/* </div> */}

          <div className={css.priceDiv}>
            <span className={css.price}>{pack.price} Stars</span>
          </div>

          <div className={css.containerBtn}>
            {/* Crear funcion para el "BUY NOW" */}
            <button
              className={
                pack.stock > 0
                  ? css.buyNow
                  : `${css.buyNow} ${style.withoutStock} disabled`
              }
              disabled={pack.stock <= 0 && true}
              onClick={handleBuyNow}
            >
              {pack.stock > 0 ? "BUY NOW" : "SOLD OUT"}
            </button>
            <button
              className={`${css.btn} ${css.btnAddToCart}`}
              onClick={handleAddItem}
            />
          </div>

          <div className={css.containerQuantity}>
            <span
              className={
                pack.stock > 0
                  ? style.stock
                  : `${style.stock} ${style.withoutStock} ${style.withoutStockText}`
              }
            >
              STOCK : {pack.stock}
            </span>
            <button className={css.btnMinus} onClick={decreaseQuantity} />
            <span>{quantity}</span>
            <button className={css.btnMore} onClick={increaseQuantity} />
          </div>
        </div>
        {/* )} */}
      </>
    );
  }

  return (
    ////////////////////////////////// Tarjetas //////////////////////////////////
    <div className={style.containerTo}>
      <div
        className={style.container}
        name={pack.name}
        id={pack.id}
        key={pack.id}
      >
        <img src={pack.image} alt="Pack" />
        <h3
          className={
            pack.stars <= 2500 ? style.starsTextBlue : style.starsTextOrange
          }
        >
          {pack.stars} Stars
        </h3>
        <div className={style.priceDiv}>
          <span className={style.price}>${pack.price}</span>
        </div>
      </div>
      <div className={style.containerBtn}>
        <div className={style.containerQuantity}>
          <button className={style.btnMinus} onClick={decreaseQuantity} />
          <span>{quantity}</span>
          <button className={style.btnMore} onClick={increaseQuantity} />
        </div>
        <button
          className={`${style.btn} ${style.btnAddToCart}`}
          onClick={handleAddItem}
        />
      </div>
    </div>
  );
};

export default PacksCard;
