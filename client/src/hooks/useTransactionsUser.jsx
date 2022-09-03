import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionsByUser } from './../redux/actions/transaction';

const useTransactionsUser = (userId) => {

    const dispatch = useDispatch();
    const transactionsUser = useSelector((state) => state.transactionsReducer.transactionsUser);

    useEffect(() => {
        dispatch(getTransactionsByUser(userId));
    }, []);

    return { transactionsUser }
}

export default useTransactionsUser;