import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putOpinions } from "../../redux/actions/cards/putOpinion";

export default function ModificarOpinion() {
  const dispatch = useDispatch();
  const detailCard = useSelector((state) => state.detailReducer.card);
  const user = useSelector((state) => state.userReducer);
  const [input, setInput] = useState({
    comment: "",
    score: 0,
    cardId: null,
    userId: 7,
  });

  function handleInput(e) {
    setInput({
      ...input,
      cardId: detailCard.id,
      userId: user.id,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  }

  function handleEdit(e) {
    e.preventDefault();
    dispatch(putOpinions(input));
  }

  return (
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
      <button onClick={(e) => handleEdit(e)}>Comment</button>
    </form>
  );
}
