import useValidToken from "../../hooks/useValidToken";
import ListUsers from "./ListUsers";
import Transactions from "./Transactions/Transactions";

import style from './AdminProfile.module.css';

export default function renderAdmin() {
    useValidToken({ navigate: true });

    return (
        <div className={style.container}>
            <ListUsers/>
            <Transactions/>
        </div>
    )
}