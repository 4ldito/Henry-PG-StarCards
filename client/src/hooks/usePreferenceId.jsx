import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPreferenceId } from '../redux/actions/shopCart'

export const usePreferenceId = (shopCartItems) => {
  const dispatch = useDispatch()
  const preferenceId = useSelector(state => state.shopCartReducer.preferenceId)
  const userId = useSelector(state => state.userReducer.id)

  useEffect(() => {
    if (preferenceId === -1) dispatch(getPreferenceId(shopCartItems, userId))
  }, [preferenceId])

  return { preferenceId }
}
