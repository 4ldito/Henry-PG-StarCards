import React from 'react'
import { useSelector } from 'react-redux'
import Mercadopago from './Mercadopago'

const ShopCart = () => {
  const { starsPack, cardsPack } = useSelector(state => state.shopCartReducer.shopCart)
  let totalStarsPack = 0

  const handleBuyCardsPack = (e) => {
    e.preventDefault();
    console.log('s');
  }

  return (
    <div>ShopCart
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
                    </div>
                  )
                })}
                <p>Total: ARS ${totalStarsPack}</p>
                <Mercadopago shopCartItems={starsPack} />
              </div>)}
            {cardsPack.length && (
              <div>
                <h2>Carrito de packs cards</h2>
                {cardsPack.map(item => {
                  return (
                    <div key={item.id}>
                      <p>{item.name}</p>
                    </div>
                  )
                })}
                <button onClick={handleBuyCardsPack}>Comprar packs de cards</button>
              </div>)}
          </>)
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
