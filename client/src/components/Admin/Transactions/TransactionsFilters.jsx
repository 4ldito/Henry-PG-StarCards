import React, { useEffect, useState } from 'react'

import style from './TransactionsFilters.module.css';

const TransactionsFilters = () => {

    const [filters, setFilters] = useState({
        userId: '',
        order: 'none',
        type: 'none',
        onlyToday: false
    });

    const handleFilterChange = (e) => {
        const key = e.target.name;
        const value = e.target.value
        setFilters({ ...filters, [key]: value });
    }

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <>
            <h3>Filtros</h3>
            <div className={style.container}>
                <form onSubmit={e => e.preventDefault(e)}>
                    <label htmlFor="userId">UserId</label>
                    <input onChange={handleFilterChange} name="userId" type="text" id="userId" />
                </form>

                <div>
                    <label htmlFor="selectTransactionId">Transacción ID</label>
                    <select onChange={handleFilterChange} name="order" id="selectTransactionId">
                        <option value="none">Sin orden</option>
                        <option value="transactionIdDES">Mayor a menor</option>
                        <option value="transactionIdASC">Menor a mayor</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="type">Tipo</label>
                    <select onChange={handleFilterChange} id="type">
                        <option value="none">Sin orden</option>
                        <option value="stars">Stars</option>
                        <option value="money">Money</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="priceStars">Precio (Stars)</label>
                    <select onChange={handleFilterChange} name="order" id="priceStars">
                        <option value="none">Sin orden</option>
                        <option value="priceStarsDES">Mayor a menor</option>
                        <option value="priceStarsASC">Menor a mayor</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="priceARS">Precio (ARS)</label>
                    <select onChange={handleFilterChange} name="order" id="priceARS">
                        <option value="none">Sin orden</option>
                        <option value="priceMoneyDES">Mayor a menor</option>
                        <option value="priceMoneyASC">Menor a mayor</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="onlyToday">Solo compras de hoy:</label>
                    <input onChange={handleFilterChange} type="checkbox" name="onlyToday" id="onlyToday" />
                </div>
            </div>
        </>
    )
}

export default TransactionsFilters