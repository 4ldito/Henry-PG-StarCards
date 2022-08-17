import React from 'react'
import StarsPacksCard from './StarsPacksCard'
import { useFetchStarsPack } from '../../hooks/useFetchStarsPack'
import { useSelector, useDispatch } from 'react-redux'
import { addToShopCart, removeFromShopCart } from './../../redux/actions/shopCart'
import { Link } from 'react-router-dom'

const Shop = () => {
  const { starsPacks, loaded } = useFetchStarsPack()
  const shopCartItems = useSelector(state => state.shopCartReducer.shopCart)
  const dispatch = useDispatch()

  if (!loaded) return (<p>Loading..</p>)

  const handleAddItem = (e) => {
    e.preventDefault()
    const target = e.target
    const quantity = target.childNodes[4].value
    const selectedPack = starsPacks.find(pack => pack.id === Number(target.id))
    if (!selectedPack.quantity) selectedPack.quantity = 0
    dispatch(addToShopCart(selectedPack, quantity))
  }

  const handleRemoveItem = (e) => {
    e.preventDefault()
    const target = Number(e.target.id)
    console.log('se va a eliminar', target)
    dispatch(removeFromShopCart(target))
  }

  return (
    <div>
      <Link to='/shopcart'>Ir al carrito</Link>
      <h2>Packs Disponibles:</h2>
      {starsPacks.map((pack) => {
        return (
          <StarsPacksCard
            key={pack.id}
            pack={pack}
            handleAddItem={handleAddItem}
          />
        )
      })}
      <h3>Carrito: </h3>
      {shopCartItems.map(item =>
        <div key={item.id}>
          <p>{item.name} cantidad: {item.quantity}</p>
          <button id={item.id} onClick={handleRemoveItem}>Eliminar del carrito</button>
        </div>
      )}
    </div>
  )
}

export default Shop
