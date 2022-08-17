import { useDispatch } from 'react-redux'
import { filterCards } from '../../redux/actions/filterCards'

export default function FilterByRace () {
  const dispatch = useDispatch()

  function onSelectChange (e) {
    dispatch(filterCards(e.target.value))
  }

  return (
    <select onChange={onSelectChange}>
      <option value='allRaces'>All races</option>
      <option value='protoss'>Protoss</option>
      <option value='terran'>Terran</option>
      <option value='zerg'>Zerg</option>
    </select>
  )
}
