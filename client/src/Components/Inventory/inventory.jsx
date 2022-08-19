import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getAllCards from '../../redux/actions/cards/getAllCards'
import Card from '../Card/Card'
import FilterByRace from './Filter'
import SearchCard from './SearchCard'
import SortCards from './sort'

const Inventory = () => {
  const allCards = useSelector((state) => state.inventory.filteredCards)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCards())
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <SortCards />
      <FilterByRace />
      <SearchCard />
      {
        allCards.map((card) => {
          return <Card key={card.id} id={card.id} name={card.name} image={card.image} cost={card.cost} Gdmg={card.Gdmg} Admg={card.Admg} life={card.life} ability={card.ability} abilities={card.abilities} race={card.race} movement={card.movement} />
        })
      }
    </div>
  )
}

export default Inventory
