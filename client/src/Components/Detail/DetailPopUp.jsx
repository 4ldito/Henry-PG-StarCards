import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postOpinions } from "../../redux/actions/cards/postOpinions.js";
import { putOpinions } from "../../redux/actions/cards/putOpinion.js";

import css from "./DetailPopUp.module.css";

export default function DetailPopUp({ handleDetail }) {
  const dispatch = useDispatch();
  const detailCard = useSelector((state) => state.detailReducer.card);
  const opinion = useSelector((state) => state.detailReducer.opinion);
  const user = useSelector((state) => state.userReducer);
  const [viewEdit, setViewEdit] = useState(false);
  const [commented, setCommented] = useState(false);
  const [input, setInput] = useState({
    comment: "",
    score: 1,
    cardId: null,
    userId: 7,
  });

  useEffect(() => {
    opinion.forEach((o) => {
      if (o.UserId === user.id && o.CardId === detailCard.id) {
        setCommented(true);
      }
    });
  }, [opinion, detailCard]);

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
    <div className={css.containerTo}>
      <div className={css.all}>
        <div className={css.container}>
          <div className={css.img}>
            <h3>{detailCard.name}</h3>
            <img src={detailCard.image} alt={detailCard.image} />
          </div>
          <div className={css.card}>
            <button onClick={handleDetail}>X</button>
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
                return (
                  <p key={opinion.id}>
                    {opinion.id}: {opinion.comment}
                  </p>
                );
              })}
            </div>
            {user.id ? (
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
              <h1>Inicia sesión para opinar</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
