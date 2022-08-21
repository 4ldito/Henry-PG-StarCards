import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

import { useFetchStarsPack } from '../../hooks/useFetchStarsPack';
import { useFetchCardsPack } from './../../hooks/useFetchCardsPack';
import { cleanMsgInfo } from '../../redux/actions/cardsPack';

import Packs from './Packs/Packs';
import Filters from './Filters';

import style from './styles/Shop.module.css';

const Shop = () => {
  const dispatch = useDispatch()

  const [view, setView] = useState('stars')

  const loadedStarsPack = useFetchStarsPack().loaded
  const loadCardsPack = useFetchCardsPack().loaded

  const msgInfoPurchase = useSelector(state => state.cardsPacksReducer.msg)

  const handleChangeView = (e) => {
    e.preventDefault();
    const target = e.target;
    const lastActive = document.querySelector(`.${style.active}`);
    lastActive.classList.remove(style.active);
    target.classList.add(`${style.active}`)
    // console.log(target);
    setView(target.value);
  }

  useEffect(() => {
    if (msgInfoPurchase.type) {
      Swal.fire({
        title: msgInfoPurchase.title,
        text: msgInfoPurchase.info,
        icon: msgInfoPurchase.type,
      });
    }
  }, [msgInfoPurchase]);

  useEffect(() => {
    return () => {
      dispatch(cleanMsgInfo());
    }
  }, []);

  if (!loadedStarsPack || !loadCardsPack) return (<p>Loading..</p>)

  return (
    <div className={style.container}>
      <div className={style.containerBtns}>
        <button onClick={handleChangeView} value='stars' className={`${style.btn} ${style.active}`}>Buy Stars</button>
        <button onClick={handleChangeView} value='packsCards' className={style.btn}>Buy Packs Cards</button>
        <button onClick={handleChangeView} value='cards' className={style.btn}>Buy Cards</button>
      </div>
      {view === 'stars' ? <Packs type='starsPack' />
        : view === 'packsCards' ?
        <>
          <Filters />
          <Packs type='cardsPack' />
        </>
        : <p>Cards</p>
      }
    </div>
  )
}

export default Shop
