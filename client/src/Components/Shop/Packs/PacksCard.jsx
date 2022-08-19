import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToShopCart } from '../../../redux/actions/shopCart'

import Swal from 'sweetalert2'
import { buyCardPack } from '../../../redux/actions/cardsPack'

const PacksCard = ({ pack, type }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)

  const inputQuantity = useRef(null)

  const decreaseQuantity = (e) => {
    e.preventDefault()
    setQuantity(state => state - 1)
  }

  const increaseQuantity = (e) => {
    e.preventDefault()
    setQuantity(state => state + 1)
  }

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value))
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    pack.quantity = quantity
    const info = {data: [{ ...pack }]}

    if (checkStock(quantity)) {
      return Swal.fire({
        title: 'Error!',
        text: 'No hay stock disponible =(',
        icon: 'error',
      });
    }
    dispatch(buyCardPack(info))
  }

  const checkStock = (totalQuantity) => {
    if (pack.stock && totalQuantity > pack.stock) {
      return true;
    }
    return false;
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    const quantity = Number(inputQuantity.current.value)

    if (!pack.quantity) pack.quantity = 0
    const totalQuantity = pack.quantity + quantity

    if (checkStock(totalQuantity)) {
      return Swal.fire({
        title: 'Error!',
        text: 'No hay stock disponible =(',
        icon: 'error',
      });
    }

    dispatch(addToShopCart(pack, quantity, type))
  }

  if (type === 'cardsPack') {
    return (
      <form name={pack.name} id={pack.id} onSubmit={handleAddItem} key={pack.id}>
        <h3>{pack.name}</h3>
        <p>{pack.price} Stars</p>
        <h4>{pack.race.length > 1 ? 'Razas' : 'Raza'}</h4>
        {pack.race.map(r => {
          return <p key={r}>{r}</p>
        })}
        <p>Stock: {pack.stock}</p>
        <button onClick={decreaseQuantity}>-</button>
        <input ref={inputQuantity} onChange={handleQuantityChange} type='number' min='1' value={quantity} />
        <button onClick={increaseQuantity}>+</button>
        <button onClick={handleBuyNow}>Comprar YA</button>
        <button>Añadir al carrito</button>
      </form>
    )
  }

  return (
    <form name={pack.name} id={pack.id} onSubmit={handleAddItem} key={pack.id}>
      <h3>{pack.name}</h3>
      <p>${pack.price}</p>
      <p>para: {pack.stars} stars!</p>
      <button onClick={decreaseQuantity}>-</button>
      <input ref={inputQuantity} onChange={handleQuantityChange} type='number' min='1' value={quantity} />
      <button onClick={increaseQuantity}>+</button>
      <button>Añadir al carrito</button>
    </form>
  )
}

export default PacksCard
