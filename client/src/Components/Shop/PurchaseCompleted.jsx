import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getPurchaseInfo } from "../../redux/actions/shopCart";
import { purchaseCompleted } from "../../redux/actions/user";

import style from "./styles/PurchaseCompleted.module.css";

const PurchaseCompleted = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [actualPurchaseInfo, setActualPurchaseInfo] = useState({});
  const paymentId = searchParams.get("payment_id");

  const purchaseInfo = useSelector(
    (state) => state.shopCartReducer.purchaseInfo
  );

  useEffect(() => {
    dispatch(getPurchaseInfo(paymentId));
  }, []);

  useEffect(() => {
    if (purchaseInfo.userId) {
      setActualPurchaseInfo(purchaseInfo);
      dispatch(purchaseCompleted(purchaseInfo.userId, purchaseInfo.items));
      dispatch(getPurchaseInfo());
    }
  }, [purchaseInfo]);

  if (!actualPurchaseInfo.userId) return <p>Loading...</p>

  return (
    <div className={style.container}>
      {/* {console.log(actualPurchaseInfo)} */}
      <div className={style.model}>
        <h2 className={style.h2}>Tu compra se completo con éxito</h2>
        {actualPurchaseInfo.items.map((item) => {
          console.log(item);
          return (
            <div key={item.title} className={style.containerItem}>
              <p>{item.description} Stars</p>
              <p> ${item.unit_price} ARS</p>
            </div>)
        })}
      </div>
    </div>
  );
};

export default PurchaseCompleted;
