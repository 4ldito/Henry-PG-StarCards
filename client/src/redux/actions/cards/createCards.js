import axios from 'axios';

//export const CREATE_CARDS_ADMIN = 'CREATE_CARDS_ADMIN';
export const CREATE_CARDS='CREATE_CARDS', CLEAN_CREATE_CARDS='CLEAN_CREATE_CARDS';


export function createCardsAdmin(payload){
    return async function (dispatch) {
        const response = await axios.post('cards', payload);
        dispatch({ type: CREATE_CARDS, payload: response.data })
    }
}

export function cleanCreateCardsAdmin(){
    return async function (dispatch) {
        dispatch({ type: CLEAN_CREATE_CARDS })
    }
}


