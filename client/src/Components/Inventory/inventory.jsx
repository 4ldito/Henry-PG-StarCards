import { useEffect, React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getAllCards from '../../redux/actions/getAllCards'

const Inventory = () => {
  const allCards = useSelector((state) => state.pokemons)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCards())
    // eslint-disable-next-line
  },[])
  return (
    <div>
      {
        allCards.map()
      }
    </div>
  )
}

export default Inventory
