export const SORT_USER_CARDS = 'SORT_CARDS'
const nameAtoZ = 'nameAtoZ'
const nameZtoA = 'nameZtoA'
const ascendentCost = 'ascendentCost'
const descendentCost = 'descendentCost'
const ascendentGdmg = 'ascendentGdmg'
const descendentGdmg = 'descendentGdmg'
const ascendentAdmg = 'ascendentAdmg'
const descendentAdmg = 'descendentAdmg'
const ascendentlife = 'ascendentlife'
const descendentlife = 'descendentlife'
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


export function sortUserCards (sort, cards) {
  const sortedCards = [...cards].sort((a, b) => {
    switch (sort) {
      case nameAtoZ:
        if (a.name < b.name) {
          return -1
        } else return 1

      case nameZtoA:
        if (a.name > b.name) {
          return -1
        } else return 1

      case ascendentCost:
        if (a.cost < b.cost) {
          return -1
        } else return 1

      case descendentCost:
        if (a.cost > b.cost) {
          return -1
        } else return 1

      case ascendentGdmg:
        if (a.cost < b.cost) {
          return -1
        } else return 1

      case descendentGdmg:
        if (a.cost > b.cost) {
          return -1
        } else return 1

      case ascendentAdmg:
        if (a.cost < b.cost) {
          return -1
        } else return 1

      case descendentAdmg:
        if (a.cost > b.cost) {
          return -1
        } else return 1

      case ascendentlife:
        if (a.cost < b.cost) {
          return -1
        } else return 1

      case descendentlife:
        if (a.cost > b.cost) {
          return -1
        } else return 1

      default:
        return 0
    }
  })
  return {
    type: SORT_USER_CARDS,
    payload: sortedCards
  }
}
