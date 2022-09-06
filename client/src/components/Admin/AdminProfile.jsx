import useValidToken from "../../hooks/useValidToken";
import ListUsers from "./Utils/ListUsers";
import Transactions from "./Transactions/Transactions";
import CreatePacks from "./Utils/CreatePacks";
import Store from "./Utils/Store";
import style from './AdminProfile.module.css';
import { useState } from "react";
import React from "react";


export default function renderAdmin() {
    useValidToken({ navigate: true });

    const [render, setRender] = useState('ListUsers')

      function changeRender(e) {
        let value = e.target.value;
        if (value === render) return setRender('ListUsers');
        setRender(value)
      }
    return (
        <div className={style.container}>
            <button 
                value="ListUsers"
                onClick={(e) => changeRender(e)}
                >
                ListUsers
            </button>
            
            <button 
                value="Transactions"
                onClick={(e) => changeRender(e)}
                >
                Transactions
            </button>

            <button 
                value="CreatePacks"
                onClick={(e) => changeRender(e)}
                >
                CreatePacks
            </button> 

            <button 
                value="CreateCards"
                onClick={(e) => changeRender(e)}
                >
                CreateCards
            </button>  

            <button 
                value="Store"
                onClick={(e) => changeRender(e)}
                >
                Store
            </button>        
            
            {render === "ListUsers" ? (
                <ListUsers/>
            ) : render === "Transactions" ? (
                <Transactions/>
            )
             : render === "Store" ? (
                <Store/>
            ) 
            : render === "CreatePacks" ? (
                <CreatePacks />
            ) : (
                ""
            )}       
            </div>
    )
}