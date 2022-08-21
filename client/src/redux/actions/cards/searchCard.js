export const SEARCH_CARD = 'SEARCH_CARD'

export function searchCard (search, cards) {
  const searchName = search === null
    ? cards
    : cards.filter((e) => e.name.toLowerCase().includes(search))
  return { type: SEARCH_CARD, payload: searchName }
}
