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
        value === "1"
          ? render==="ListUsers" ? setRender('ListUsers') : setRender("ListUsers")
          : value === "2"
          ? render==="Transactions" ? setRender('ListUsers') : setRender("Transactions")
          : value === "3"
          ? render==="CreatePacks" ? setRender('ListUsers') : setRender("CreatePacks")
          : value === "4"
          ? render==="CreateCards" ? setRender('ListUsers') : setRender("CreateCards")
          : value === "5"
          ? render==="Store" ? setRender('ListUsers') : setRender("Store")
          : setRender('ListUsers')
      }

    return (
        <div className={style.container}>
            <button 
                value="1"
                onClick={(e) => changeRender(e)}
                >
                ListUsers
            </button>
            
            <button 
                value="2"
                onClick={(e) => changeRender(e)}
                >
                Transactions
            </button>

            <button 
                value="3"
                onClick={(e) => changeRender(e)}
                >
                CreatePacks
            </button> 

            <button 
                value="4"
                onClick={(e) => changeRender(e)}
                >
                CreateCards
            </button>  

            <button 
                value="5"
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