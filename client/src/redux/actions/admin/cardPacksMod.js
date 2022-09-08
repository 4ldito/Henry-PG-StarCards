import axios from 'axios';

export const CREATE_PACKCARDS_ADMIN = 'CREATE_PACKCARDS_ADMIN', CREATE_PACK_CARDS='CREATE_PACK_CARDS', CLEAN_CREATE_PACK_CARDS='CLEAN_CREATE_PACK_CARDS';

export function createPackCardsAdmin(payload){
    return async function (dispatch) {
        const response = await axios.post('packs', payload);
        dispatch({ type: CREATE_PACK_CARDS, payload: response.data })
    }
}
export function cleanCreatePackCardsAdmin(){
    return async function (dispatch) {
        dispatch({ type: CLEAN_CREATE_PACK_CARDS })
    }
}
