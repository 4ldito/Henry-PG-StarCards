import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToShopCart } from '../../../redux/actions/shopCart'

import Swal from 'sweetalert2'
import { buyCardPack } from '../../../redux/actions/cardsPack'

import style from '../styles/PacksCards.module.css'

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
    const info = { data: [{ ...pack }] }

    if (checkStock(quantity)) {
      return Swal.fire({
        title: 'Error!',
        text: 'No hay stock disponible =(',
        icon: 'error',
      });
    }

    Swal.fire({
      title: `Confrimar`,
      text: `¿Estás seguro que queres comprar ${pack.name} por ${pack.price} stars?`,
      showCancelButton: true,
      confirmButtonText: 'Comprar',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(buyCardPack(info));
      }
    })
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

    Swal.fire({
      title: `Carrito`,
      text: `Añadiste ${quantity} de ${pack.name} correctamente al carrito`,
      icon: 'success',
    })

    dispatch(addToShopCart(pack, quantity, type))
  }

  if (type === 'cardsPack') {
    return (
      <form className={style.container} name={pack.name} id={pack.id} onSubmit={handleAddItem} key={pack.id}>
        <h3>{pack.name}</h3>
        <p>Precio: <span className={style.starsText}>{pack.price} Stars</span></p>
        <h4>{pack.race.length > 1 ? 'Razas' : 'Raza'}</h4>
        <div className={style.containerRace}>
          <p className={style.race}>{pack.race.join(', ')}</p>
        </div>
        <p>Stock: <span className={style.stock}>{pack.stock}</span></p>
        <div className={style.containerQuantity}>
          <button onClick={decreaseQuantity}>-</button>
          <input ref={inputQuantity} onChange={handleQuantityChange} type='number' min='1' value={quantity} />
          <button onClick={increaseQuantity}>+</button>
        </div>
        <button onClick={handleBuyNow}>Comprar YA</button>
        <button>Añadir al carrito</button>
      </form>
    )
  }

  return (
    <form className={style.container} name={pack.name} id={pack.id} onSubmit={handleAddItem} key={pack.id}>
      <h3>{pack.name}</h3>
      <div className="infoBuy">
        <p>Precio: <span className={style.price}>${pack.price}</span></p>
        <p>Para: <span className={style.starsText}>{pack.stars} stars</span></p>
      </div>
      <div className={style.containerQuantity}>
        <button onClick={decreaseQuantity}>-</button>
        <input ref={inputQuantity} onChange={handleQuantityChange} type='number' min='1' value={quantity} />
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button>Añadir al carrito</button>
    </form>
  )
}

export default PacksCard
