import { GET_ALL_CARDS_PACKS, BUY_CARD_PACK, CLEAN_MSG_INFO, FILTER_CARDS_PACKS } from './../actions/actionTypes'

const initialState = {
  cardsPacks: [],
  filteredCardsPack: [],
  msg: { type: '', info: '', title: '' },
  loaded: false
}

export default function cardsPacksReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CARDS_PACKS:
      return { ...state, cardsPacks: payload, filteredCardsPack: payload, loaded: true }
    case BUY_CARD_PACK:
      const { msg, error, updatedInfo } = payload;
      // En la posicion 0 se encuentra el user
      if (updatedInfo) updatedInfo.shift();
      if (error) return { ...state, msg: { type: 'error', info: error, title: 'Error!' } }

      const data = state.cardsPacks.map(pack => {
        updatedInfo.forEach(updatedPack => {
          if (pack.id === updatedPack.id) {
            pack = { ...updatedPack }
          }
        });
        return pack;
      })
      return { ...state, filteredCardsPack: [...data], cardsPacks: [...data], msg: { type: 'success', info: msg, title: 'Compra finalizada' } }
    case FILTER_CARDS_PACKS:
      const { race, order } = payload;
      let newFilteredCardsPack = [...state.cardsPacks];
      if (race !== 'allRaces') newFilteredCardsPack = state.cardsPacks.filter(cardpack => {
        const hasRace = cardpack.race.find(r => r === race)
        if (hasRace) return cardpack;
      });
      if (order) {
        switch (order) {
          case 'priceAsc':
            newFilteredCardsPack = newFilteredCardsPack.sort((a, b) => a.price - b.price);
            break;
          case 'priceDes':
            newFilteredCardsPack = newFilteredCardsPack.sort((a, b) => b.price - a.price);
            break;
          case 'stockAsc':
            newFilteredCardsPack = newFilteredCardsPack.sort((a, b) => a.stock - b.stock);
            break;
          case 'stockDes':
            newFilteredCardsPack = newFilteredCardsPack.sort((a, b) => b.stock - a.stock);
            break;
          default:
            break;
        }
      }
      return { ...state, filteredCardsPack: newFilteredCardsPack }
    case CLEAN_MSG_INFO:
      return { ...state, msg: { type: '', info: '', title: '' } }
    default:
      return state
  }
}
