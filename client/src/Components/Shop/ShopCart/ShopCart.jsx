/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { useSelector } from 'react-redux'
import Mercadopago from '../Mercadopago/Mercadopago'

const ShopCart = () => {
  // const dispatch = useDispatch()
  const shopCartItems = useSelector(state => state.shopCartReducer.shopCart)
  let total = 0
  return (
    <div>ShopCart
      {shopCartItems.length > 0
        ? <div> {shopCartItems.map(item => {
          total += item.price * item.quantity
          return (
            <div key={item.id}>
              <p>{item.name} Cantidad: {item.quantity} Subtotal: ARS ${item.price * item.quantity}</p>
            </div>
          )
        })}
          <p>Total: ARS ${total}</p>
          <Mercadopago shopCartItems={shopCartItems} />
        </div>

        : <p>El carrito esta vacio</p>}
    </div>
  )
}

// { shopCartItems.map(item =>
//   <div key={item.id}>
//     <p>{item.name} cantidad: {item.quantity}</p>
//     <button id={item.id} onClick={handleRemoveItem}>Eliminar del carrito</button>
//   </div>
// ) }

export default ShopCart
