import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saleCard } from "../../../redux/actions/cards/userCards";

import css from "./SaleCard.module.css";

export default function SaleCard({ handleViewCard, id, name, image }) {
  const dispatch = useDispatch();
  const userCards = useSelector(state => state.userReducer.user.UserCards);
  const [currentUserCards, setCurrentUserCards] = useState(null);

  const [sale, setSale] = useState({
    id: id,
    quantity: 0,
    price: 0,
    status: "onSale",
  });

  function handleChange(e) {
    setSale({ ...sale, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    // setCurrentUserCards()
    console.log(userCards)
    // userCards?.filter(userCard => { console.log(userCard); })
  }, [userCards])

  function handleSubmit(e) {
    e.preventDefault();
    if (sale.quantity || sale.price) return;
    dispatch(saleCard(sale));
  }

  return (
    <div className={css.SaleCard} onClick={handleViewCard}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <h1>{name}</h1>
        <img src={image} alt="" />
        <form>
          <label htmlFor="">Cantidad</label>
          <input
            type="number"
            name="quantity"
            min="1"
            max="5"
            value={sale.quantity}
            placeholder="quantity"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="">Precio</label>
          <input
            type="number"
            name="price"
            value={sale.price}
            placeholder="price"
            onChange={(e) => handleChange(e)}
          />
          <input type="submit" value="Sale" />
        </form>
      </div>
    </div>
  );
}
