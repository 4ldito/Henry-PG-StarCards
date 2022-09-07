import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStarsPacks } from '../redux/actions/starsPacks'

export const useFetchStarsPack = () => {
  const dispatch = useDispatch()

  const starsPacks = useSelector(state => state.starsPackReducer.starsPacks)
  const loaded = useSelector(state => state.starsPackReducer.loaded)

  useEffect(() => {
    dispatch(getStarsPacks())
  }, [])

  return { starsPacks, loaded }
}
