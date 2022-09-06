import axios from 'axios'
import { USER_MODIFY_STARS } from './user';
export const GET_ALL_CARDS_PACKS = 'GET_ALL_CARDS_PACKS';
export const BUY_CARD_PACK = 'BUY_CARD_PACK';
export const CLEAN_MSG_INFO = 'CLEAN_MSG_INFO';
export const FILTER_CARDS_PACKS = 'FILTER_CARDS_PACKS';
export const FAV_USER_PACKS = 'FAV_USER_PACKS'
export const GET_DETAIL_PACK = 'GET_DETAIL_PACK'
export const MODIFY_CARD_PACKS = 'MODIFY_CARD_PACKS'

export function getCardsPacks() {
  return async function (dispatch) {
    const response = await axios.get('packs/active')
    dispatch({ type: GET_ALL_CARDS_PACKS, payload: response.data })
  }
}

export function getAllCardsPacks() {
  return async function (dispatch) {
    const response = await axios.get('packs/all')
    dispatch({ type: GET_ALL_CARDS_PACKS, payload: response.data })
  }
}

export const buyCardPack = (info, userId) => {
  return async function (dispatch) {
    const response = await axios.patch('packs/buy', { ...info, userId })
    dispatch({ type: USER_MODIFY_STARS, payload: response.data })
    dispatch({ type: BUY_CARD_PACK, payload: response.data })
  }
}

export function cleanMsgInfo() {
  return { type: CLEAN_MSG_INFO }
}

export const filterCardsPacks = (filters) => {
  return { type: FILTER_CARDS_PACKS, payload: filters }
}

export const addUserCards = () => {
  return async function (dispatch) {
    const response = await axios.patch('packs/buy', info)
    dispatch({ type: BUY_CARD_PACK, payload: response.data })
  }
}
export const modifyCardPacks = (id, payload) => {
  return async function (dispatch) {
    const response = await axios.patch(`packs/${id}`, payload)
    dispatch({ type: MODIFY_CARD_PACKS, payload: response.data })
  }
}

export const favUserPacks =  (object) => {
  const packId = object.packId
  const userId = object.userId
  const action = object.action
  if (action === 'add'){
    return async function (dispatch) {
      const response = await axios.post('favPacks', object)
      dispatch({ type: FAV_USER_PACKS, payload: response.data})
    }
  } else {
    return async function (dispatch) {
      const response = await axios.delete('favPacks', {data: object})
      dispatch({ type: FAV_USER_PACKS, payload: response.data })
    }
  }  
}

export const getDetailCard = (id) => {
  return { type: GET_DETAIL_PACK, payload: id }
}