import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSaleCard } from "../../../../redux/actions/cards/userCards";
import Swal from "sweetalert2";
import css from "./SaleCard.module.css";

export default function SaleCard({ handleViewCard, card }) {
  console.log('esta',card)
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  // const [currentUserCards, setCurrentUserCards] = useState(null);

  const [sale, setSale] = useState({ quantity: 0, price: 0 });

  function handleChange(e) {
    setSale({ ...sale, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (sale.quantity > card.userCards.length) setSale({ ...sale, quantity: card.userCards.length });
    if (sale.price < 0) setSale({ ...sale, price: 0 });
  }, [sale]);

  const dontAllowLeters = (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  }

  function handleSubmit(e, status) {
    e.preventDefault();
    if (!sale.quantity || sale.price <= 0) {
      console.log('entra?');
      return Swal.fire({
        title: 'Error!',
        text: 'You have to put a quantity and a price',
        icon: 'error',
      });
    }

    const userCardsIdsToUpdate = [];

    for (let i = 0; i < sale.quantity; i++) {
      userCardsIdsToUpdate.push(card.userCards[i].id);
    }
    dispatch(handleSaleCard({ userId: user.id, userCardsIdsToUpdate, status, price: sale.price }));
  }
  
  const cardCss =
  card.race === "Zerg"
    ? css.zergCard
    : card.race === "Terran"
    ? css.terranCard
    : css.protossCard;

  return (
    <div className={css.SaleCard} onClick={handleViewCard}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        {/* <h1>{card.name}</h1>
        <img src={card.image} alt="" /> */}
        <div className={css.Card}>
          <div className={`${cardCss} ${css.cardContainer}`}>
            <div className={css.nameContainer}>
              <h3 className={css.name}>{card.name}</h3>
              <span className={css.cost}>{card.cost}</span>
            </div>
            <img className={css.img} src={card.image} alt={card.image} />
            <span className={css.movement}>{card.movement}</span>
            <p className={css.ability}>{card.ability}</p>
            <div className={css.stats}>
              <span className={css.life}>{card.life}</span>
              <span className={css.dmg}>
                {card.Gdmg}/{card.Admg}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e, 'onSale')}>
          <div className="">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" name="quantity" id="quantity" min="1" max={card?.userCards?.length} onKeyPress={dontAllowLeters} value={sale.quantity} placeholder="quantity" onChange={handleChange} />
          </div>
          <div className="">
            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" min="0" value={sale.price} placeholder="Price" onKeyPress={dontAllowLeters} onChange={handleChange} />
          </div>
          <input type="submit" value="Sell" />
        </form>
      </div>
    </div>
  );
}
