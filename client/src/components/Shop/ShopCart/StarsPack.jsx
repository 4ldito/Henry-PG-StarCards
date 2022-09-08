import React from "react";
import Mercadopago from "./Mercadopago";

import style from "../styles/ShopCart.module.css";
import { useNavigate } from "react-router-dom";

const StarsPack = ({
  starsPack,
  totalStarsPack,
  user,
  seeBtn,
  preferenceId,
  increaseQuantity,
  decreaseQuantity,
  handleRemoveItem,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {starsPack.length > 0 && (
        <div className={style.containerCart}>
          <h2>STARS SHOPCART</h2>
          <div className={style.seccion}>
            <span>Name</span>
            <span>Price</span>
            <span>Amount</span>
            <span>Subtotal</span>
            {/* <span /> */}
          </div>

          {starsPack.map((item) => {
            totalStarsPack += item.price * item.quantity;
            return (
              <div className={style.containerItem} key={item.id}>
                <p>{item.name}</p>
                <p>${item.price}</p>

                <div className={style.containerQuantity}>
                  <button
                    className={style.btnMinus}
                    onClick={(e) => decreaseQuantity(e, "starsPack", item)}
                  />
                  <span>{item.quantity}</span>
                  <button
                    className={style.btnMore}
                    onClick={(e) => increaseQuantity(e, "starsPack", item)}
                  />
                </div>

                <p>${item.price * item.quantity}</p>

                <button
                  className={style.btnRemove}
                  onClick={(e) => handleRemoveItem(e, "starsPack")}
                  id={item.id}
                />
              </div>
            );
          })}
          <div className={style.total}>
            <span>Total</span>
            <span />
            <span />
            <span>${totalStarsPack}</span>

            {user?.id ? (
              seeBtn && (
                <Mercadopago
                  preferenceId={preferenceId}
                  shopCartItems={starsPack}
                />
              )
            ) : (
              <button
                className={style.pay}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StarsPack;
