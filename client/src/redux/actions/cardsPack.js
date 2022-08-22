import axios from 'axios'
export const GET_ALL_CARDS_PACKS = 'GET_ALL_CARDS_PACKS';
export const BUY_CARD_PACK = 'BUY_CARD_PACK';
export const CLEAN_MSG_INFO = 'CLEAN_MSG_INFO';
export const FILTER_CARDS_PACKS = 'FILTER_CARDS_PACKS';

export function getCardsPacks() {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/packs/all')
    dispatch({ type: GET_ALL_CARDS_PACKS, payload: response.data })
  }
}

export const buyCardPack = (info, userId) => {
  return async function (dispatch) {
    const response = await axios.patch('http://localhost:3001/packs/buy', { info, userId })
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
    const response = await axios.patch('http://localhost:3001/packs/buy', info)
    dispatch({ type: BUY_CARD_PACK, payload: response.data })
  }
}