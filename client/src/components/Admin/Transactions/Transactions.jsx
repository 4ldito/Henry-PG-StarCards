import React, { useEffect } from 'react'
import { capitalize, formatDate } from '../../../utils';

import style from './Transactions.module.css';
import TransactionsFilters from './TransactionsFilters';
import useFetchTransactions from './../../../hooks/useFetchTransactions';

const Transactions = () => {
  const { filteredTransactions } = useFetchTransactions();
  
  // useEffect(() => {
  //   console.log('filteredTransactions cambio', filteredTransactions)
  // }, [filteredTransactions]);

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
          {filteredTransactions.length ? 
          filteredTransactions.map((transaction) => {
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
          }) : <p>No hay transacciones =(</p>}
        </div>
      </div>
    </div>
  )
}

export default Transactions