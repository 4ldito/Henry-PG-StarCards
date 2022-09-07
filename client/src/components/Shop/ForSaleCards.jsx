import { useFetchUsersCardsForSale } from "../../hooks/useForSaleCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCard, clearForSaleCards, clearMsgMarketCards } from "../../redux/actions/marketCards";
import { removeForSale } from './../../redux/actions/marketCards';

import Swal from 'sweetalert2';
import Card from './../Card/Card';

import style from './styles/ForSaleCards.module.css';
import FiltersForSaleCards from "./FiltersForSaleCards";

const ForSaleCards = () => {
  const dispatch = useDispatch();
  const { cardsInSale } = useFetchUsersCardsForSale();
  const user = useSelector(state => state.userReducer.user);
  const msg = useSelector(state => state.marketCardsReducer.msg);

  const handleBuyCard = (e, userCard) => {
    e.preventDefault();
    if (!user.id) {
      return Swal.fire({
        title: "Error!",
        text: "You have to be logged to do buy.",
        icon: "error",
      });
    }
    if (user.stars < userCard.price) {
      return Swal.fire({
        title: "Error!",
        text: "You dont have enough stars!",
        icon: "error",
      });
    }
    Swal.fire({
      title: `Confirm`,
      text: `Are you sure you want to buy ${userCard.Card.name} from ${userCard.User.username} for ${userCard.price} stars?`,
      showCancelButton: true,
      confirmButtonText: "Buy",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(buyCard(userCard.id, user.id));
      }
    });
  }

  const handleRemoveForSale = (e, userCard) => {
    e.preventDefault();
    Swal.fire({
      title: `Confirm`,
      text: `Are you sure you want to remove ${userCard.Card.name} for ${userCard.price} Stars?`,
      showCancelButton: true,
      icon: "question",
      confirmButtonText: "Remove",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(removeForSale({ userId: user.id, userCardsIdsToUpdate: [userCard.id], status: 'active', price: null }));
      }
    });
  }

  useEffect(() => {
    if (msg.type) {
      dispatch(clearMsgMarketCards());
      Swal.fire({
        title: msg.title,
        text: msg.info,
        icon: msg.type,
      });
    }
  }, [msg]);

  useEffect(() => {
    return () => {
      dispatch(clearForSaleCards());
    };
  }, []);

  if (!cardsInSale.length) return <div className={style.noCards}>There are no cards for sale</div>;

  return (
    <>
      <FiltersForSaleCards />
      <div className={style.container}>
        {cardsInSale.map((userCard) => {
          // console.log(userCard)
          return (
            <div className={style.saleContainer} key={userCard.id}>
              <p>Price: {userCard.price} Stars</p>
              <p>Owner: {userCard.User.username}</p>
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
                ? <button onClick={(e) => handleBuyCard(e, userCard)} value={userCard.id}>Buy</button>
                : <button onClick={(e) => handleRemoveForSale(e, userCard)} >Remove for sale</button>
              }
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ForSaleCards;
