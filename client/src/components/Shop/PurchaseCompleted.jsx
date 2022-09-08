import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { sendMailPurchase } from "../../redux/actions/sendMail";

import {
  cleanPreferenceId,
  getPurchaseInfo,
  shopCartCleanMsgInfo,
} from "../../redux/actions/shopCart";
import { purchaseCompleted } from "../../redux/actions/user";

import style from "./styles/PurchaseCompleted.module.css";

const PurchaseCompleted = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [actualPurchaseInfo, setActualPurchaseInfo] = useState({});
  const [error, setError] = useState({});
  const paymentId = searchParams.get("payment_id");

  const purchaseInfo = useSelector(
    (state) => state.shopCartReducer.purchaseInfo
  );
  const msg = useSelector((state) => state.shopCartReducer.msg);

  useEffect(() => {
    dispatch(getPurchaseInfo(paymentId));

    dispatch(cleanPreferenceId());
  }, []);

  useEffect(() => {
    if (purchaseInfo.userId) {
      setActualPurchaseInfo(purchaseInfo);
      dispatch(
        purchaseCompleted(purchaseInfo.userId, purchaseInfo.items, paymentId)
      );
      // console.log(purchaseInfo, purchaseInfo.items, paymentId) //despachar la accion para el email
      dispatch(getPurchaseInfo());
      // console.log(purchaseInfo)
      dispatch(sendMailPurchase(purchaseInfo));
    }
  }, [purchaseInfo, purchaseInfo]);

  useEffect(() => {
    if (msg.type) {
      setError(msg);
      dispatch(shopCartCleanMsgInfo());
    }
  }, [msg]);

  if (!actualPurchaseInfo.userId && !error.info) return <p>Loading...</p>;

  return (
    <div className={style.container}>
      <div className={style.model}>
        {error.type ? (
          <h2>{error.info}</h2>
        ) : (
          <>
            <h2 className={style.h2}>Purchase completed successfully</h2>
            {actualPurchaseInfo.items.map((item) => {
              return (
                <div key={item.title} className={style.containerItem}>
                  <p>{item.description * item.quantity} Stars</p>
                  <p> ${item.unit_price * item.quantity} ARS</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default PurchaseCompleted;
