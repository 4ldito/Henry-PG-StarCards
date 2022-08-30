import React from 'react'
import Mercadopago from './Mercadopago';

import style from '../styles/ShopCart.module.css';
import { useNavigate } from 'react-router-dom';

const StarsPack = ({ starsPack, totalStarsPack, user, seeBtn, preferenceId, increaseQuantity, decreaseQuantity, handleRemoveItem }) => {

    const navigate = useNavigate();

    return (
        <>
            {starsPack.length > 0 && (
                <div className={style.containerCart}>
                    <h2>Carrito de stars</h2>
                    <div className={style.cartInfoContainer}>
                        <div className={style.titleContainer}>
                            <p>Nombre</p>
                            <p>Precio</p>
                            <p>Cantidad</p>
                            <p>Subtotal</p>
                        </div>
                        {starsPack.map(item => {
                            totalStarsPack += item.price * item.quantity
                            return (
                                <div className={style.containerItem} key={item.id}>
                                    <p>{item.name}</p>
                                    <p>${item.price} ARS</p>

                                    <div className={style.containerQuantity}>
                                        <button onClick={(e) => decreaseQuantity(e, 'starsPack', item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={(e) => increaseQuantity(e, 'starsPack', item)}>+</button>
                                    </div>

                                    <p>${item.price * item.quantity} ARS</p>
                                    <button className={style.btnRemove} onClick={(e) => handleRemoveItem(e, 'starsPack')} id={item.id}>X</button>
                                </div>
                            )
                        })}
                        <p>Total: ${totalStarsPack} ARS</p>
                    </div>
                    {user?.id ?
                        seeBtn &&
                        <Mercadopago
                            preferenceId={preferenceId}
                            shopCartItems={starsPack} />
                        : <button onClick={() => { navigate("/login") }}>Logeate</button>}
                </div>)
            }
        </>
    )
}

export default StarsPack