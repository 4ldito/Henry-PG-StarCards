import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailCard } from "../../../redux/actions/cardsPack";
import css from "../styles/Pack.module.css";
import PackDetail from "./PackDetail";

export default function Pack({ name, amount, img, id }) {
  const [viewDetail, setViewDetail] = useState(false)
  const dispatch = useDispatch()

  const handleDetail = (e) => {
    console.log(e)
    setViewDetail(!viewDetail)
    dispatch(getDetailCard(id))
  }

  return (
    <>
    <div className={css.border} onClick={handleDetail}>
      <div className={css.background}>
        <img
          className={css.img}
          src={img}
        //   src="https://i.ibb.co/V274Hh9/packs6-Mesa-de-trabajo-1-copia-7.png"
          alt="Image"
        />

        <div className={css.textup}>
          <h5>{name}</h5>
        </div>

        <div className={css.textDown}>
          <h6>Cards: {amount}</h6>
        </div>
      </div>
    </div>
      {viewDetail && <PackDetail id={id} handleDetail={handleDetail}/>}
    </>
  );
}
