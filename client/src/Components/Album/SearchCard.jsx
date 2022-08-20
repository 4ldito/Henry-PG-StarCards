import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchCard } from '../../redux/actions/cards/searchCard.js'
import getAllCards from '../../redux/actions/cards/getAllCards'

export default function SearchCard () {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const cards = useSelector((state) => state.inventory.cards)

  function onSubmit (e) {
    e.preventDefault()
    search === ''
      ? dispatch(getAllCards())
      : dispatch(searchCard(search, cards))
  }
  function onInputChange (e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' onChange={onInputChange} value={search} />
        <input type='submit' value='search' />
      </form>
    </div>
  )
}
