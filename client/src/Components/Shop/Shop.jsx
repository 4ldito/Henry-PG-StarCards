import React from 'react'
import StarsPacksCard from './StarsPacksCard'
import { useFetchStarsPack } from '../../hooks/useFetchStarsPack'
import { useSelector, useDispatch } from 'react-redux'
import { addToShopCart } from './../../redux/actions/shopCart'
import { Link } from 'react-router-dom'

const Shop = () => {
  const { starsPacks, loaded } = useFetchStarsPack()
  const shopCartItems = useSelector(state => state.shopCartReducer.shopCart)
  const dispatch = useDispatch()

  if (!loaded) return (<p>Loading..</p>)

  const handleAddItem = (e) => {
    e.preventDefault()
    const target = Number(e.target.id)
    const selectedPack = starsPacks.find(pack => pack.id === target)
    if (!selectedPack.quantity) selectedPack.quantity = 1
    // console.log(selectedPack)
    dispatch(addToShopCart(selectedPack))
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
      {shopCartItems.map(item => <p key={item.id}>{item.name} cantidad: {item.quantity}</p>)}
    </div>
  )
}

export default Shop