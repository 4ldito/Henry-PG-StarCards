
import {
  GET_BY_EMAIL, USER_CLEAN, GET_USER_BY_EMAIL,
  GET_USER_BY_NAME,
  CREATE_USER,
  DELETE_DECK, DELETE_USER,
  GET_ALL_USERS,
  GET_USER,
  GET_USER_DECKS, IS_VALID_TOKEN,
  LOG_OUT,
  MODIFY_USER,
  SET_TOKEN,
  SIGN_IN,
  USER_CLEAN_MSG_INFO,
  USER_MODIFY_STARS,
  SET_CHAT_NOTIFICATION,
  CREATE_DECK,
  SET_ACTIVE_DECK,
  ADD_CARD_TO_DECK,
} from "../actions/user";



const initialState = {
  user: {},
  decks:[],
  activeDeck:{},
  validUser: false,
  urlUser: {},
  validPassword: "",
  users: [],
  msg: {},
  validToken: false,
  token: null,
  chatNotification: false,
};


export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USER:
      return { ...state, user: payload };;

    case GET_ALL_USERS:
      return { ...state, users: payload };

    case GET_USER_BY_EMAIL:
      return { ...state, user: payload, validUser: true }

    case GET_BY_EMAIL:
      return { ...state, actualUser: payload};

    case GET_USER_BY_NAME:
      return { ...state, urlUser: payload };

    case CREATE_USER:
      if (payload.error)
        return {
          ...state,
          user: {},
          token: null,
          validToken: false,
          msg: { type: "error", text: payload.error, title: "Error!" },
        };

      return {
        ...state,
        token: payload.token,
        validToken: true,
        user: payload.user,
        msg: { type: "success", text: "Logeado correctamente", title: ":D!" },
      };

    case SIGN_IN:
      if (payload.error)
        return {
          ...state,
          user: {},
          token: null,
          validToken: false,
          msg: { type: "error", text: payload.error, title: "Error!" },
        };

      return {
        ...state,
        token: payload.token,
        validToken: true,
        user: payload.user,
        msg: { type: "success", text: "Logeado correctamente", title: ":D!" },
      };

    case MODIFY_USER:
      if (payload === "Incorrect") return { ...state, msg: payload };
      return { ...state, user: payload, msg: "Correct" };

    case DELETE_USER:
      const usersUpdated = state.users.filter((user) => user.id !== payload);
      return { ...state, users: usersUpdated, user: {} };;

    case SET_TOKEN:
      return { ...state, token: payload.token };

    case IS_VALID_TOKEN:
      if (!payload)
        return {
          ...state,
          validToken: payload,
          user: {},
          token: null,
        };
      return { ...state, validToken: payload };

    case LOG_OUT:
      return {
        ...state,
        token: null,
        validToken: false,
        user: {},
      };

    case USER_CLEAN_MSG_INFO:
      return { ...state, msg: {} };

    case USER_CLEAN:
      return { ...state, validUser: false, user: {} }
      
    case USER_MODIFY_STARS:
      const { updatedUser, error } = payload;
      if (updatedUser && !error) return { ...state, user: updatedUser };
      return { ...state };

    case SET_CHAT_NOTIFICATION:
      return { ...state, chatNotification: payload };
    case GET_USER_DECKS:
      return {...state, decks: payload}
    case CREATE_DECK:
      return {...state, decks:[...state.decks,payload]}
    case DELETE_DECK:
      return {...state, decks: state.decks.filter(e=>e.id!==payload.deckToRemove.id)}
    case SET_ACTIVE_DECK:
      return {...state, activeDeck: payload}

      

    default:
      return state;;
  }
}
