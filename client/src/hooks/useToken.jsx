import { useJwt } from 'react-jwt';
import { useDispatch } from 'react-redux';


export const useToken = ({token}) => {
    const {decodedToken,isExpired} = useJwt(token);
    return decodedToken
}





