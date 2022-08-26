import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saleCard } from "../../../redux/actions/cards/userCards";

import css from "./SaleCard.module.css";

export default function SaleCard({ handleViewCard, id, name, image }) {
  const dispatch = useDispatch();
  const [sale, setSale] = useState({
    id: id,
    count: 0,
    price: 0,
    status: "onSale",
  });

  function handleChange(e) {
    setSale({ ...sale, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(saleCard(sale));
  }
  return (
    <div className={css.SaleCard} onClick={handleViewCard}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <h1>{name}</h1>
        <img src={image} alt="" />
        <form>
          <input
            type="number"
            name="count"
            min="1"
            max="5"
            value={sale.count}
            placeholder="count"
            onChange={(e) => handleChange(e)}
          />
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
