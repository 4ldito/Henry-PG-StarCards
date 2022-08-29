import axios from "axios";
export const SORT_USER_CARDS = "SORT_USER_CARDS";
export const GET_USER_CARDS = "GET_USER_CARDS";
export const FILTER_USER_CARDS = "FILTER_USER_CARDS";
import noRepUserCards from "../../../components/UserProfile/Inventory/functions/noRepUserCards";
export const SEARCH_USER_CARD = "SEARCH_USER_CARD";
export const SALE_CARD = 'SALE_CARD';
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

export function getUserCards(userCards, allCards) {

  const userCardsInventory = { userCards: [], forSaleCards: [] };
  
  userCards.forEach(userCard => {
    const actualCardIndex = allCards.findIndex(card => card.id === userCard.CardId);
    const actualCard = { ...allCards[actualCardIndex] }
    let seeIn = '';

    if (userCard.StatusId === 'active') {
      seeIn = 'userCards'
    } else if (userCard.StatusId === 'onSale') {
      seeIn = 'forSaleCards'
    } else {
      return;
    }

    const alreadyExists = userCardsInventory[seeIn].find(card => card.id === actualCard.id);
    if (!alreadyExists) {
      actualCard.repeat = 1;
      userCardsInventory[seeIn].push(actualCard);
      actualCard.userCards = [userCard];
    } else {
      alreadyExists.repeat++;
      alreadyExists.userCards.push(userCard);
    }
  });

  return { type: GET_USER_CARDS, payload: userCardsInventory };
  //
}

export function filterUserCards(filter, userCards) {
  const filterRace =
    filter.race === "allRaces"
      ? userCards
      : userCards.filter((e) => e.race === filter.race);

  const filterMovement =
    filter.movements === "allMovements"
      ? filterRace
      : filterRace.filter((e) => e.movement === filter.movements);

  return { type: FILTER_USER_CARDS, payload: filterMovement };
}

export function searchUserCard(search, userCards) {
  if (search === "") {
    return { type: SEARCH_USER_CARD, payload: userCards };

  }
  const result = userCards.filter((c) =>
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

export function handleSaleCard(values) {
  return async function (dispatch) {
    const response = await axios.patch("/userCards", values);
    dispatch({ type: SALE_CARD, payload: response.data })
  };
}
