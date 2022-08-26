import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailCard } from "../../redux/actions/cards/detailCard";
import {
  getOpinions,
  postOpinions,
  putOpinions,
} from "../../redux/actions/cards/opinion";
import { getUserCards } from "../../redux/actions/cards/userCards";

import css from "./DetailPopUp.module.css";

export default function DetailPopUp({ handleDetail }) {
  const dispatch = useDispatch();
  const detailCards = useSelector((state) => state.detailReducer.card);
  const opinion = useSelector((state) => state.detailReducer.opinion);
  const userCards = useSelector((state) => state.album.userCards);
  const cards = useSelector((state) => state.album.cards);
  const user = useSelector((state) => state.userReducer);
  const [viewEdit, setViewEdit] = useState(false);
  const [haveCard, setHaveCard] = useState(false);
  const [commented, setCommented] = useState(false);
  const [input, setInput] = useState({
    comment: "",
    score: 1,
    cardId: null,
    userId: 7,
  });

  useEffect(() => {
    opinion.forEach((o) => {
      if (o.UserId === user.id) {
        setCommented(true);
      }
    });
  }, [opinion, detailCards]);

  useEffect(() => {
    if (user?.id && !userCards.length) {
      dispatch(getUserCards(user.user.UserCards, cards));
    }
    return () => {
      dispatch(detailCard(null));
      dispatch(getOpinions(null));
    };
  }, []);

  // useEffect(() => {
  //   if (user.id) {
  //     // dispatch(getUserCards(user.user.UserCards, cards));
  //   }
  // }, [cards]);

  useEffect(() => {
    userCards.forEach((card) => {
      if (card.id === detailCards.id) {
        setHaveCard(true);
      }
    });
    console.log(detailCards)
  }, [detailCards]);

  function Validaciones(valores) {
    let errors = {};

    if (valores.comment.length > 100) {
      errors.comment = "El comentario no puede contener más de 100 caracteres";
    }

    if (valores.score > 5 || valores.score < 1) {
      errors.score = "El score no puede ser menor a 1, ni mayor a 5";
    }

    return errors;
  }

  function handleInput(e) {
    setInput({
      ...input,
      cardId: detailCards.id,
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
    const err = Validaciones(input);
    if (Object.keys(err).length === 0) {
      dispatch(postOpinions(input));
    } else {
      alert(
        "El score no puede ser menor a 1, ni mayor a 5. El Comentario no puede superar los 100 caracteres"
      );
    }
  }

  const handleSeeShopcart = (e) => {
    setViewEdit(!viewEdit);
  };

  function handleEdit(e) {
    e.preventDefault();
    const err = Validaciones(input);
    if (Object.keys(err).length === 0) {
      dispatch(putOpinions(input));
      setViewEdit(!viewEdit);
    } else {
      alert(
        "El score no puede ser menor a 1, ni mayor a 5. El Comentario no puede superar los 100 caracteres"
      );
    }
  }

  return (
    <div className={css.containerTo} onClick={handleDetail}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <div className={css.img}>
          <h3>{detailCards.name}</h3>
          <img src={detailCards.image} alt={detailCards.image} />
        </div>
        <div className={css.card}>
          <button onClick={handleDetail}>X</button>
          <div>
            <p>Cost: {detailCards.cost}</p>
            <p>Ground Damage: {detailCards.Gdmg}</p>
            <p>Air Damage: {detailCards.Admg}</p>
            <p>Life: {detailCards.life}</p>
            <p>Ability: {detailCards.ability}</p>
            <p>Race: {detailCards.race}</p>
            <p>Movement: {detailCards.movement}</p>
          </div>
          {rating ? <p>Rating: {rating.toFixed(1)}</p> : ""}
          <div className={css.opinion}>
            {opinion.length ? <p>Comments: </p> : ""}
            {opinion.map((opinion) => {
              return (
                <p key={opinion.id}>
                  {opinion.User.username}: {opinion.comment}
                </p>
              );
            })}
          </div>
          {user.id ? (
            haveCard ? (
              commented ? (
                viewEdit ? (
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
                      min="1"
                      max="5"
                      value={input.score}
                      onChange={(e) => handleInput(e)}
                    />
                    <button onClick={(e) => handleEdit(e)}>Comment</button>
                  </form>
                ) : (
                  <>
                    <h1>Ya comentaste</h1>
                    <button onClick={(e) => handleSeeShopcart(e)}>Edit</button>
                  </>
                )
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
                    min="1"
                    max="5"
                    value={input.score}
                    onChange={(e) => handleInput(e)}
                  />
                  <button onClick={(e) => handleComment(e)}>Comment</button>
                </form>
              )
            ) : (
              <h1>No tienes la carta</h1>
            )
          ) : (
            <h1>Inicia sesión para opinar</h1>
          )}
        </div>
      </div>
    </div>
  );
}
