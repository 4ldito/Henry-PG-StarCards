import { UPDATE_FOR_SALE_CARDS, BUY_CARD, CLEAR_FOR_SALE_CARDS, GET_ALL_CARDS_IN_SALE, CLEAR_MSG_MARKET_CARDS } from "../actions/marketCards"

const initialState = {
    cardsInSale: [],
    loaded: false,
    msg: { type: '', info: '', title: '' },
}

export default function marketCardsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_CARDS_IN_SALE:
            return { ...state, cardsInSale: payload, loaded: true }
        case CLEAR_FOR_SALE_CARDS:
            return { ...state, cardsInSale: [], loaded: false }
        case UPDATE_FOR_SALE_CARDS:
            const newCardsInSale = state.cardsInSale.filter(card => card.id !== payload.userCard.id);
            // console.log(payload)
            return {
                ...state, cardsInSale: newCardsInSale,
                msg: {
                    type: 'success',
                    info: `Adquiriste ${payload.userCard.Card.name} por ${payload.userCard.price} Stars, vendida por ${payload.sellerUser.username}`,
                    title: 'Compra completada!'
                }
            }
        case CLEAR_MSG_MARKET_CARDS: {
            return { ...state, msg: { type: '', info: '', title: '' }, }
        }
        default:
            return state
    }
}
