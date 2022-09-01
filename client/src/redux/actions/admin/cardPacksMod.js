import axios from 'axios';

export const CREATE_PACKCARDS_ADMIN = 'CREATE_PACKCARDS_ADMIN';

export const createPackCardsAdmin = (payload)=>{
    return async()=>{
        try {
            const createPack = await axios.post(
                'http://localhost:3001/packs/',
                payload
            );
            console.log('created');
            return createPack;
        } catch (error) {
            alert('pack name exist');
            console.log(error)
        }
    }
}