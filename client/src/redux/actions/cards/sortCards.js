import { SORT_CARDS } from '../actionTypes'
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

export function sortCards (sort, cards) {
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
  console.log('sorted', sortedCards)
  return {
    type: SORT_CARDS,
    payload: sortedCards
  }
}
