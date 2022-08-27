import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getForSaleCards } from '../redux/actions/marketCards'

export const useFetchStarsPack = () => {
  const dispatch = useDispatch()

  const cardsInSale = useSelector(state => state.marketCardsReducer.cardsInSale)
  const loaded = useSelector(state => state.marketCardsReducer.loaded)

  useEffect(() => {
    if (!loaded) dispatch(getForSaleCards());
  }, [cardsInSale])

  return { cardsInSale }
}
