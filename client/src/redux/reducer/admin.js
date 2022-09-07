import { GET_ALL_USERS, CHANGE_FILTER_USERS } from "../actions/admin";
import {
  CLEAN_CREATE_PACK_CARDS,
  CREATE_PACK_CARDS,
} from "../actions/admin/cardPacksMod";

const initialState = {
  allUsers: [],
  filteredUsers: [],
  packCard: {},
};

export default function filterUsers(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: payload, filteredUsers: payload };
    case CREATE_PACK_CARDS:
      return { ...state, packCard: payload };
    case CLEAN_CREATE_PACK_CARDS:
      return { ...state, packCard: {} };
    case CHANGE_FILTER_USERS:
      let newFilteredUsers = state.allUsers;
      if (payload.search)
        newFilteredUsers = newFilteredUsers.filter((u) =>
          u.username.toLowerCase().includes(payload.search.toLowerCase())
        );

      if (payload.rol !== "allRols")
        newFilteredUsers = newFilteredUsers.filter(
          (u) => u.RolId === payload.rol
        );

      if (payload.status !== "allStatus")
        newFilteredUsers = newFilteredUsers.filter(
          (u) => u.StatusId === payload.status
        );

      // if (payload.order !== 'none') {   ordenar por nombre?
      //   newFilteredCards = [...newFilteredCards].sort((a, b) => {
      //     switch (payload.order) {
      //       case "nameAtoZ":
      //         if (a.name < b.name) {
      //           return -1
      //         } else return 1

      //       case "nameZtoA":
      //         if (a.name > b.name) {
      //           return -1
      //         } else return 1

      //       default:
      //         return 0
      //     }
      //   })
      // }

      return { ...state, filteredUsers: newFilteredUsers };

    default:
      return state;
  }
}
