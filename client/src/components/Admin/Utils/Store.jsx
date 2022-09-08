import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCardsPacks,
  modifyCardPacks,
} from "../../../redux/actions/cardsPack";
import {
  getStarsPacks,
  modifyStarsPack,
} from "../../../redux/actions/starsPacks";
import style from "./Store.module.css";
function Store() {
  const dispatch = useDispatch();
  const cardPacks = useSelector((state) => state.cardsPacksReducer.cardsPacks);
  const starPacks = useSelector((state) => state.starsPackReducer.starsPacks);
  const [state, setState] = useState({
    stock: "",
  });

  useEffect(() => {
    dispatch(getAllCardsPacks());
    dispatch(getStarsPacks());
  }, []);

  function handleStatus(e, status) {
    const id = e.target.id;
    const pack = e.target.value;

    let statusId = status === "active" ? "inactive" : "active";
    pack === "cards"
      ? dispatch(modifyCardPacks(id, { StatusId: statusId }))
      : dispatch(modifyStarsPack(id, { StatusId: statusId }));

    console.log(cardPacks);
  }

  function modifyStock(e, id) {
    e.preventDefault();
    dispatch(modifyCardPacks(id, { stock: state.stock }));
  }

  function inputStock(e) {
    setState({
      ...state,
      stock: e.target.value,
    });
  }
  return (
    <>
      <div>
        <div className={style.container}>
          {
            <ul>
              <h2>CardPacks</h2>
              {cardPacks.map((c) => (
                <li key={c.id}>
                  <label> Name: {c.name}</label>
                  <label> Price: {c.price}</label>
                  <label>
                    {" "}
                    Status:
                    {c.StatusId}
                    <input
                      id={c.id}
                      value="cards"
                      type="checkbox"
                      checked={c.StatusId === "active" ? true : false}
                      onChange={(e) => handleStatus(e, c.StatusId)}
                    />
                  </label>
                  <label> Stock: {c.stock}</label>
                  <form onSubmit={(e) => modifyStock(e, c.id)}>
                    <input
                      type="number"
                      placeholder="Input new Stock..."
                      onChange={(e) => inputStock(e)}
                      min="0"
                    />
                    <button type="submit">Modify</button>
                  </form>
                </li>
              ))}
            </ul>
          }
        </div>
        <div className={style.containerStars}>
          {
            <ul>
              <h2>StarPacks</h2>
              {starPacks.map((s) => (
                <li key={s.id}>
                  <label> Name: {s.name}</label>
                  <label> Price: {s.price}</label>
                  <label> Stars: {s.stars}</label>
                  <label>
                    {" "}
                    Status: {s.StatusId}
                    <input
                      value="stars"
                      id={s.id}
                      type="checkbox"
                      checked={s.StatusId === "active" ? true : false}
                      onChange={(e) => handleStatus(e, s.StatusId)}
                    />
                  </label>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </>
  );
}

export default Store;
