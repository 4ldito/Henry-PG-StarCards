import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);
    //set user in context and push them home
    const setUserContext = async () => {
    return await axios.get('/user').then(res => {
        setUser(res.data.currentUser);
        history.push('/home');
        }).catch((err) => {
        setError(err.response.data);
    })
    }
    //register user
    const registerUser = async (data) => {
        const { username, email, password, passwordConfirm } = data;
        return axios.post(`auth/register`, {
            username, email, password, passwordConfirm
        }).then(async () => {
            await setUserContext();
        }).catch((err) => {
            setError(err.response.data);
        })
        };
    return {
    registerUser,
    error
    }
    }