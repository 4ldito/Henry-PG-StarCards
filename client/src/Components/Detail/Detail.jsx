// <<<<<<< HEAD
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { postOpinions } from '../../redux/actions/cards/postOpinions.js'
// import { useNavigate } from 'react-router-dom';
// import css from './detail.module.css'
// export default function Detail () {
//     const navigate = useNavigate();
//     const dispatch = useDispatch()
//     const detailCard = useSelector(state => state.detailReducer.card)
//     const opinion= useSelector(state => state.detailReducer.opinion)
//     const cardId = detailCard.id
//     const [input, setInput] = useState({
//         comment:"",
//         score: 0,
//         cardId: 0,
//         userId: 7
//     })
    
//     console.log('opinion', opinion)
//     function handleInput (e) {
//         setInput({
//             ...input,
//             cardId: detailCard.id,
//             [e.target.name]: e.target.value
//         })
//     }
   
//     let ratingSum = opinion.map(r => r.score).reduce((prev, curr) => prev + curr, 0)
//     let rating = ratingSum / opinion.length
 
//     function handleComment(e) {
//         e.preventDefault()
//         dispatch(postOpinions(input))
// =======
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postOpinions } from "../../redux/actions/cards/postOpinions.js";
import { useNavigate } from 'react-router-dom';
import css from "./detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailCard = useSelector((state) => state.detailReducer.card);
  const opinion = useSelector((state) => state.detailReducer.opinion);
  const user = useSelector((state) => state.userReducer);
  const [commented, setCommented] = useState(false);
  const [input, setInput] = useState({
    comment: "",
    score: 0,
    cardId: null,
    userId: 7,
  });

  useEffect(() => {
    opinion.map((o) => {
      if (o.UserId === user.id && o.CardId === detailCard.id) {
        setCommented(true);
      }
    });
  }, [opinion]);

  function handleInput(e) {
    setInput({
      ...input,
      cardId: detailCard.id,
      userId: user.id,
      [e.target.name]: e.target.value,
    });
  }

  let ratingSum = opinion
    .map((r) => r.score)
    .reduce((prev, curr) => prev + curr, 0);
  let rating = ratingSum / opinion.length;

  function handleComment(e) {
    e.preventDefault();
    if (commented) {
      return alert("Ya comentaste");

    }
    dispatch(postOpinions(input));
  }

  return (
    <div className={css.all}>
      <div className={css.container}>
        <div className={css.img}>
          <h3>{detailCard.name}</h3>
          <img src={detailCard.image} alt={detailCard.image} />
        </div>
        <div className={css.card}>
          <div>
            <p>Cost: {detailCard.cost}</p>
            <p>Ground Damage: {detailCard.Gdmg}</p>
            <p>Air Damage: {detailCard.Admg}</p>
            <p>Life: {detailCard.life}</p>
            <p>Ability: {detailCard.ability}</p>
            <p>Race: {detailCard.race}</p>
            <p>Movement: {detailCard.movement}</p>
          </div>
          {rating ? <p>Rating: {rating.toFixed(1)}</p> : ""}
          <div className={css.opinion}>
            {opinion.length ? <p>Comments: </p> : ""}
            {opinion.map((opinion) => {
              return <p key={opinion.id}>{opinion.comment}</p>;
            })}
          </div>
          {user.id ? (
            commented ? (
              <h1>Ya comentaste</h1>
            ) : (
              <form>
                <label>Comment: </label>
                <input
                  type="text"
                  name="comment"
                  value={input.comment}
                  onChange={(e) => handleInput(e)}
                />
                <label>Score: </label>
                <input
                  type="number"
                  name="score"
                  value={input.score}
                  onChange={(e) => handleInput(e)}
                />
                <button onClick={(e) => handleComment(e)}>Comment</button>
              </form>
            )
          ) : (
            <h1>Inicia sesión para opinar</h1>
          )}
        </div>
      </div>
    </div>
  );
}
