import { GET_ALL_STARS_PACKS } from './../actions/actionTypes'

const initialState = {
  starsPacks: [],
  loaded: false
}

export default function starsPacksReducer (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_STARS_PACKS:
      return { ...state, starsPacks: payload, loaded: true }
    default:
      return state
  }
}
