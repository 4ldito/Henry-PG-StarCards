import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { detailCard } from "../../redux/actions/cards/detailCard.js";
import { getOpinions } from "../../redux/actions/cards/getOpinions.js";

export default function Card({ id }) {
  const allCards = useSelector((state) => state.inventory.filteredCards);
  const card = allCards.find((c) => c.id === id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function detail() {
    dispatch(detailCard(id)); //dispach hay que hacer
    dispatch(getOpinions(id)); //dispach hay que hacer
    navigate("/detail");
  }
  return (
    <div onClick={() => detail(id)}>
      <h3>{card.name}</h3>
      <img src={card.image} alt={card.image} />
      <div>
        <p>cost:{card.cost}</p>
        <p>Gdmg:{card.Gdmg}</p>
        <p>Admg:{card.Admg}</p>
        <p>life:{card.life}</p>
        <p>ability:{card.ability}</p>
        <p>abilities:{card.abilities}</p>
        <p>race:{card.race}</p>
        <p>movement:{card.movement}</p>
      </div>
    </div>
  );
}
