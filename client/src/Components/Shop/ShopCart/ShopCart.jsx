/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyShopCart } from './../../../redux/actions/shopCart'

const ShopCart = () => {
  const dispatch = useDispatch()
  const shopCartItems = useSelector(state => state.shopCartReducer.shopCart)

  const handleBuyClick = (e) => {
    e.preventDefault()
    dispatch(buyShopCart(shopCartItems))
  }

  return (
    <div>ShopCart
      {shopCartItems.length > 0
        ? <div> {shopCartItems.map(item => {
          return <p key={item.id}>{item.name}</p>
        })}
          <button onClick={handleBuyClick}>Comprar</button>
        </div>

        : <p>El carrito esta vacio</p>}
    </div>
  )
}

export default ShopCart
