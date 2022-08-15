import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStarsPacks } from '../redux/actions/starsPacks'
// import { getActivities } from '../redux/actions/activities'

export const useFetchStarsPack = () => {
  const dispatch = useDispatch()

  const starsPacks = useSelector(state => state.starsPackReducer.starsPacks)
  const loaded = useSelector(state => state.starsPackReducer.loaded)

  useEffect(() => {
    if (!loaded) dispatch(getStarsPacks())
  }, [starsPacks])

  return { starsPacks, loaded }
}
