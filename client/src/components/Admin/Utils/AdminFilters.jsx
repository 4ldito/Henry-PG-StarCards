import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { filterUsers } from "../../../redux/actions/admin";

import css from "./AdminFilters.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const inputSearch = useRef(null);
  const selectRol = useRef(null);
  const selectStatus = useRef(null);

  const [filter, setFilter] = useState({
    search: "",
    rol: "allRols",
    status: "allStatus",
  });

  function onSubmit(e) {
    e.preventDefault();
  }

  function onFilterChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function clearFilters() {
    setFilter({
      search: "",
      rol: "allRols",
      status: "allStatus",
    });
    selectRol.current.selectedIndex = 0;
    selectStatus.current.selectedIndex = 0;
  }

  useEffect(() => {
    dispatch(filterUsers(filter));
  }, [filter]);

  return (
    <div className={css.container}>
      {/* <form onSubmit={onSubmit}> */}
      <input
        className={css.search}
        ref={inputSearch}
        onChange={(e) => onFilterChange(e)}
        name="search"
        value={filter.search}
        list="listaUsers"
        placeholder="search"
      />
      {/* </form> */}
      <select
        className={css.select}
        ref={selectRol}
        onChange={(e) => onFilterChange(e)}
        name="rol"
      >
        <option value="allRols">All rols</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="superadmin">SuperAdmin</option>
      </select>

      <select
        className={css.select}
        ref={selectStatus}
        onChange={(e) => onFilterChange(e)}
        name="status"
      >
        <option value="allStatus">All status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button className={css.search} onClick={clearFilters}>Clear filters</button>
    </div>
  );
}
