import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, modifyUser } from "../../../redux/actions/user";
import { getAllUsers } from "../../../redux/actions/admin";
import Swal from "sweetalert2";
import Filters from "./AdminFilters";

import style from "../ListUsers.module.css";

const ListUsers = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.userReducer.user);
  const [users, setUsers] = useState(false);
  const allUsers = useSelector((state) => state.admin.filteredUsers);

  useEffect(() => {
    dispatch(getAllUsers());
    setUsers(false);
  }, [users]);

  function changeStatus(e, user) {
    e.preventDefault();
    user.StatusId === "active"
      ? dispatch(modifyUser(user.id, { StatusId: "inactive" }, true))
      : dispatch(modifyUser(user.id, { StatusId: "active" }, true));
    setUsers(true);
    dispatch(getAllUsers());
  }

  function changeRol(e, user) {
    e.preventDefault();
    const value = e.target.value;
    let rol;
    value === "user"
      ? (dispatch(modifyUser(user.id, { RolId: "user" }, true)), (rol = "user"))
      : value === "admin"
      ? (dispatch(modifyUser(user.id, { RolId: "admin" }, true)),
        (rol = "admin"))
      : (dispatch(modifyUser(user.id, { RolId: "superadmin" }, true)),
        (rol = "superadmin"));
    Swal.fire({
      title: "Rol Modificado",
      text: `${user.username} es ahora un ${rol}`,
      icon: "success",
    });
    setUsers(true);
  }

  function resetPassword(e, user) {
    e.preventDefault();
    dispatch(modifyUser(user.id, { password: "starcards2022" }, true));
    Swal.fire({
      title: "Contraseña Restablecida",
      text: "La nueva Contraseña es: starcards2022",
      icon: "success",
    });
    setUsers(true);
  }

  function deleteAccount(e, user) {
    dispatch(deleteUser(user.id, true));
    Swal.fire({
      title: "Borrado",
      text: "Usuario Borrado",
      icon: "success",
    });
    setUsers(true);
    if (userActual.id === user.id) navigateTo("/login");
  }

  return (
    <>
      {userActual.RolId !== "user" ? (
        <div className={style.containerUsers}>
          <Filters />
          {
            <div className={style.table}>
              <div className={style.row}>
                <span className={style.userTitle}>user</span>
                <span className={style.statusTitle}>status</span>
                <span className={style.rolTitle}>rol</span>
              </div>
              {allUsers.map((u) => (
                <div className={style.row} key={u.id}>
                  {
                    <Link
                      className={style.user}
                      to={`/userProfile?username=${u.username}`}
                    >
                      {u.username}
                    </Link>
                  }

                  <section className={style.status}>
                    <label>{u.StatusId}</label>
                    {
                      <button onClick={(e) => changeStatus(e, u)}>
                        {u.StatusId === "active" ? "ban 🚫" : "unban"}
                      </button>
                    }
                  </section>

                  {/* {<button onClick={(e)=>changeRol(e,u)}>{u.RolId === 'user' ? 'Up to Admin' : 'Low to User'}</button>} */}

                  {userActual.RolId === "superadmin" && (
                    <section className={style.rol}>
                      <select onChange={(e) => changeRol(e, u)}>
                        <option value={u.RolId} hidden={true}>
                          {u.RolId}
                        </option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                      </select>
                    </section>
                  )}

                  {
                    <button
                      className={style.btn}
                      onClick={(e) => resetPassword(e, u)}
                    >
                      reset password 🔄
                    </button>
                  }
                  {
                    <button
                      className={style.btn}
                      onClick={(e) => deleteAccount(e, u)}
                    >
                      delete account
                    </button>
                  }
                </div>
              ))}
            </div>
          }
        </div>
      ) : (
        navigateTo("/userProfile")
      )}
    </>
  );
};

export default ListUsers;
