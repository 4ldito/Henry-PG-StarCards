import React from 'react'
import { useDispatch } from 'react-redux'
import { useFetchStarsPack } from '../../../hooks/useFetchStarsPack'
import { addToShopCartStarPack } from '../../../redux/actions/shopCart'
import { cardsPacks } from './cardsPackTest'
import PacksCard from './PacksCard'

const Packs = ({ type }) => {
  let pack
  if (type === 'starsPack') pack = useFetchStarsPack().starsPacks
  else pack = cardsPacks

  const dispatch = useDispatch()

  const handleAddItemStarsPack = (e) => {
    e.preventDefault()
    const target = e.target
    const quantity = target.childNodes[4].value
    const selectedPack = pack.find(p => p.id === Number(target.id))
    if (!selectedPack.quantity) selectedPack.quantity = 0
    dispatch(addToShopCartStarPack(selectedPack, quantity, type))
  }
  return (
    <>
      <h2 style={{ color: 'red' }}>Packs de Stars Disponibles:</h2>
      {pack.map((p) => {
        return (
          <PacksCard
            key={p.id}
            pack={p}
            handleAddItemStarsPack={handleAddItemStarsPack}
          />
        )
      })}
    </>
  )
}

export default Packs
