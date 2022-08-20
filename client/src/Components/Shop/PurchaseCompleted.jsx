import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { getPurchaseInfo } from '../../redux/actions/shopCart';
import { useDispatch } from 'react-redux';

const PurchaseCompleted = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  dispatch(getPurchaseInfo(paymentId))
  return (
    <div>PurchaseCompleted
      <p>Tu compra esta </p>
    </div>
  )
}

export default PurchaseCompleted
