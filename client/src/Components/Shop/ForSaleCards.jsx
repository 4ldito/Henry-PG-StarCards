import { useFetchStarsPack } from '../../hooks/useForSaleCards';

const ForSaleCards = () => {
    const { cardsInSale } = useFetchStarsPack();

    if (!cardsInSale.length) return <p>No se encontraron cartas a la venta</p>

    return (
        <>
            {
                cardsInSale.map((card) => {
                    console.log(card)
                    return (
                        <div key={card.id}>
                            <p>{card.id}</p>
                        </div>)
                })
            }
        </>
    )
}

export default ForSaleCards