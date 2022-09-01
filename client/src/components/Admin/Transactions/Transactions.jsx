import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllTransactions } from '../../../redux/actions/transaction';
import { capitalize, formatDate } from '../../../utils';

import style from './Transactions.module.css';
import TransactionsFilters from './TransactionsFilters';

const Transactions = () => {
  const dispatch = useDispatch();

  const filteredTransactions = useSelector((state) => state.transactionsReducer.filteredTransactions);

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  if (!filteredTransactions.length) return <p>No hay transacciones =(..</p>

  return (
    <div className={style.container}>
      <h2>Transacciones</h2>
      <TransactionsFilters />
      <div className={style.allInfoContainer}>
        <div className={style.infoContainer}>
          <p>ID</p>
          <p>User ID</p>
          <p>Tipo</p>
          <p>Precio (Stars)</p>
          <p>Precio (ARS)</p>
          <p>Payment ID</p>
          <p>Fecha</p>
        </div>
        <div className={style.allTransactionsContainer}>
          {filteredTransactions.map((transaction) => {
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