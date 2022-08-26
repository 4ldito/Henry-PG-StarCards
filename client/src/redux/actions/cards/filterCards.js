export const FILTER_CARDS = 'FILTER_CARDS'

export function filterCards (filter, cards) {
  const filterRace = filter.race === 'allRaces'
    ? cards
    : cards.filter((e) => e.race?.includes(filter.race))
  const filterMovement = filter.movements === 'allMovements'
    ? filterRace
    : filterRace.filter((e) => e.movement?.includes(filter.movements))
  return { type: FILTER_CARDS, payload: filterMovement }
}