import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useValidToken from "../../hooks/useValidToken";
import { getAllUsers, modifyUser } from "../../redux/actions/user";
import style from "./AdminProfile.module.css";
import Swal from 'sweetalert2';

export default function renderAdmin(){
    const { validToken } = useValidToken({ navigate: false });
    const navigateTo = useNavigate()
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.userReducer.users);
    const userActual = useSelector((state) => state.userReducer.user);
    const [users, setUsers] = useState(false)

    useEffect(() => {
                dispatch(getAllUsers())
                setUsers(false)
    }, [users])
    
    function changeStatus(e,user){
        user.StatusId === 'active' ?
        dispatch(modifyUser(user.id, {StatusId: 'inactive'}, true))
        :   dispatch(modifyUser(user.id, {StatusId: 'active'}, true))
        setUsers(true)
    }

    function changeRol(e,user){
        user.RolId === 'user' ?
            dispatch(modifyUser(user.id, {RolId: 'admin'}, true))
        :   dispatch(modifyUser(user.id, {RolId: 'user'}, true))    
        setUsers(true)
    }

    function resetPassword(e, user){
        dispatch(modifyUser(user.id, {password: 'starcards2022'}, true))
        Swal.fire({
            title: 'Contraseña Restablecida',
            text: 'La nueva Contraseña es: starcards2022',
            icon: 'success',
          });
          setUsers(true)
    }

    function listUsers(){
        return(
            <>
            {(validToken && userActual.RolId !== 'user') ? (<div className={style.containerUsers}>
                    {<ul >
                {allUsers.map((u)=>
                        <li key={u.id}>
                        {<Link to={`/userProfile?username=${u.username}`}>{u.username}</Link>}
                        
                        {<label>Status: {u.StatusId}</label>}
                        {<button onClick={(e)=>changeStatus(e,u)}>{u.StatusId === 'active' ? 'Ban' : 'Unban'}</button>}

                        {<label>Rol: {u.RolId}</label>}
                        {<button onClick={(e)=>changeRol(e,u)}>{u.RolId === 'user' ? 'Up to Admin' : 'Low to User'}</button>}
                        
                        {<button onClick={(e)=>resetPassword(e,u)}>Reset Password</button>}
                        </li>
                )}
                    </ul>
                    }
            </div>) : console.log(validToken, userActual.RolId)}
            </>
            )
    }
    return(
        <div>
            {listUsers()}
        </div>
    )
}