import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllTransactions } from '../../redux/actions/transaction';
import { capitalize, formatDate } from '../../utils';

import style from './Transactions.module.css';

const Transactions = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactionsReducer.transactions);

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  if (!transactions.length) return <p>No hay transacciones =(..</p>

  return (
    <div className={style.container}>
      <h2>Transacciones</h2>
      <div className={style.allInfoContainer}>
        <div className={style.infoContainer}>
          <p>ID</p>
          <p>User ID</p>
          <p>Tipo</p>
          <p>Precio (Stars)</p>
          <p>Precio (Money)</p>
          <p>Payment ID</p>
          <p>Fecha</p>
        </div>
        <div className={style.allTransactionsContainer}>
          {transactions.map((transaction) => {
            return (
              <div className={style.infoTransactionContainer} key={transaction.id}>
                <p>{transaction.id}</p>
                <p>{transaction.UserId}</p>
                <p>{capitalize(transaction.type)}</p>
                <p>{transaction.type === 'stars' ? transaction.priceStars : "-"}</p>
                <p>{transaction.type === 'money' ? transaction.priceMoney : "-"}</p>
                <p>{transaction.type === 'money' ? transaction.paymentId : "-"}</p>
                <p>{formatDate(transaction.createdAt)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Transactions