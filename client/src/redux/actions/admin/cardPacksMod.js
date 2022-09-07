import axios from 'axios';

export const CREATE_PACKCARDS_ADMIN = 'CREATE_PACKCARDS_ADMIN';

export default function createPackCardsAdmin(payload){
    console.log(payload)
    return async()=>{
            const createPack = await axios.post('packs', payload);
            return createPack;
    }
}