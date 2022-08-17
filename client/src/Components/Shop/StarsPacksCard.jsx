import React, { useState } from 'react'

const StarsPacksCard = ({ handleAddItem, pack }) => {
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = (e) => {
    e.preventDefault()
    setQuantity(state => state - 1)
  }

  const increaseQuantity = (e) => {
    e.preventDefault()
    setQuantity(state => state + 1)
  }

  const handleQuantityChange = (e) => {
  }

  return (
    <form name={pack.name} id={pack.id} onSubmit={handleAddItem} key={pack.id}>
      <h3>{pack.name}</h3>
      <p>${pack.price}</p>
      <p>para: {pack.stars} stars!</p>
      <button onClick={decreaseQuantity}>-</button>
      <input onChange={handleQuantityChange} id={pack.name} type='number' min='1' value={quantity} name={`${pack.name}-quantity`} />
      <button onClick={increaseQuantity}>+</button>
      <button>Añadir al carrito</button>
    </form>
  )
}

export default StarsPacksCard
