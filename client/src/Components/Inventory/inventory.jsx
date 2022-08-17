import { useEffect, React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getAllCards from '../../redux/actions/getAllCards'
import Card from '../Card/card'
import FilterByRace from './Filter'

const Inventory = () => {
  const allCards = useSelector((state) => state.inventory.filteredCards)
  console.log('allcards', allCards)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCards())
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <FilterByRace />
      {
        allCards.map((card) => {
          return <Card key={card.id} name={card.name} image={card.image} cost={card.cost} Gdmg={card.Gdmg} Admg={card.Admg} life={card.life} ability={card.ability} abilities={card.abilities} race={card.race} movement={card.movement} />
        })
      }
    </div>
  )
}

export default Inventory
