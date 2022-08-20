import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterCards } from '../../redux/actions/cards/filterCards'

import css from './Filter.module.css'

export default function FilterByRace () {
  const dispatch = useDispatch()
  const cards = useSelector((state) => state.inventory.cards)
  const [filter, setFilter] = useState({ race: 'allRaces', movements: 'allMovements' })
  function onSelectChange (e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(filterCards(filter, cards))
  }, [filter])

  return (
    <div className={css.filter}>
      <select className={css.select} onChange={onSelectChange} name='race'>
        <option value='allRaces'>All races</option>
        <option value='Protoss'>Protoss</option>
        <option value='Terran'>Terran</option>
        <option value='Zerg'>Zerg</option>
      </select>
      <select className={css.select} onChange={onSelectChange} name='movements'>
        <option value='allMovements'>All movements</option>
        <option value='ground'>Ground</option>
        <option value='flying'>Flying</option>
      </select>
    </div>
  )
}
