export const FILTER_CARDS = 'FILTER_CARDS'

export function filterCards(filter) {
  return { type: FILTER_CARDS, payload: filter }
}