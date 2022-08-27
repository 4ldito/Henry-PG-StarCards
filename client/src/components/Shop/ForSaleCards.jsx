import { useFetchUsersCardsForSale } from "../../hooks/useForSaleCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCard, clearForSaleCards } from "../../redux/actions/marketCards";

import Swal from 'sweetalert2';
import Card from './../Card/Card';

import style from './styles/ForSaleCards.module.css';

const ForSaleCards = () => {
  const dispatch = useDispatch();
  const { cardsInSale } = useFetchUsersCardsForSale();
  const user = useSelector(state => state.userReducer.user);

  const handleBuyCard = (e, userCard) => {
    e.preventDefault();

    if (!user.id) {
      return Swal.fire({
        title: "Error!",
        text: "Inicia sesion primero.",
        icon: "error",
      });
    }

    if (user.stars < userCard.price) {
      return Swal.fire({
        title: "Error!",
        text: "Stars insuficientes.",
        icon: "error",
      });
    }

    Swal.fire({
      title: `Confirmar`,
      text: `¿Estás seguro que queres comprar ${userCard.Card.name} a ${userCard.User.username} por ${userCard.price} stars?`,
      showCancelButton: true,
      confirmButtonText: "Comprar",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(buyCard(userCard.id, user.id));
      }
    });
  }

  useEffect(() => {
    return () => {
      dispatch(clearForSaleCards());
    };
  }, []);

  if (!cardsInSale.length) return <p>No se encontraron cartas a la venta</p>;

  return (
    <div className={style.container}>
      {cardsInSale.map((userCard) => {
        // console.log(userCard)
        return (
          <div className={style.saleContainer} key={userCard.id}>
            <p>Precio: {userCard.price} Stars</p>
            <p>Dueño: {userCard.User.username}</p>
            <Card
              key={userCard.Card.id}
              id={userCard.Card.id}
              name={userCard.Card.name}
              image={userCard.Card.image}
              cost={userCard.Card.cost}
              Gdmg={userCard.Card.Gdmg}
              Admg={userCard.Card.Admg}
              life={userCard.Card.life}
              ability={userCard.Card.ability}
              abilities={userCard.Card.abilities}
              race={userCard.Card.race}
              movement={userCard.Card.movement}
            />
            {user.id !== userCard.User.id
              ? <button onClick={(e) => handleBuyCard(e, userCard)} value={userCard.id}>Comprar</button>
              : <button>Quitar de en venta</button>
            }
          </div>
        );
      })}
    </div>
  );
};

export default ForSaleCards;
