import React, { useEffect } from "react";
import { capitalize, formatDate } from "../../../utils";

import style from "./Transactions.module.css";
import TransactionsFilters from "./TransactionsFilters";
import useFetchTransactions from "./../../../hooks/useFetchTransactions";

const Transactions = () => {
  const { filteredTransactions } = useFetchTransactions();

  return (
    <div className={style.container}>
      <h2>Transactions</h2>
      <TransactionsFilters />
      <div className={style.allInfoContainer}>
        <div className={style.infoContainer}>
          <p>ID</p>
          <p>User ID</p>
          <p>Type</p>
          <p>Price (Stars)</p>
          <p>Price (ARS)</p>
          <p>Payment ID</p>
          <p>Date</p>
        </div>
        <div className={style.allTransactionsContainer}>
          {filteredTransactions.length ? (
            filteredTransactions.map((transaction) => {
              return (
                <div
                  className={style.infoTransactionContainer}
                  key={transaction.id}
                >
                  <p>{transaction.id}</p>
                  <p>{transaction.UserId}</p>
                  <p>{capitalize(transaction.type)}</p>
                  <p>
                    {transaction.type === "stars"
                      ? transaction.priceStars
                      : "-"}
                  </p>
                  <p>
                    {transaction.type === "money"
                      ? transaction.priceMoney
                      : "-"}
                  </p>
                  <p>
                    {transaction.type === "money" ? transaction.paymentId : "-"}
                  </p>
                  <p>{formatDate(transaction.createdAt)}</p>
                </div>
              );
            })
          ) : (
            <p>no transactions =( </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
