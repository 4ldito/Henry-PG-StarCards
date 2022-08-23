export const GET_USER_CARDS = 'GET_USER_CARDS'
export const FILTER_USER_CARDS = 'FILTER_USER_CARDS'

export function getUserCards(userCards, allCards){
  // console.log(allCards,'<----- asi llega all cards al inventario la primera vez que entras, si no entraste al about antes');
  // console.log(userCards,'<----- y asi llega userCards');
  const userCardIds = userCards?.map(user => user.CardId);
  
  const userCardsInventory = userCardIds?.map((idCard)=>allCards?.find(card => card.id === idCard))

    return {type: GET_USER_CARDS, payload: userCardsInventory}
}

export function filterUserCards(filter, userCards){
    
    // console.log(userCards,'---------',filter)
    const filterRace = filter.race === 'allRaces'
    ? userCards
    : userCards.filter((e) => e.race === filter.race)
    
    const filterMovement = filter.movements === 'allMovements'
    ? filterRace
    : filterRace.filter((e) => e.movement===filter.movements)

  return { type: FILTER_USER_CARDS, payload: filterMovement }
}
