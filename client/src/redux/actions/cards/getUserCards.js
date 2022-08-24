export const GET_USER_CARDS = 'GET_USER_CARDS'

export function getUserCards(userCards, allCards){
    const userCardIds = userCards.map(user => user.CardId);
    const userCardsInventory = userCardIds.map((idCard)=>allCards.find(card => card.id === idCard))
    return {type: GET_USER_CARDS, payload: userCardsInventory}
}

export function filterUserCards(userCards, allCards){
    const userCardIds = userCards.map(user => user.CardId);
    const userCardsInventory = userCardIds.map((idCard)=>allCards.find(card => card.id === idCard))
    return {type: GET_USER_CARDS, payload: userCardsInventory}
}
