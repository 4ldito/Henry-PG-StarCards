import React from "react";
import Card from "./Card";

import css from './CardContainerDetail.module.css'

export function CardContainerDetail({card,bothStacks,viewDetail}){
    return (<>
    {
        bothStacks?
        <div className={viewDetail?css.detailWhenBothStacksDeployed:css.detailWhenBothStacks}>
        <Card
            id={card.id}
            name={card.name}
            image={card.image}
            cost={card.cost}
            Gdmg={card.Gdmg}
            Admg={card.Admg}
            life={card.life}
            ability={card.ability}
            abilities={card.abilities}
            race={card.race}
            movement={card.movement}
          />
          </div>:
          <div className={css.detailWhenOnlyOne}>
            <Card
            id={card.id}
            name={card.name}
            image={card.image}
            cost={card.cost}
            Gdmg={card.Gdmg}
            Admg={card.Admg}
            life={card.life}
            ability={card.ability}
            abilities={card.abilities}
            race={card.race}
            movement={card.movement}
          />
          </div>
    }
    
    </>);
}