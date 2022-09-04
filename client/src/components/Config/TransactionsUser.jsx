import React from 'react'
import useTransactionsUser from '../../hooks/useTransactionsUser';
import { capitalize, formatDate } from '../../utils/index';

import style from './TransactionsUser.module.css';

const TransactionsUser = ({ userId }) => {
    const { transactionsUser } = useTransactionsUser(userId);
    return (
        <div className={style.container}>
            <h2>Transacciones</h2>
            <div className={style.allInfoContainer}>
                <div className={style.infoContainer}>
                    <p>Tipo</p>
                    <p>Precio (Stars)</p>
                    <p>Precio (ARS)</p>
                    <p>Fecha</p>
                </div>
                <div className={style.allTransactionsContainer}>
                    {transactionsUser.length ?
                        transactionsUser.map((transaction) => {
                            return (
                                <div className={style.infoTransactionContainer} key={transaction.id}>
                                    <p>{capitalize(transaction.type)}</p>
                                    <p>{transaction.type === 'stars' ? transaction.priceStars : "-"}</p>
                                    <p>{transaction.type === 'money' ? transaction.priceMoney : "-"}</p>
                                    <p>{formatDate(transaction.createdAt)}</p>
                                </div>
                            )
                        }) : <p>No hay transacciones =(</p>}
                </div>
            </div>
        </div>
    )
}

export default TransactionsUser