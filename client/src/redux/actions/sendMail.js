import axios from 'axios'
export const SEND_MAIL = 'SEND_MAIL', MODAL = 'MODAL', SUCCESS_ACTION = 'SUCCESS_ACTION', VERIFY_TOKEN = 'VERIFY_TOKEN', CLEAN_TOKEN = 'CLEAN_TOKEN'



export function sendMail(payload) {
    return async function (dispatch) {
      const response = await axios.post(`sendmail`, payload)
      dispatch({ type: SEND_MAIL, payload: response.data })
    }
  }
export function verifyToken(payload) {
  console.log(payload)
    return async function (dispatch) {
      const response = await axios.get(`sendmail/${payload.token}`)
      dispatch({ type: VERIFY_TOKEN, payload: response.data })
    }
  }
export function changeModal(payload) {
    return function (dispatch) {
      dispatch({ type: MODAL , payload: payload})
    }
  }
export function successAction() {
    return function (dispatch) {
      dispatch({ type: SUCCESS_ACTION })
    }
  }
export function cleanToken() {
    return function (dispatch) {
      dispatch({ type: CLEAN_TOKEN })
    }
  }