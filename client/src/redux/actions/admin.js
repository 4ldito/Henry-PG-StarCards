import axios from "axios"

export const CHANGE_FILTER_USERS='CHANGE_FILTER_USERS', GET_ALL_USERS='GET_ALL_USERS'

export function getAllUsers() {
    return async function (dispatch) {
        const response = await axios.get("user")
      dispatch({ type: GET_ALL_USERS, payload: response.data })
    }
  }
export function filterUsers(filter) {
    return function (dispatch) {
      dispatch({ type: CHANGE_FILTER_USERS, payload: filter })
    }
  }
