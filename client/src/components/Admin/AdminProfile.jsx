import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, modifyUser } from "../../redux/actions/user";
import { getAllUsers } from "../../redux/actions/admin";
import style from "./AdminProfile.module.css";
import useValidToken from "../../hooks/useValidToken";
import Swal from 'sweetalert2';
import Filters from './AdminFilters'

export default function renderAdmin(){
    const { validToken } = useValidToken({ navigate: false });
    const navigateTo = useNavigate()
    const dispatch = useDispatch();
    // const allUsers = useSelector((state) => state.userReducer.users);
    const userActual = useSelector((state) => state.userReducer.user);
    const [users, setUsers] = useState(false)
    const allUsers = useSelector((state) => state.admin.filteredUsers);

    useEffect(() => {
                dispatch(getAllUsers())
                setUsers(false)
    }, [users])
    
    function changeStatus(e,user){
        e.preventDefault()
        user.StatusId === 'active' ?
        dispatch(modifyUser(user.id, {StatusId: 'inactive'}, true))
        :   dispatch(modifyUser(user.id, {StatusId: 'active'}, true))
        setUsers(true)
        dispatch(getAllUsers())
    }

    function changeRol(e,user){
        e.preventDefault()
        const value = e.target.value
        let rol;
        value === 'user' ? (dispatch(modifyUser(user.id, {RolId: 'user'}, true)), rol = 'user')
        :
        value === 'admin' ?  (dispatch(modifyUser(user.id, {RolId: 'admin'}, true)), rol = 'admin') 
        :   
        (dispatch(modifyUser(user.id, {RolId: 'superadmin'}, true)), rol = 'superadmin') 
        Swal.fire({
            title: 'Rol Modificado',
            text: `${user.username} es ahora un ${rol}`,
            icon: 'success',
          });   
        setUsers(true)
    }

    function resetPassword(e, user){
        e.preventDefault()
        dispatch(modifyUser(user.id, {password: 'starcards2022'}, true))
        Swal.fire({
            title: 'Contraseña Restablecida',
            text: 'La nueva Contraseña es: starcards2022',
            icon: 'success',
          });
          setUsers(true)
    }

    function deleteAccount(e,user){
        dispatch(deleteUser(user.id, true));
        Swal.fire({
          title: 'Borrado',
          text: 'Usuario Borrado',
          icon: 'success',
        });
        setUsers(true)
        if(userActual.id === user.id) navigateTo('/login')
    }

    
    function listUsers(){
        return(
            <>
            {(validToken && userActual.RolId !== 'user') ? (<div className={style.containerUsers}>
                    <Filters/>
                    {<ul >
                {allUsers.map((u)=>
                        <li key={u.id}>
                        {<Link to={`/userProfile?username=${u.username}`}>{u.username}</Link>}
                        
                        <label>Status: {u.StatusId}</label>
                        {<button onClick={(e)=>changeStatus(e,u)}>{u.StatusId === 'active' ? 'Ban' : 'Unban'}</button>}

                        {/* {<button onClick={(e)=>changeRol(e,u)}>{u.RolId === 'user' ? 'Up to Admin' : 'Low to User'}</button>} */}
                        
                        {userActual.RolId === 'superadmin' && 
                            ( <><label>Rol:</label>
                            <select onChange={(e)=>changeRol(e,u)}> 
                                <option value={u.RolId} hidden={true}>{u.RolId}</option>
                                <option value="user" >User</option>
                                <option value="admin" >Admin</option>
                                <option value="superadmin" >Superadmin</option>
                            </select></>)
                        }

                        {<button onClick={(e)=>resetPassword(e,u)}>Reset Password</button>}
                        {<button onClick={(e)=>deleteAccount(e,u)}>Delete Account</button>}
                        </li>
                )}
                    </ul>
                    }
            </div>) : navigateTo('/userProfile')}
            </>
            )
    }
    return(
        <div>
            {listUsers()}
        </div>
    )
}