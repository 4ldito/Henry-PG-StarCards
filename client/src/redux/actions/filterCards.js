import { FILTER_CARDS } from './actionTypes'

export function filterCards (filter, cards) {
  const filterRace = filter === 'allRaces'
    ? cards
    : cards.filter((e) => e.race?.includes(filter))
  return { type: FILTER_CARDS, payload: filterRace }
}
