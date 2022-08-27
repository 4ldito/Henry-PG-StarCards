import { useFetchStarsPack } from "../../hooks/useForSaleCards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearForSaleCards } from "../../redux/actions/marketCards";

import css from './styles/ForSaleCards.module.css'

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
    <div className={css.container}>
      {cardsInSale.map((card) => {
        console.log(card);
        return (
          <div key={card.id} className={css.card}>
            <h5>{card.Card.name}</h5>
            <img src={card.Card.image} alt={card.Card.name} className={css.img} />
            <h5>Sale {card.User.username}: {card.price} stars</h5>
          </div>
        );
      })}
    </div>
  );
};

export default ForSaleCards;
