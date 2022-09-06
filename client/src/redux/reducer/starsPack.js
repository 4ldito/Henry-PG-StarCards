import { GET_ALL_STARS_PACKS, MODIFY_STARS } from "../actions/starsPacks"

const initialState = {
  starsPacks: [],
  loaded: false
}

export default function starsPacksReducer (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_STARS_PACKS:
      return { ...state, starsPacks: payload, loaded: true }
    case MODIFY_STARS:
      let index = state.starsPacks.findIndex(c=>c.id === payload.id)
      state.starsPacks[index] = payload
       return { ...state, starsPacks: [...state.starsPacks]}
    default:
      return state
  }
}
