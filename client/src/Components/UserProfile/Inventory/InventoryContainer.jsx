import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import getAllCards from '../../../redux/actions/cards/getAllCards';
import { getUserCards } from '../../../redux/actions/cards/userCards';
import Card from '../../Card/Card';
import css from "./Inventory.module.css";


export default function InventoryContainer() {
  const dispatch = useDispatch();
  const filteredUserCards = useSelector(state => state.album.filteredUserCards)
  const cards = useSelector((state) => state.album.cards);
  const user = useSelector(state => state.userReducer.user)

  

 useEffect(() => {
  dispatch(getUserCards(user.UserCards, cards))
  }, []);


  return (<div>
            <div  className={css.cartas}>
                {filteredUserCards?.map((card, index) => {
                    return (
                      <div className={css.cardContainer}>
                      <Card
                        key={index}
                        id={card?.id}
                        name={card?.name}
                        image={card?.image}
                        cost={card?.cost}
                        Gdmg={card?.Gdmg}
                        Admg={card?.Admg}
                        life={card?.life}
                        ability={card?.ability}
                        abilities={card?.abilities}
                        race={card?.race}
                        movement={card?.movement}
                      />
                      </div>
                    );
                  
                })}
              </div>
        
        </div>);
}
