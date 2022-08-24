import style from '../styles/ShopCart.module.css';

const CardsPack = ({ cardsPack, totalCardsPack, user, buyWithStars, handleRemoveItem, decreaseQuantity, increaseQuantity, handleBuyCardsPack }) => {
    return (
        <>
            {cardsPack.length > 0 && (
                <div className={style.containerCart}>
                    <h2>Carrito de packs cards</h2>
                    {cardsPack.map(item => {
                        const subtotal = item.price * item.quantity
                        totalCardsPack += subtotal
                        return (
                            <div className={style.containerItem} key={item.id}>
                                <p>{item.name}</p>
                                <p>{item.price} Stars</p>

                                <div className={style.containerQuantity}>
                                    <button onClick={(e) => decreaseQuantity(e, 'cardsPack', item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={(e) => increaseQuantity(e, 'cardsPack', item)}>+</button>
                                </div>

                                <p>{subtotal} Stars</p>
                                <button className={style.btnRemove} onClick={(e) => handleRemoveItem(e, 'cardsPack')} id={item.id}>X</button>
                            </div>
                        )
                    })}
                    <p>Total: {totalCardsPack} Stars</p>
                    {user?.id ? <button onClick={handleBuyCardsPack} disabled={!buyWithStars}>{buyWithStars ? "Comprar packs de cards" : "Tus Stars son insuficientes"}</button>
                        : <button onClick={() => { navigate("/login") }}>Logeate</button>}
                </div>)}
        </>
    )
}

export default CardsPack