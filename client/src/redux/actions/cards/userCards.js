export const GET_USER_CARDS = 'GET_USER_CARDS'
export const FILTER_USER_CARDS = 'FILTER_USER_CARDS'
import noRepUserCards from "../../../components/UserProfile/Inventory/functions/noRepUserCards";
export function getUserCards(userCards, allCards){

  const userCardIds = userCards?.map(user => user.CardId);
  
  const userCardsInventory = userCardIds?.map((idCard)=>allCards?.find(card => card.id === idCard))
  const notRepeated = noRepUserCards(userCardsInventory);
    return {type: GET_USER_CARDS, payload: {userCardsInventory,notRepeated}}
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
