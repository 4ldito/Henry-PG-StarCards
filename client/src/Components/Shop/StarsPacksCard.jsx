import React from 'react'

const StarsPacksCard = ({ handleAddItem, pack }) => {
  return (
    <form id={pack.id} onSubmit={handleAddItem} key={pack.id}>
      <h3>{pack.name}</h3>
      <p>${pack.price}</p>
      <p>para: {pack.stars} stars!</p>
      <button>Añadir al carrito</button>
    </form>
  )
}

export default StarsPacksCard
