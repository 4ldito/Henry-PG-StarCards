import { useDispatch } from 'react-redux';

export const useToken = ({ token }) => {
    
    const { decodedToken, isExpired } = useJwt(token);

    return decodedToken
}





