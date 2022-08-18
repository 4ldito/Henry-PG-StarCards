import { FILTER_CARDS } from '../actionTypes'

export function filterCards (filter, cards) {
  const filterRace = filter.race === 'allRaces'
    ? cards
    : cards.filter((e) => e.race?.includes(filter.race))
  const filterMovement = filter.movements === 'allMovements'
    ? filterRace
    : filterRace.filter((e) => e.movement?.includes(filter.movements))
  return { type: FILTER_CARDS, payload: filterMovement }
}

// export function filterCards (filter, cards) {
//   if (filter === 'allRaces' || filter === 'Protoss' || filter === 'Terran' || filter === 'Zerg') {
//     const filterRace = filter === 'allRaces'
//       ? cards
//       : cards.filter((e) => e.race?.includes(filter))
//     return { type: FILTER_CARDS, payload: filterRace }
//   } else {
//     const filterMovement = filter === 'allMovements'
//       ? cards
//       : cards.filter((e) => e.movement?.includes(filter))
//     return { type: FILTER_CARDS, payload: filterMovement }
//   }
// }
