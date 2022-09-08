import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterTransactions } from "../../../redux/actions/transaction";

import style from "./TransactionsFilters.module.css";

const TransactionsFilters = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    userId: "",
    order: "none",
    type: "none",
    onlyToday: false,
  });

  const handleFilterChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setFilters({ ...filters, [key]: value });
  };

  const handleOnlyToday = (e) => {
    setFilters({ ...filters, onlyToday: !filters.onlyToday });
  };

  useEffect(() => {
    dispatch(filterTransactions(filters));
  }, [filters]);

  return (
    <>
      <h3>Filtros</h3>
      <div className={style.container}>
        <div>
          <label htmlFor="selectTransactionId">Transactions ID</label>
          <select
            onChange={handleFilterChange}
            name="order"
            id="selectTransactionId"
          >
            <option value="none">Unordered</option>
            <option value="transactionIdDES">Highest to Lowest</option>
            <option value="transactionIdASC">Lowest to Highest</option>
          </select>
        </div>

        <form onSubmit={(e) => e.preventDefault(e)}>
          <label htmlFor="userId">UserId</label>
          <input
            onChange={handleFilterChange}
            name="userId"
            type="text"
            id="userId"
          />
        </form>

        <div>
          <label htmlFor="type">Type</label>
          <select onChange={handleFilterChange} name="type" id="type">
            <option value="none">Not type</option>
            <option value="stars">Stars</option>
            <option value="money">Money</option>
          </select>
        </div>

        <div>
          <label htmlFor="priceStars">Price (Stars)</label>
          <select onChange={handleFilterChange} name="order" id="priceStars">
            <option value="none">Unordered</option>
            <option value="priceStarsDES">Highest to Lowest</option>
            <option value="priceStarsASC">Lowest to Highest</option>
          </select>
        </div>

        <div>
          <label htmlFor="priceARS">Price (ARS)</label>
          <select onChange={handleFilterChange} name="order" id="priceARS">
            <option value="none">Unordered</option>
            <option value="priceMoneyDES">Highest to Lowest</option>
            <option value="priceMoneyASC">Lowest to Highest</option>
          </select>
        </div>

        <div>
          <label htmlFor="onlyToday">Today's purchases only:</label>
          <input
            onChange={handleOnlyToday}
            type="checkbox"
            name="onlyToday"
            id="onlyToday"
          />
        </div>
      </div>
    </>
  );
};

export default TransactionsFilters;
