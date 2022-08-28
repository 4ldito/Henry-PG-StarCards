import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSaleCard } from "../../../../redux/actions/cards/userCards";

import css from "./SaleCard.module.css";

export default function SaleCard({ handleViewCard, cardId, name, image }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const [currentUserCards, setCurrentUserCards] = useState(null);

  const [sale, setSale] = useState({ quantity: 0, price: 0 });

  function handleChange(e) {
    setSale({ ...sale, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setCurrentUserCards(user.UserCards?.filter(userCard => userCard.CardId === cardId));
  }, [user]);

  function handleSubmit(e, status) {
    e.preventDefault();
    if (!sale.quantity || !sale.price) return;
    const userCardsIdsToUpdate = [];

    for (let i = 0; i < sale.quantity; i++) {
      userCardsIdsToUpdate.push(currentUserCards[i].id);
    }
    dispatch(handleSaleCard({ userId: user.id, userCardsIdsToUpdate, status, price: sale.price }))

  }

  return (
    <div className={css.SaleCard} onClick={handleViewCard}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <h1>{name}</h1>
        <img src={image} alt="" />
        <form onSubmit={(e) => handleSubmit(e, 'onSale')}>
          <label htmlFor="">Cantidad</label>
          <input type="number" name="quantity" min="1" max={currentUserCards?.length} value={sale.quantity} placeholder="quantity" onChange={(e) => handleChange(e)} />
          <label htmlFor="">Precio</label>
          <input type="number" name="price" value={sale.price} placeholder="price" onChange={(e) => handleChange(e)} />
          <input type="submit" value="Sale" />
        </form>
      </div>
    </div>
  );
}
