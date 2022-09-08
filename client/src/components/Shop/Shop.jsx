import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { useFetchStarsPack } from "../../hooks/useFetchStarsPack";
import { useFetchCardsPack } from "./../../hooks/useFetchCardsPack";
import { cleanMsgInfo } from "../../redux/actions/cardsPack";
import { getUser } from "../../redux/actions/user";

import Packs from "./Packs/Packs";
import Filters from "./Filters";
import ShopCart from "./ShopCart/ShopCart";
import ForSaleCards from "./ForSaleCards";

import style from "./styles/Shop.module.css";
import stylePack from "./styles/buyPack.module.css";

import { AiOutlineShoppingCart } from "react-icons/ai";

const Shop = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("stars");
  const [viewShopcart, setViewShopcart] = useState(false);

  const loadedStarsPack = useFetchStarsPack().loaded;
  const loadCardsPack = useFetchCardsPack().loaded;

  const msgInfoPurchase = useSelector((state) => state.cardsPacksReducer.msg);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user.id !== undefined) dispatch(getUser(user.id));
  }, []);

  const handleChangeView = (e) => {
    e.preventDefault();
    const target = e.target;
    const lastActive = document.querySelector(`.${style.active}`);
    lastActive.classList.remove(style.active);
    target.classList.add(`${style.active}`);
    setView(target.value);
  };

  useEffect(() => {
    if (msgInfoPurchase.type) {
      dispatch(cleanMsgInfo());
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: msgInfoPurchase.title,
        text: msgInfoPurchase.info,
        icon: msgInfoPurchase.type,
      });
    }
  }, [msgInfoPurchase]);

  const handleSeeShopcart = (e) => {
    setViewShopcart(!viewShopcart);
  };

  if (!loadedStarsPack || !loadCardsPack) return <p>Loading..</p>;

  return (
    <div className={style.containerTo}>
      <div className={style.container}>
        <div className={style.containerBtns}>
          <button
            onClick={handleChangeView}
            value="stars"
            className={`${style.btn} ${style.active}`}
          >
            BUY STARS
          </button>
          <button
            onClick={handleChangeView}
            value="packsCards"
            className={style.btn}
          >
            BUY CARD PACKS
          </button>
          <button
            onClick={handleChangeView}
            value="cards"
            className={`${style.btn}`}
          >
            BUY CARDS
          </button>
          <button onClick={handleSeeShopcart} className={style.btnShopcart}>
            <AiOutlineShoppingCart size={38} />
          </button>
        </div>
        {user?.id && (
          <p className={style.avaliableStars}>Available Stars: {user.stars}</p>
        )}
        {view === "stars" ? (
          <Packs type="starsPack" />
        ) : view === "packsCards" ? (
          <div className={stylePack.container}>
            <Filters />
            <Packs type="cardsPack" />
          </div>
        ) : (
          <div className={stylePack.container}>
            <ForSaleCards />
          </div>
        )}
      </div>
      {viewShopcart && <ShopCart handleSeeShopcart={handleSeeShopcart} />}
    </div>
  );
};

export default Shop;
