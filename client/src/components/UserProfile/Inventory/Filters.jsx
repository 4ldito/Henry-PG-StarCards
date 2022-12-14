import { useEffect, useState } from 'react';
import style from '../Inventory/Filters.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterUserCards } from '../../../redux/actions/cards/userCards';


const Filters = () => {

  const dispatch = useDispatch();
  const userCards = useSelector((state) => state.album.userCards)
  const [filters, setFilters] = useState({ race: 'allRaces', movements: "allMovements" });

  const onSelectChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }


  useEffect(() => {
    if (userCards) dispatch(filterUserCards(filters, userCards))
  }, [filters, userCards])

  return (
    <div className={style.container}>
      <select className={style.select} onChange={onSelectChange} name='race'>
        <option value='allRaces'>All races</option>
        <option value='Protoss'>Protoss</option>
        <option value='Terran'>Terran</option>
        <option value='Zerg'>Zerg</option>
      </select>
      <select className={style.select} onChange={onSelectChange} name="movements">
        <option value="allMovements">All movements</option>
        <option value="Ground">Ground</option>
        <option value="Flying">Flying</option>
      </select>
    </div>
  )
}

export default Filters