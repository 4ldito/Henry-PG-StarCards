import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getOpinions,
  postOpinions,
  putOpinions,
} from "../../redux/actions/cards/opinion";

import css from "./DetailPopUp.module.css";
import { MdStar, MdStarOutline } from "react-icons/md";

export default function DetailPopUp({
  handleDetail,
  id,
  name,
  image,
  cost,
  Gdmg,
  Admg,
  life,
  ability,
  abilities,
  race,
  movement,
}) {
  const dispatch = useDispatch();
  const opinion = useSelector((state) => state.detailReducer.opinion);
  const user = useSelector((state) => state.userReducer.user);
  const [viewEdit, setViewEdit] = useState(false);
  const [haveCard, setHaveCard] = useState(false);
  const [commented, setCommented] = useState(false);
  const [input, setInput] = useState({
    comment: "",
    score: 1,
    cardId: id,
    userId: user.id,
  });

  useEffect(() => {
    opinion.forEach((o) => {
      if (o.UserId === user.id) {
        setCommented(true);
      }
    });
  }, [opinion]);

  useEffect(() => {
    if (user.id) {
      const card = user.UserCards.find((userCard) => userCard.CardId === id);
      if (card) setHaveCard(true);
    }
    return () => {
      dispatch(getOpinions(null));
    };
  }, []);

  const decreaseScore = (e) => {
    e.preventDefault();
    if (input.score - 1 <= 0) return;
    setInput({ ...input, score: input.score - 1 });
  };

  const increaseScore = (e) => {
    e.preventDefault();
    if (input.score + 1 > 5) return;
    setInput({ ...input, score: input.score + 1 });
  };

  function validations(values) {
    let errors = {};

    if (values.comment.length > 100) {
      errors.comment = "The comment cannot contain more than 100 characters";
    }

    if (values.score > 5 || values.score < 1) {
      errors.score = "The score cannot be less than 1, nor more than 5";
    }

    return errors;
  }

  function handleInput(e) {
    setInput({
      ...input,
      cardId: id,
      userId: user.id,
      [e.target.name]: e.target.value,
    });
  }

  function ratingStars() {
    let stars = [];
    let ratingSum = opinion
      .map((r) => r.score)
      .reduce((prev, curr) => prev + curr, 0);
    let rating = Math.round(ratingSum / opinion.length) || 0;

    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i}>
          <MdStar />
        </span>
      );
    }

    for (let i = 5; i > rating; i--) {
      stars.push(
        <span key={i}>
          <MdStarOutline />
        </span>
      );
    }

    return stars;
  }

  function handleComment(e) {
    e.preventDefault();
    const err = validations(input);
    if (Object.keys(err).length === 0) {
      dispatch(postOpinions(input));
    } else {
      alert(
        "The score cannot be less than 1, nor greater than 5. The Comment cannot exceed 100 characters"
      );
    }
  }

  const handleSeeShopcart = (e) => {
    setViewEdit(!viewEdit);
  };

  function handleEdit(e) {
    e.preventDefault();
    const err = validations(input);
    if (Object.keys(err).length === 0) {
      dispatch(putOpinions(input));
      setViewEdit(!viewEdit);
    } else {
      alert(
        "The score cannot be less than 1, nor greater than 5. The Comment cannot exceed 100 characters"
      );
    }
  }

  const cardCss =
    race === "Zerg"
      ? css.zergCard
      : race === "Terran"
      ? css.terranCard
      : css.protossCard;

  return (
    <div className={css.containerTo} onClick={handleDetail}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <span className={css.titleDetail}>CARD</span>

        <div className={css.Card}>
          <div className={`${cardCss} ${css.cardContainer}`}>
            <div className={css.nameContainer}>
              <h3 className={css.name}>{name}</h3>
              <span className={css.cost}>{cost}</span>
            </div>
            <img className={css.img} src={image} alt={image} />
            <span className={css.movement}>{movement}</span>
            <p className={css.ability}>{ability}</p>
            <div className={css.stats}>
              <span className={css.life}>{life}</span>
              <span className={css.dmg}>
                {Gdmg}/{Admg}
              </span>
            </div>
          </div>
        </div>

        <div className={css.card}>
          {ratingStars() ? (
            <span className={css.rating}>RATING {ratingStars()}</span>
          ) : (
            <span className={css.rating}>RATING ?????</span>
          )}

          <div className={css.opinion}>
            <span className={css.titleComment}>COMMENTS</span>
            <div className={css.comments}>
              {opinion.map((opinion, index) => {
                return (
                  <section key={index}>
                    <p className={css.username}>{opinion.User.username} :</p>
                    <span>{opinion.comment}</span>
                  </section>
                );
              })}
            </div>
          </div>
          {user.id &&
            (haveCard ? (
              commented ? (
                viewEdit ? (
                  <section>
                    <input
                      type="text"
                      name="comment"
                      className={css.addComment}
                      value={input.comment}
                      placeholder="Add comment"
                      onChange={(e) => handleInput(e)}
                    />
                    <section className={css.commentDown}>
                      <div className={css.containerQuantity}>
                        <button
                          className={css.btnMinus}
                          onClick={decreaseScore}
                        />
                        <span>{input.score}</span>
                        <button
                          className={css.btnMore}
                          onClick={increaseScore}
                        />
                      </div>
                      <button
                        className={css.commentButton}
                        onClick={(e) => handleEdit(e)}
                      >
                        Add review
                      </button>
                    </section>
                  </section>
                ) : (
                  <section className={css.sectionEditComment}>
                    <button
                      className={css.editComment}
                      onClick={(e) => handleSeeShopcart(e)}
                    >
                      Edit review
                    </button>
                  </section>
                )
              ) : (
                <section>
                  <input
                    type="text"
                    name="comment"
                    className={css.addComment}
                    value={input.comment}
                    placeholder="Add comment"
                    onChange={(e) => handleInput(e)}
                  />
                  <section className={css.commentDown}>
                    <div className={css.containerQuantity}>
                      <button
                        className={css.btnMinus}
                        onClick={decreaseScore}
                      />
                      <span>{input.score}</span>
                      <button className={css.btnMore} onClick={increaseScore} />
                    </div>
                    <button
                      className={css.commentButton}
                      onClick={(e) => handleComment(e)}
                    >
                      Add review
                    </button>
                  </section>
                </section>
              )
            ) : (
              <h1>you don't have the card</h1>
            ))}
        </div>
      </div>
    </div>
  );
}
