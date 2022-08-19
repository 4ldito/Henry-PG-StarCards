import React, { useEffect } from 'react'
import { useFetchStarsPack } from '../../hooks/useFetchStarsPack'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromShopCart } from './../../redux/actions/shopCart'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import Packs from './Packs/Packs'
import { useFetchCardsPack } from './../../hooks/useFetchCardsPack';
import { cleanMsgInfo } from '../../redux/actions/cardsPack'

const Shop = () => {
  const dispatch = useDispatch()

  const loadedStarsPack = useFetchStarsPack().loaded
  const loadCardsPack = useFetchCardsPack().loaded
  const { starsPack, cardsPack } = useSelector(state => state.shopCartReducer.shopCart)

  const msgInfoPurchase = useSelector(state => state.cardsPacksReducer.msg)

  useEffect(() => {
    if (msgInfoPurchase.type) {
      Swal.fire({
        title: msgInfoPurchase.title,
        text: msgInfoPurchase.info,
        icon: msgInfoPurchase.type,
      })
    }
  }, [msgInfoPurchase]);

  useEffect(() => {
    return () => {
      dispatch(cleanMsgInfo())
    }
  }, []);

  const handleRemoveItem = (e, type) => {
    e.preventDefault()
    const target = Number(e.target.id)
    dispatch(removeFromShopCart(target, type))
  }

  if (!loadedStarsPack || !loadCardsPack) return (<p>Loading..</p>)

  return (
    <div>
      <Link to='/shopcart'>Ir al carrito</Link>
      <h2>Carrito: </h2>
      <h3>Carrito de Stars Packs</h3>
      {starsPack.map(item =>
        <div key={item.id}>
          <p>{item.name} cantidad: {item.quantity}</p>
          <button id={item.id} onClick={(e) => handleRemoveItem(e, 'starsPack')}>Eliminar del carrito</button>
        </div>
      )}
      <h3>Carrito de Cards Packs</h3>
      {cardsPack.map(item =>
        <div key={item.id}>
          <p>{item.name} cantidad: {item.quantity}</p>
          <button id={item.id} onClick={(e) => handleRemoveItem(e, 'cardsPack')}>Eliminar del carrito</button>
        </div>
      )}
      <Packs type='starsPack' />
      <Packs type='cardsPack' />
    </div>
  )
}

export default Shop
