import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import Mercadopago from './Mercadopago'
import Swal from 'sweetalert2'
import { cleanPreferenceId, removeFromShopCart, shopcartBuyCardsPacks, shopCartCleanMsgInfo } from './../../../redux/actions/shopCart';
import style from '../../../styles/shopCart/shopCart.module.css'

const ShopCart = () => {
  const dispatch = useDispatch()

  const { starsPack, cardsPack } = useSelector(state => state.shopCartReducer.shopCart)
  const msgInfoPurchase = useSelector(state => state.shopCartReducer.msg)

  let totalStarsPack = 0
  let totalCardsPack = 0

  const handleBuyCardsPack = (e) => {
    e.preventDefault();
    const info = { data: [...cardsPack] }
    dispatch(shopcartBuyCardsPacks(info));
  }

  useEffect(() => {
    if (msgInfoPurchase.type) {
      Swal.fire({
        title: msgInfoPurchase.title,
        text: msgInfoPurchase.info,
        icon: msgInfoPurchase.type,
      })
    }
  }, [msgInfoPurchase]);

  const handleRemoveItem = (e, type) => {
    e.preventDefault()
    const target = Number(e.target.id)
    dispatch(removeFromShopCart(target, type))
  }

  useEffect(() => {
    return () => {
      dispatch(cleanPreferenceId());
      dispatch(shopCartCleanMsgInfo())
    }
  }, []);

  return (
    <div className={style.container}>ShopCart
      {starsPack.length > 0 || cardsPack.length > 0
        ? (
          <>
            {starsPack.length > 0 && (
              <div>
                <h2>Carrito de stars</h2>
                {starsPack.map(item => {
                  totalStarsPack += item.price * item.quantity
                  return (
                    <div key={item.id}>
                      <p>{item.name} Cantidad: {item.quantity} Subtotal: ARS ${item.price * item.quantity}</p>
                      <button onClick={(e) => handleRemoveItem(e, 'starsPack')} id={item.id}>X</button>
                    </div>
                  )
                })}
                <p>Total: ARS ${totalStarsPack}</p>
                <Mercadopago shopCartItems={starsPack} />
              </div>)}
            {cardsPack.length > 0 && (
              <div>
                <h2>Carrito de packs cards</h2>
                {cardsPack.map(item => {
                  const subtotal = item.price * item.quantity
                  totalCardsPack += subtotal
                  return (
                    <div key={item.id}>
                      <p>{item.name}</p>
                      <p>Precio: {item.price} Stars - Cantidad: {item.quantity} - Subtotal: {subtotal} Stars</p>
                      <button onClick={(e) => handleRemoveItem(e, 'cardsPack')} id={item.id}>X</button>
                    </div>
                  )
                })}
                <p>Total: {totalCardsPack} Stars</p>
                <button onClick={handleBuyCardsPack}>Comprar packs de cards</button>
              </div>)}
          </>)
        : <p>El carrito esta vacio</p>}
    </div>
  )
}

export default ShopCart
