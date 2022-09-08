import { useFetchUsersCardsForSale } from "../../hooks/useForSaleCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyCard,
  clearForSaleCards,
  clearMsgMarketCards,
} from "../../redux/actions/marketCards";
import { removeForSale } from "./../../redux/actions/marketCards";

import Swal from "sweetalert2";
import Card from "./../Card/Card";

import style from "./styles/ForSaleCards.module.css";

const ForSaleCards = () => {
  const dispatch = useDispatch();
  const { cardsInSale } = useFetchUsersCardsForSale();
  const user = useSelector((state) => state.userReducer.user);
  const msg = useSelector((state) => state.marketCardsReducer.msg);

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
  };

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
        dispatch(
          removeForSale({
            userId: user.id,
            userCardsIdsToUpdate: [userCard.id],
            status: "active",
            price: null,
          })
        );
      }
    });
  };

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

  if (!cardsInSale.length)
    return <div className={style.noCards}>There are no cards for sale</div>;

  return (
    <div className={style.container}>
      {cardsInSale.map((userCard) => {
        const cardCss =
          userCard.Card.race === "Zerg"
            ? style.zergCard
            : userCard.Card.race === "Terran"
            ? style.terranCard
            : style.protossCard;
        return (
          <div className={style.saleContainer} key={userCard.id}>
            <div className={style.Card}>
              <div className={`${cardCss} ${style.cardContainer}`}>
                <div className={style.nameContainer}>
                  <h3 className={style.name}>{userCard.Card.name}</h3>
                  <span className={style.cost}>{userCard.Card.cost}</span>
                </div>
                <img
                  className={style.img}
                  src={userCard.Card.image}
                  alt={userCard.Card.image}
                />
                <span className={style.movement}>{userCard.Card.movement}</span>
                <p className={style.ability}>{userCard.Card.ability}</p>
                <div className={style.stats}>
                  <span className={style.life}>{userCard.Card.life}</span>
                  <span className={style.dmg}>
                    {userCard.Card.Gdmg}/{userCard.Card.Admg}
                  </span>
                </div>
              </div>
            </div>

            <span className={style.price}>{userCard.price} stars</span>
            {user.id !== userCard.User.id ? (
              <button
                className={style.buyNow}
                onClick={(e) => handleBuyCard(e, userCard)}
                value={userCard.id}
              >
                BUY NOW
              </button>
            ) : (
              <button
                className={style.delete}
                onClick={(e) => handleRemoveForSale(e, userCard)}
              >
                Remove for sale
              </button>
            )}
            <center className={style.owner}>Owner: {userCard.User.username}</center>
          </div>
        );
      })}
    </div>
  );
};

export default ForSaleCards;
