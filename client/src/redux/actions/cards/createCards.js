import axios from 'axios';

export const CREATE_CARDS_ADMIN = 'CREATE_CARDS_ADMIN';

export default function createCardsAdmin(payload){
    return async()=>{
        try {
            const createCard = await axios.post(
                'http://localhost:3001/cards/',
                payload
            );
            console.log('created');
            return createCard;
        } catch (error) {
            alert('action error');
            console.log(error)
        }
    }
}