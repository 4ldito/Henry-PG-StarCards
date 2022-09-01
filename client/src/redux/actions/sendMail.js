import axios from 'axios'
export const SEND_MAIL = 'SEND_MAIL',CHANGE_RENDER='CHANGE_RENDER', MODAL = 'MODAL', SUCCESS_ACTION = 'SUCCESS_ACTION', VERIFY_TOKEN = 'VERIFY_TOKEN', CLEAN_TOKEN = 'CLEAN_TOKEN', CLEAN_RECIVED_TOKEN='CLEAN_RECIVED_TOKEN',
SEND_MAIL_PURCHASE='SEND_MAIL_PURCHASE'


export function sendMail(payload) {
    return async function (dispatch) {
      const response = await axios.post(`sendmail`, payload)
      dispatch({ type: SEND_MAIL, payload: response.data })
    }
  }
export function verifyToken(payload) {
    return async function (dispatch) {
      const response = await axios.get(`sendmail/${payload}`)
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
export function cleanrecivedToken() {
    return function (dispatch) {
      dispatch({ type: CLEAN_RECIVED_TOKEN })
    }
  }
export function renderVerifyRegister() {
    return function (dispatch) {
      dispatch({ type: CHANGE_RENDER })
    }
  }
  export function sendMailPurchase(payload) {
    return function () {
      axios.post(`sendmailpurchase`, payload)
      console.log(payload)
    }
  }