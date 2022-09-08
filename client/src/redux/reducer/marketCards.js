import { UPDATE_FOR_SALE_CARDS, CLEAR_FOR_SALE_CARDS, GET_ALL_CARDS_IN_SALE, CLEAR_MSG_MARKET_CARDS, REMOVE_FOR_SALE } from "../actions/marketCards"

const initialState = {
    cardsInSale: [],
    loaded: false,
    msg: { type: '', info: '', title: '' },
}

export default function marketCardsReducer(state = initialState, { type, payload }) {
    let newCardsInSale = [];
    switch (type) {
        case GET_ALL_CARDS_IN_SALE:
            return { ...state, cardsInSale: payload, loaded: true }
        case CLEAR_FOR_SALE_CARDS:
            return { ...state, cardsInSale: [], loaded: false }
        case UPDATE_FOR_SALE_CARDS:
            newCardsInSale = state.cardsInSale.filter(card => card.id !== payload.userCard.id);
            // console.log(payload)
            return {
                ...state, cardsInSale: newCardsInSale,
                msg: {
                    type: 'success',
                    info: `Adquiriste ${payload.userCard.Card.name} por ${payload.userCard.price} Stars, vendida por ${payload.sellerUser.username}`,
                    title: 'Compra completada!'
                }
            }
        case REMOVE_FOR_SALE:
            // state.cardsInSale.forEach(userCard => {
            //     const actualUserCard = payload.find(removedUserCard => removedUserCard.id === userCard.id);
            //     if (!actualUserCard) newCardsInSale.push(userCard);
            // });
            // console.log(payload)
            // return {
            //     ...state, cardsInSale: newCardsInSale,
            // msg: {
            //     type: 'success',
            //     info: `Eliminaste de la tienda a ${payload.Card.name} correctamente.`,
            //     title: 'Carta eliminada.!'
            // }
            // }
            newCardsInSale = state.cardsInSale.filter(userCard => userCard.id !== payload[0].id);
            return {
                ...state, cardsInSale: newCardsInSale,
                msg: {
                    type: 'success',
                    info: `Eliminaste de la tienda a ${payload[0].Card.name} correctamente.`,
                    title: 'Carta eliminada!'
                }
            }
        case CLEAR_MSG_MARKET_CARDS: {
            return { ...state, msg: { type: '', info: '', title: '' }, }
        }
        default:
            return state
    }
}
