import React, { useEffect, useRef, useState } from "react";

import { getUser } from "../../redux/actions/user";
import logo from "../../img/logo-15.png";
import imageLanding from "../../img/imagenLanding.png";
import nave1 from "../../img/nave.png";
import nave2 from "../../img/nave2.png";
import nave3 from "../../img/nave3.png";
import prev from "../../img/prev.svg";
import next from "../../img/next.svg";

import Zeratul from "../../img/Cards landing/Zeratul.png";
import Kerrigan from "../../img/Cards landing/Kerrigan.png";
import Raynor from "../../img/Cards landing/Raynor.png";
import Carrier from "../../img/Cards landing/Carrier.png";
import Mutalisk from "../../img/Cards landing/Mutalisk.png";
import Battlecruiser from "../../img/Cards landing/Battlecruiser.png";
import Zealot from "../../img/Cards landing/Zealot.png";
import Zergling from "../../img/Cards landing/Zergling.png";
import Marine from "../../img/Cards landing/Marine.png";

import css from "./landingPage.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function LandingPage() {
  const nave1ref = useRef(null);
  const [tamaño, setTamaño] = useState("50.5%");
  const [limit, setLimit] = useState(1);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user.id !== undefined) dispatch(getUser(user.id));
    window.scroll({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    function handleScroll() {
      const nave = nave1ref.current;
      const { y } = nave.getBoundingClientRect();
      const cambioTamaño = y < 341 ? "50%" : "50.5%";
      setTamaño(cambioTamaño);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function passImageNext() {
    if (limit === 1) setLimit(2);
    if (limit === 2) setLimit(3);
    if (limit === 3) setLimit(1);
  }

  function passImageBack() {
    if (limit === 1) setLimit(3);
    if (limit === 2) setLimit(1);
    if (limit === 3) setLimit(2);
  }
  return (
    <>
      <div className={css.containerLandingPage}>
        <div className={css.LandingPage}>
          <img className={css.logo} src={logo} alt="Logo" />
          <div>
            <h1>THE STARCRAFT UNIVERSE CARD GAME</h1>
          </div>
          <button className={css.btn}>PLAY</button>
        </div>
        <img
          ref={nave1ref}
          style={{ width: tamaño }}
          className={css.nave1}
          src={nave1}
          alt=""
        />
        <img className={css.nave3} src={nave3} alt="" />
      </div>
      <div className={css.container}>
        <div className={css.containerTitle}>
          <img className={css.nave2} src={nave2} alt="" />
          <h1>
            PLAY ONLINE AGAINST OTHER PLAYERS USING YOUR FAVORITE CHARACTERS
          </h1>
        </div>
        <div className={css.containerCards}>
          <div className={css.cards}>
            <div className={css.arrow}>
              <img src={prev} alt="" onClick={passImageBack} />
            </div>
            {limit === 1 && (
              <>
                <img className={css.card} src={Zeratul} alt="Zeratul" />
                <img className={css.card} src={Kerrigan} alt="Kerrigan" />
                <img className={css.card} src={Raynor} alt="Raynor" />
              </>
            )}

            {limit === 2 && (
              <>
                <img className={css.card} src={Carrier} alt="Carrier" />
                <img className={css.card} src={Mutalisk} alt="Mutalisk" />
                <img
                  className={css.card}
                  src={Battlecruiser}
                  alt="Battlecruiser"
                />
              </>
            )}

            {limit === 3 && (
              <>
                <img className={css.card} src={Zealot} alt="Zealot" />
                <img className={css.card} src={Zergling} alt="Zergling" />
                <img className={css.card} src={Marine} alt="Marine" />
              </>
            )}
            <div className={css.arrow}>
              <img src={next} alt="" onClick={passImageNext} />
            </div>
          </div>
        </div>
        <div className={css.containerTitleDown}>
          <h1>CHOOSE PROTOSS, TERRAN OR ZERG TO BUILD YOUR DECK AND COMPETE</h1>
        </div>
        <div className={css.containerCards}>
          <img className={css.imageLanding} src={imageLanding} alt="" />
        </div>
      </div>
    </>
  );
}
