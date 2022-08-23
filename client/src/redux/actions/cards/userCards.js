export const GET_USER_CARDS = 'GET_USER_CARDS'
export const FILTER_USER_CARDS = 'FILTER_USER_CARDS'

export function getUserCards(userCards, allCards){
    // console.log(userCards);
    const userCardIds = userCards.map(user => user.CardId);
    const userCardsInventory = userCardIds.map((idCard)=>allCards.find(card => card.id === idCard))
    return {type: GET_USER_CARDS, payload: userCardsInventory}
}

export function filterUserCards(filter, userCards){
    
    const filterRace = filter.race === 'allRaces'
    ? userCards
    : userCards.filter((e) => e.race?.includes(filter.race))

    const filterMovement = filter.movements === 'allMovements'
    ? filterRace
    : filterRace.filter((e) => e.movement?.includes(filter.movements))

  return { type: FILTER_USER_CARDS, payload: filterMovement }
}
