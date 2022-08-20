import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCardsPacks } from '../redux/actions/cardsPack'

export const useFetchCardsPack = () => {
  const dispatch = useDispatch()

  const cardsPack = useSelector(state => state.cardsPacksReducer.filteredCardsPack)
  const loaded = useSelector(state => state.cardsPacksReducer.loaded)

  useEffect(() => {
    if (!loaded) dispatch(getCardsPacks())
  }, [cardsPack])

  return { cardsPack, loaded }
}
