import React from 'react';
import css from './CardInPlayroom.module.css'


export default function CardInPlayroom({ card }) {
    const cardCss =
    card.race === "Zerg"
      ? css.zergCard
      : card.race === "Terran"
      ? css.terranCard
      : css.protossCard;
    
    return (
        // <div className={css.card}>
        //     <div className={css.nameAndImg}>
        //         <div>{card.name}</div>
        //         <div className={css.imgContainer}>
        //             <img className={css.img} src={card.image}></img>
        //         </div>
        //     </div>
        //     <div className={css.statsAndMove}>
        //         <div>{card.movement}</div>
        //         <div className={css.stats}>
        //             <div>
        //                 <label>Life: {' '}</label>
        //                 <span>{card.life}</span>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className={css.Card}>
        <div className={`${cardCss} ${css.cardContainer}`}>
          <div className={css.nameContainer}>
            <div className={css.name}>{card.name}</div>
            <span className={css.cost}>{card.cost}</span>
          </div>
          <img className={css.img} src={card.image} alt={card.image} />
          <span className={css.movement}>{card.movement}</span>
          {/* <p className={css.ability}>{card.ability}</p> */}
          <div className={css.stats}>
            <span className={css.life}>{card.life}</span>
            <span className={css.dmg}>
              {card.Gdmg}/{card.Admg}
            </span>
          </div>
        </div>
      </div>
    )
}



