import React from "react";
import useTransactionsUser from "../../hooks/useTransactionsUser";
import { capitalize, formatDate } from "../../utils/index";

import css from "./TransactionsUser.module.css";

const TransactionsUser = ({ userId }) => {
  const { transactionsUser } = useTransactionsUser(userId);
  return (
    <section className={css.containerTo}>
      <div className={css.container}>
        <h2>Transactions</h2>
        <div className={css.allInfoContainer}>
          <div className={css.infoContainer}>
            <p>Type</p>
            <p>Price (Stars)</p>
            <p>Price (ARS)</p>
            <p>Date</p>
          </div>
          <div className={css.allTransactionsContainer}>
            {transactionsUser.length ? (
              transactionsUser.map((transaction) => {
                return (
                  <div
                    className={css.infoTransactionContainer}
                    key={transaction.id}
                  >
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
                    <p>{formatDate(transaction.createdAt)}</p>
                  </div>
                );
              })
            ) : (
              <p>no transactions =(</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionsUser;
