import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllTransactions } from "../redux/actions/transaction";

const useFetchTransactions = () => {

    const dispatch = useDispatch();

    const filteredTransactions = useSelector((state) => state.transactionsReducer.filteredTransactions);

    useEffect(() => {
        dispatch(getAllTransactions());
    }, []);
    return { filteredTransactions }
}

export default useFetchTransactions