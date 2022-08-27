import { useFetchStarsPack } from "../../hooks/useForSaleCards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearForSaleCards } from "../../redux/actions/marketCards";

const ForSaleCards = () => {
  const dispatch = useDispatch();
  const { cardsInSale } = useFetchStarsPack();

  useEffect(() => {
    return () => {
      dispatch(clearForSaleCards());
    };
  }, []);

  if (!cardsInSale.length) return <p>No se encontraron cartas a la venta</p>;

  return (
    <>
      {cardsInSale.map((card) => {
        // console.log(card)
        return (
          <div key={card.id}>
            <p>{card.id}</p>
          </div>
        );
      })}
    </>
  );
};

export default ForSaleCards;
