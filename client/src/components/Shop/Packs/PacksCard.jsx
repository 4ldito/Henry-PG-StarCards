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
  const [quantity, setQuantity] = useState(pack.stock > 0 ? 1 : 0);

  const user = useSelector((state) => state.userReducer.user);
  const favPacks = useSelector((state) => state.cardsPacksReducer.favUserPacks);
  let searchFaved = favPacks?.find((p) => p.id === pack.id);

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
        title: "Error!",
        text: "No hay stock disponible =(",
        icon: "error",
      });
    }

    if (!user.id) {
      return Swal.fire({
        title: "Error!",
        text: "Inicia sesion primero",
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
      text: `¿Estás seguro que queres comprar ${pack.quantity} ${pack.name
        } por ${pack.price * pack.quantity} stars?`,
      showCancelButton: true,
      confirmButtonText: "Comprar",
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
    console.log(e.target.name);
    e.preventDefault();
    const userId = user.id;
    if (!userId) {
      return Swal.fire({
        title: "Error!",
        text: "Inicia sesión para añadir a favoritos.",
        icon: "error",
      });
    }

    if (e.target.name === "unfav") {
      dispatch(
        favUserPacks({ action: "delete", userId: userId, packId: e.target.id })
      );
    } else {
      dispatch(
        favUserPacks({ action: "add", userId: userId, packId: e.target.id })
      );
    }
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
            <button className={pack.stock > 0 ? css.buyNow : `${css.buyNow} ${style.withoutStock}`} onClick={handleBuyNow}>
              {pack.stock > 0 ? "BUY NOW" : 'SOLD OUT'}
            </button>
            <button
              className={`${css.btn} ${css.btnAddToCart}`}
              onClick={handleAddItem}
            />
          </div>

          <div className={css.containerQuantity}>
            <span className={pack.stock > 0 ? style.stock : `${style.stock} ${style.withoutStock} ${style.withoutStockText}`}>STOCK : {pack.stock}</span>
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
