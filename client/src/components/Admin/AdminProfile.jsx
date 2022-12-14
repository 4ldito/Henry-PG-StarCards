import useValidToken from "../../hooks/useValidToken";
import ListUsers from "./Utils/ListUsers";
import Transactions from "./Transactions/Transactions";
import CreatePacks from "./Utils/CreatePacks";
import Store from "./Utils/Store";
import css from "./AdminProfile.module.css";
import { useState } from "react";
import React from "react";
import CreateCards from "./Utils/CreateCards";

export default function renderAdmin() {
  useValidToken({ navigate: true });

  const [render, setRender] = useState("ListUsers");

  function changeRender(e) {
    let value = e.target.value;
    if (value === render) return setRender("ListUsers");
    setRender(value);
  }
  return (
    <div className={css.container}>
      <div className={css.secciones}>
        <button className={render === "ListUsers" ? css.btnSeccionActive : css.btnSeccion} value="ListUsers" onClick={(e) => changeRender(e)}>
          List Users
        </button>
        <button className={render === "Transactions" ? css.btnSeccionActive : css.btnSeccion} value="Transactions" onClick={(e) => changeRender(e)}>
          Transactions
        </button>
        <button className={render === "CreatePacks" ? css.btnSeccionActive : css.btnSeccion} value="CreatePacks" onClick={(e) => changeRender(e)}>
          Create Packs
        </button>
        <button className={render === "Store" ? css.btnSeccionActive : css.btnSeccion} value="Store" onClick={(e) => changeRender(e)}>
          Store
        </button>
      </div>

      {render === "ListUsers" ? (
        <ListUsers />
      ) : render === "Transactions" ? (
        <Transactions />
      ) : render === "Store" ? (
        <Store />
      ) : render === "CreatePacks" ? (
        <CreatePacks />
      ) : render === "CreateCards" ? (
        <CreateCards />
      ) : ("")}
    </div>
  );
}
