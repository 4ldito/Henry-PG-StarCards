import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarsPack from "./StarsPack";
import CardsPack from "./CardsPack";
import Swal from "sweetalert2";

import {
  cleanPreferenceId,
  modifiyQuantity,
  removeFromShopCart,
  shopcartBuyCardsPacks,
  shopCartCleanMsgInfo,
} from "./../../../redux/actions/shopCart";
import { usePreferenceId } from "../../../hooks/usePreferenceId";

import style from "../styles/ShopCart.module.css";

let intervalMercadopago = null;

const ShopCart = ({ handleSeeShopcart }) => {
  const dispatch = useDispatch();

  const { starsPack, cardsPack } = useSelector(
    (state) => state.shopCartReducer.shopCart
  );
  const msgInfoPurchase = useSelector((state) => state.shopCartReducer.msg);
  const user = useSelector((state) => state.userReducer.user);
  const { preferenceId } = usePreferenceId(starsPack);

  const [seeBtn, setSeeBtn] = useState(true);

  let totalStarsPack = 0;
  let totalCardsPack = 0;

  useEffect(() => {
    if (msgInfoPurchase.type) {
      dispatch(shopCartCleanMsgInfo());
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: msgInfoPurchase.title,
        text: msgInfoPurchase.info,
        icon: msgInfoPurchase.type,
      });
      if (msgInfoPurchase.type === "success" && !starsPack.length) {
        handleSeeShopcart();
      }
    }
  }, [msgInfoPurchase]);

  const handleRemoveItem = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    const target = Number(e.target.id);

    dispatch(removeFromShopCart(target, type, user.id));

    if (type === "starsPack") {
      setSeeBtn(false);
      if (intervalMercadopago) clearTimeout(intervalMercadopago);
      intervalMercadopago = setTimeout(() => {
        setSeeBtn(true);
        dispatch(cleanPreferenceId());
      }, 1000);
    }
  };

  const buyWithStars = useMemo(() => {
    return user?.stars >= totalCardsPack;
  }, [user?.stars]);

  const decreaseQuantity = (e, type, item) => {
    e.preventDefault();
    if (item.quantity === 1) {
      return Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error!",
        text: "You can't lower the quantity to 0.",
        icon: "error",
      });
    }
    dispatch(
      modifiyQuantity({
        id: item.id,
        type,
        modifyType: "decrement",
        userId: user.id,
      })
    );

    if (type === "starsPack") {
      setSeeBtn(false);
      if (intervalMercadopago) clearTimeout(intervalMercadopago);
      intervalMercadopago = setTimeout(() => {
        setSeeBtn(true);
        dispatch(cleanPreferenceId());
      }, 1000);
    }
  };

  const increaseQuantity = (e, type, item) => {
    e.preventDefault();
    if (item.quantity === item.stock) {
      return Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error!",
        text: "Not enough stock!",
        icon: "error",
      });
    }
    dispatch(
      modifiyQuantity({
        id: item.id,
        type,
        modifyType: "increment",
        userId: user.id,
      })
    );

    if (type === "starsPack") {
      setSeeBtn(false);
      if (intervalMercadopago) clearTimeout(intervalMercadopago);
      intervalMercadopago = setTimeout(() => {
        setSeeBtn(true);
        dispatch(cleanPreferenceId());
      }, 1000);
    }
  };

  const handleBuyCardsPack = (e) => {
    e.preventDefault();
    const info = { data: [...cardsPack] };
    dispatch(shopcartBuyCardsPacks(info, user.id));
  };

  return (
    <div
      onClick={(e) =>
        preferenceId !== -1 ||
        !user?.id ||
        (!starsPack.length && !cardsPack.length) ||
        (!starsPack.length && cardsPack.length)
          ? handleSeeShopcart(e)
          : ""
      }
      className={style.background}
    >
      <div className={style.container}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={style.infoContainer}
        >
          <div className={style.containerScroll}>
            {starsPack.length > 0 || cardsPack.length > 0 ? (
              <>
                <StarsPack
                  handleRemoveItem={handleRemoveItem}
                  decreaseQuantity={decreaseQuantity}
                  increaseQuantity={increaseQuantity}
                  preferenceId={preferenceId}
                  seeBtn={seeBtn}
                  user={user}
                  starsPack={starsPack}
                  totalStarsPack={totalStarsPack}
                />

                <CardsPack
                  handleRemoveItem={handleRemoveItem}
                  decreaseQuantity={decreaseQuantity}
                  increaseQuantity={increaseQuantity}
                  cardsPack={cardsPack}
                  totalCardsPack={totalCardsPack}
                  user={user}
                  buyWithStars={buyWithStars}
                  handleBuyCardsPack={handleBuyCardsPack}
                />
              </>
            ) : (
              <>
                <h2>Cart</h2>
                <p>Cart is Empty</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;
