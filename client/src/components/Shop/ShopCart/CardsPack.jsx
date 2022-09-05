import style from "../styles/ShopCart.module.css";
import { useNavigate } from "react-router-dom";

const CardsPack = ({
  cardsPack,
  totalCardsPack,
  user,
  buyWithStars,
  handleRemoveItem,
  decreaseQuantity,
  increaseQuantity,
  handleBuyCardsPack,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {cardsPack.length > 0 && (
        <div className={style.containerCart}>
          <h2>CARDPACKS SHOPCART</h2>
          <div className={style.seccion}>
            <span>Name</span>
            <span>Price</span>
            <span>Amount</span>
            <span>Subtotal</span>
            <span />
          </div>
          {cardsPack.map((item) => {
            const subtotal = item.price * item.quantity;
            totalCardsPack += subtotal;
            return (
              <div className={style.containerItem} key={item.id}>
                <p>{item.name}</p>
                <p>{item.price} STARS</p>

                <div className={style.containerQuantity}>
                  <button
                    className={style.btnMinus}
                    onClick={(e) => decreaseQuantity(e, "cardsPack", item)}
                  />
                  <span>{item.quantity}</span>
                  <button
                    className={style.btnMore}
                    onClick={(e) => increaseQuantity(e, "cardsPack", item)}
                  />
                </div>

                <p>{subtotal} STARS</p>

                <button
                  className={style.btnRemove}
                  onClick={(e) => handleRemoveItem(e, "cardsPack")}
                  id={item.id}
                />
              </div>
            );
          })}
          <div className={style.total}>
            <span>Total</span>
            <span />
            <span />
            <span>{totalCardsPack} STARS</span>
            {user?.id ? (
              <button
                className={style.pay}
                onClick={handleBuyCardsPack}
                disabled={!buyWithStars}
              >
                {buyWithStars ? "pay" : "Tus Stars son insuficientes"}
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Logeate
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardsPack;
