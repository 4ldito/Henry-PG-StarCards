import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import Mercadopago from './Mercadopago';
import Swal from 'sweetalert2';

import { cleanPreferenceId, modifiyQuantity, removeFromShopCart, shopcartBuyCardsPacks, shopCartCleanMsgInfo } from './../../../redux/actions/shopCart';

import style from '../styles/ShopCart.module.css';
import { usePreferenceId } from '../../../hooks/usePreferenceId';

let intervalMercadopago = null;

const ShopCart = ({ handleSeeShopcart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { starsPack, cardsPack } = useSelector(state => state.shopCartReducer.shopCart);
  const msgInfoPurchase = useSelector(state => state.shopCartReducer.msg);
  const user = useSelector(state => state.userReducer.user);
  const { preferenceId } = usePreferenceId(starsPack);

  const [seeBtn, setSeeBtn] = useState(true);

  let totalStarsPack = 0;
  let totalCardsPack = 0;

  const handleBuyCardsPack = (e) => {
    e.preventDefault();
    const info = { data: [...cardsPack] }
    dispatch(shopcartBuyCardsPacks(info, user.id));
  }

  useEffect(() => {
    if (msgInfoPurchase.type) {
      dispatch(shopCartCleanMsgInfo())
      Swal.fire({
        title: msgInfoPurchase.title,
        text: msgInfoPurchase.info,
        icon: msgInfoPurchase.type,
      })
    }
  }, [msgInfoPurchase]);

  const handleRemoveItem = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    const target = Number(e.target.id)
    dispatch(removeFromShopCart(target, type, user.id))
  }

  const buyWithStars = useMemo(() => {
    return user?.stars >= totalCardsPack;
  }, [user?.stars]);

  const decreaseQuantity = (e, type, item) => {
    e.preventDefault();
    if (item.quantity === 1) {
      return Swal.fire({
        title: 'Error!',
        text: 'No podes bajar la cantidad a 0.',
        icon: 'error',
      })
    }

    dispatch(modifiyQuantity({ id: item.id, type, modifyType: 'decrement' }));

    setSeeBtn(false)
    if (intervalMercadopago) clearTimeout(intervalMercadopago);
    intervalMercadopago = setTimeout(() => { setSeeBtn(true); dispatch(cleanPreferenceId()); }, 1000)
  };

  const increaseQuantity = (e, type, item) => {
    e.preventDefault();
    if (item.quantity === item.stock) {
      return Swal.fire({
        title: 'Error!',
        text: 'No hay stock disponible.',
        icon: 'error',
      })
    }
    dispatch(modifiyQuantity({ id: item.id, type, modifyType: 'increment' }));

    setSeeBtn(false)
    if (intervalMercadopago) clearTimeout(intervalMercadopago);
    intervalMercadopago = setTimeout(() => { setSeeBtn(true); dispatch(cleanPreferenceId()); }, 1000);
  };

  return (
    <div onClick={(e) => preferenceId !== -1 || !user?.id || (!starsPack.length && !cardsPack.length) || (!starsPack.length && cardsPack.length) ? handleSeeShopcart(e) : ""} className={style.background}>
      <div className={style.container}>
        <div onClick={e => e.stopPropagation()} className={style.infoContainer}>
          <h2>Carrito</h2>
          {starsPack.length > 0 || cardsPack.length > 0
            ? (
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
                    {user?.id ? seeBtn && <Mercadopago preferenceId={preferenceId} shopCartItems={starsPack} /> : <button onClick={() => { navigate("/login") }}>Logeate</button>}
                  </div>)}
                {cardsPack.length > 0 && (
                  <div className={style.containerCart}>
                    <h2>Carrito de packs cards</h2>
                    {cardsPack.map(item => {
                      const subtotal = item.price * item.quantity
                      totalCardsPack += subtotal
                      return (
                        <div className={style.containerItem} key={item.id}>
                          <p>{item.name}</p>
                          <p>{item.price} Stars</p>

                          <div className={style.containerQuantity}>
                            <button onClick={(e) => decreaseQuantity(e, 'cardsPack', item)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={(e) => increaseQuantity(e, 'cardsPack', item)}>+</button>
                          </div>

                          <p>{subtotal} Stars</p>
                          <button className={style.btnRemove} onClick={(e) => handleRemoveItem(e, 'cardsPack')} id={item.id}>X</button>
                        </div>
                      )
                    })}
                    <p>Total: {totalCardsPack} Stars</p>
                    {user?.id ? <button onClick={handleBuyCardsPack} disabled={!buyWithStars}>{buyWithStars ? "Comprar packs de cards" : "Tus Stars son insuficientes"}</button>
                      : <button onClick={() => { navigate("/login") }}>Logeate</button>}
                  </div>)}
              </>)
            : <p>El carrito esta vacio</p>}
        </div>
      </div>
    </div>
  )
}

export default ShopCart
