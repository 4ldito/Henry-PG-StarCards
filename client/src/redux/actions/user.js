import axios from "axios";
export const GET_USER = "GET_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const CREATE_USER = "CREATE_USER";
export const SIGN_IN = "SIGN_IN";
export const DELETE_USER = "DELETE_USER";
export const MODIFY_USER = "MODIFY_USER";
export const SET_TOKEN = "SET_TOKEN";
export const IS_VALID_TOKEN = "IS_VALID_TOKEN";
export const LOG_OUT = "LOG_OUT";
export const USER_CLEAN_MSG_INFO = "USER_CLEAN_MSG_INFO";
export const GET_USER_CARDS = "GET_USER_CARDS";
export const USER_MODIFY_STARS = "USER_MODIFY_STARS";
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";
export const SET_CHAT_NOTIFICATION = "SET_CHAT_NOTIFICATION";
export const GET_USER_BY_NAME = "GET_USER_BY_NAME";

// import { useToken } from '../../hooks/useToken'
/// ////////////////////////////////////////////////////////////////////////////////////////////

export function getUser(id) {
  return async function (dispatch) {
    const response = await axios(`user?id=${id}`);
    dispatch({ type: GET_USER, payload: response.data });
  };
}

export function getAllUsers() {
  return async function (dispatch) {
    const response = await axios("user");
    dispatch({ type: GET_ALL_USERS, payload: response.data });
  };
}

export function getUserByEmail(email) {
  return async function (dispatch) {
    const response = await axios(`user?email=${email}`);
    dispatch({ type: GET_USER_BY_EMAIL, payload: response.data });
  };
}

export function getUserByName(username) {
  return async function (dispatch) {
    const response = await axios(`user/username/${username}`);
    dispatch({ type: GET_USER_BY_NAME, payload: response.data });
  };
}

export function createUser(user) {
  return async function (dispatch) {
    const response = await axios.post("login/signup", user);
    dispatch({ type: CREATE_USER, payload: response.data });
  };
}

export function signIn(user) {
  return async function (dispatch) {
    try {
      const response = await axios.post("login/signin", user);
      // console.log(response.data)
      dispatch({ type: SIGN_IN, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setToken(credentials) {
  return { type: SET_TOKEN, payload: credentials };
}
export function logOut() {
  return { type: LOG_OUT };
}

export const userCleanMsgInfo = () => {
  return { type: USER_CLEAN_MSG_INFO };
};

export function modifyUser(id, property) {
  return async function (dispatch) {
    const response = await axios.patch(`user/${id}`, property);
    dispatch({ type: MODIFY_USER, payload: response.data });
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    const response = await axios.delete(`user/?id=${id}`);
    dispatch({ type: DELETE_USER, payload: response.data });
  };
}

export function isValidToken(id, token) {
  return async function (dispatch) {
    if (!token) token = "none";
    try {
      const response = await axios(`login/${token}?id=${id}`);
      dispatch({ type: IS_VALID_TOKEN, payload: response.data });
    } catch (error) {
      // console.error('STAR_CARDS_ERROR', 'tenes q logearte pa')
    }
  };
}

export function purchaseCompleted(id, items) {
  return async function (dispatch) {
    const response = await axios.patch(`user/${id}`, { items });
    dispatch({ type: MODIFY_USER, payload: response.data });
  };
}

export function setChatNotification(flag) {
  return { type: SET_CHAT_NOTIFICATION, payload: flag };
}
