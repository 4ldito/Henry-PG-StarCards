import React from 'react';
import css from './CardInPlayroom.module.css'


export default function CardInPlayroom({ card }) {
    return (
        <div className={css.card}>
            <div className={css.nameAndImg}>
                <div>{card.name}</div>
                <div className={css.imgContainer}>
                    <img className={css.img} src={card.image}></img>
                </div>
            </div>
            <div className={css.statsAndMove}>
                <div>{card.movement}</div>
                <div className={css.stats}>
                    <div>
                        <label>Life: {' '}</label>
                        <span>{card.life}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}



