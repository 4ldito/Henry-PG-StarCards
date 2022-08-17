import React from 'react'
import { useFetchStarsPack } from '../../hooks/useFetchStarsPack'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromShopCartStarPack } from './../../redux/actions/shopCart'
import { Link } from 'react-router-dom'

import Packs from './Packs/Packs'

const Shop = () => {
  const dispatch = useDispatch()

  const { loaded } = useFetchStarsPack()
  const { starsPack, cardsPack } = useSelector(state => state.shopCartReducer.shopCart)

  if (!loaded) return (<p>Loading..</p>)

  const handleRemoveItem = (e) => {
    e.preventDefault()
    const target = Number(e.target.id)
    dispatch(removeFromShopCartStarPack(target))
  }

  return (
    <div>
      <Link to='/shopcart'>Ir al carrito</Link>
      <h2>Carrito: </h2>
      <h3>Carrito de Stars Packs</h3>
      {starsPack.map(item =>
        <div key={item.id}>
          <p>{item.name} cantidad: {item.quantity}</p>
          <button id={item.id} onClick={handleRemoveItem}>Eliminar del carrito</button>
        </div>
      )}
      <h3>Carrito de Cards Packs</h3>
      {cardsPack.map(item =>
        <div key={item.id}>
          <p>{item.name} cantidad: {item.quantity}</p>
          <button id={item.id} onClick={handleRemoveItem}>Eliminar del carrito</button>
        </div>
      )}
      <Packs type='starsPack' />
      <Packs type='cardsPack' />
    </div>
  )
}

export default Shop
