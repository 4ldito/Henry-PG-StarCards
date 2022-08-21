import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { getPurchaseInfo } from '../../redux/actions/shopCart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { purchaseCompleted } from '../../redux/actions/user';

const PurchaseCompleted = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  const purchaseInfo = useSelector(state => state.shopCartReducer.purchaseInfo)

  useEffect(() => {
    dispatch(getPurchaseInfo(paymentId));
  }, []);

  useEffect(() => {
    if (purchaseInfo.userId) {
      dispatch(purchaseCompleted(purchaseInfo.userId, purchaseInfo.items))
      dispatch(getPurchaseInfo());
    }
  }, [purchaseInfo]);

  return (
    <div>PurchaseCompleted
      <p>Tu compra esta </p>
    </div>
  )
}

export default PurchaseCompleted
