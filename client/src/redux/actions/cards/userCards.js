export const SORT_USER_CARDS = "SORT_USER_CARDS";
export const GET_USER_CARDS = "GET_USER_CARDS";
export const FILTER_USER_CARDS = "FILTER_USER_CARDS";
import axios from "axios";
import noRepUserCards from "../../../components/UserProfile/Inventory/functions/noRepUserCards";
export const SEARCH_USER_CARD = "SEARCH_USER_CARD";
const nameAtoZ = "nameAtoZ";
const nameZtoA = "nameZtoA";
const ascendentCost = "ascendentCost";
const descendentCost = "descendentCost";
const ascendentGdmg = "ascendentGdmg";
const descendentGdmg = "descendentGdmg";
const ascendentAdmg = "ascendentAdmg";
const descendentAdmg = "descendentAdmg";
const ascendentlife = "ascendentlife";
const descendentlife = "descendentlife";
export const SALE_CARD = 'SALE_CARD';

export function getUserCards(userCards, allCards) {
  const userCardIds = userCards?.map((user) => user.CardId);
  const userCardsInventory = userCardIds?.map((idCard) =>
    allCards?.find((card) => card.id === idCard)
  );
  const notRepeated = noRepUserCards(userCardsInventory);
  return { type: GET_USER_CARDS, payload: { userCardsInventory, notRepeated } };
}

export function filterUserCards(filter, userCards) {
  const notRepeated = noRepUserCards(userCards);
  const filterRace =
    filter.race === "allRaces"
      ? notRepeated
      : notRepeated.filter((e) => e.race === filter.race);

  const filterMovement =
    filter.movements === "allMovements"
      ? filterRace
      : filterRace.filter((e) => e.movement === filter.movements);

  return { type: FILTER_USER_CARDS, payload: filterMovement };
}

export function searchUserCard(search, cards) {
  const notRepeated = noRepUserCards(cards);

  if (search === "") {
    return { type: SEARCH_USER_CARD, payload: notRepeated };

  }
  const result = notRepeated.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return { type: SEARCH_USER_CARD, payload: result };
}

export function sortUserCards(sort, cards) {
  const sortedCards = [...cards].sort((a, b) => {
    switch (sort) {
      case nameAtoZ:
        if (a.name < b.name) {
          return -1;
        } else return 1;

      case nameZtoA:
        if (a.name > b.name) {
          return -1;
        } else return 1;

      case ascendentCost:
        if (a.cost < b.cost) {
          return -1;
        } else return 1;

      case descendentCost:
        if (a.cost > b.cost) {
          return -1;
        } else return 1;

      case ascendentGdmg:
        if (a.cost < b.cost) {
          return -1;
        } else return 1;

      case descendentGdmg:
        if (a.cost > b.cost) {
          return -1;
        } else return 1;

      case ascendentAdmg:
        if (a.cost < b.cost) {
          return -1;
        } else return 1;

      case descendentAdmg:
        if (a.cost > b.cost) {
          return -1;
        } else return 1;

      case ascendentlife:
        if (a.cost < b.cost) {
          return -1;
        } else return 1;

      case descendentlife:
        if (a.cost > b.cost) {
          return -1;
        } else return 1;

      default:
        return 0;
    }
  });
  return {
    type: SORT_USER_CARDS,
    payload: sortedCards,
  };
}

export function saleCard(values) {
  return async function (dispatch) {
    const response = await axios.patch("/userCards", values);
    dispatch({ type: SALE_CARD, payload: response.data })
  };
}
