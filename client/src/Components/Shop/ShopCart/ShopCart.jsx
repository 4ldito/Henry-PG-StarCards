/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { useSelector } from 'react-redux'
import Mercadopago from '../Mercadopago/Mercadopago'

const ShopCart = () => {
  // const dispatch = useDispatch()
  const shopCartItems = useSelector(state => state.shopCartReducer.shopCart)

  return (
    <div>ShopCart
      {shopCartItems.length > 0
        ? <div> {shopCartItems.map(item => {
          return <p key={item.id}>{item.name}</p>
        })}
          <Mercadopago shopCartItems={shopCartItems} />
        </div>

        : <p>El carrito esta vacio</p>}
    </div>
  )
}

export default ShopCart
