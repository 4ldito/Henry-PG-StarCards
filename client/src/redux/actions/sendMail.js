import axios from 'axios'
export const SEND_MAIL = 'SEND_MAIL', MODAL = 'MODAL', SUCCESS_ACTION = 'SUCCESS_ACTION';



export function sendMail(payload) {
    return async function (dispatch) {
      const response = await axios.post(`sendmail`, payload)
      dispatch({ type: SEND_MAIL, payload: response.data })
    }
  }
export function changeModal() {
    return function (dispatch) {
      dispatch({ type: MODAL })
    }
  }
export function successAction() {
    return function (dispatch) {
      dispatch({ type: SUCCESS_ACTION })
    }
  }