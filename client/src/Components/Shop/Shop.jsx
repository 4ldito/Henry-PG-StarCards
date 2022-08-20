import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

import { useFetchStarsPack } from '../../hooks/useFetchStarsPack';
import { useFetchCardsPack } from './../../hooks/useFetchCardsPack';
import { cleanMsgInfo } from '../../redux/actions/cardsPack';

import Packs from './Packs/Packs';

import style from './styles/Shop.module.css';
import Filters from './Filters';

const Shop = () => {
  const dispatch = useDispatch()

  const loadedStarsPack = useFetchStarsPack().loaded
  const loadCardsPack = useFetchCardsPack().loaded

  const msgInfoPurchase = useSelector(state => state.cardsPacksReducer.msg)

  useEffect(() => {
    if (msgInfoPurchase.type) {
      Swal.fire({
        title: msgInfoPurchase.title,
        text: msgInfoPurchase.info,
        icon: msgInfoPurchase.type,
      })
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
      <Packs type='starsPack' />
      <Filters />
      <Packs type='cardsPack' />
    </div>
  )
}

export default Shop
