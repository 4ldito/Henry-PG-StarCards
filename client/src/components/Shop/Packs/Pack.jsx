import React from "react";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { getDetailCard } from "../../../redux/actions/cardsPack";
import css from "../styles/Pack.module.css";
import PackDetail from "./PackDetail";

export default function Pack({ pack, increaseQuantity, handleFav, handleAddItem, handleBuyNow, decreaseQuantity, quantity }) {
  const [viewDetail, setViewDetail] = useState(false)
  // const dispatch = useDispatch()

  const handleDetail = (e) => {
    setViewDetail(!viewDetail)
    // dispatch(getDetailCard(id))
  }

  return (
    <>
      <div className={css.border} onClick={handleDetail}>
        <div className={css.background}>
          <img className={css.img} src={pack.image} alt={`${pack.name} pack`} />
          <div className={css.textup}>
            <h5>{pack.name}</h5>
          </div>
          <div className={css.textDown}>
            <h6>Cards: {pack.amount}</h6>
          </div>
        </div>
      </div>
      {viewDetail &&
        <PackDetail
          pack={pack}
          handleDetail={handleDetail}
          increaseQuantity={increaseQuantity}
          handleFav={handleFav}
          handleAddItem={handleAddItem}
          handleBuyNow={handleBuyNow}
          decreaseQuantity={decreaseQuantity}
          quantity={quantity} />}
    </>
  );
}
