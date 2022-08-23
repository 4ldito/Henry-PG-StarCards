import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import getAllCards from '../../../redux/actions/cards/getAllCards';
import { getUserCards } from '../../../redux/actions/cards/userCards';
import Card from '../../Card/Card';
import css from "./Inventory.module.css";


export default function InventoryContainer() {
  const dispatch = useDispatch();
  const userCards = useSelector(state => state.album.userCards)
  const cards = useSelector((state) => state.album.filteredCards);
  const user = useSelector(state => state.userReducer.user)
  const cardsPerPage = 4;
  const [limit, setLimit] = useState({ min: 0, max: cardsPerPage - 1 });

 useEffect(() => {
  console.log(user.UserCards);
  dispatch(getAllCards());
  dispatch(getUserCards(user.UserCards, cards))
  }, []);


  return (<div>
            <div  className={css.cartas}>
                {userCards?.map((card, index) => {
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
