import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useValidToken from "../../hooks/useValidToken";
import { getAllUsers, modifyUser } from "../../redux/actions/user";
import style from "./AdminProfile.module.css";
import Swal from 'sweetalert2';

export default function Admin(){
    const navigateTo = useNavigate()
    const { validToken } = useValidToken({ navigate: false });
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.userReducer.users);
    const user = useSelector((state) => state.userReducer.user);
    const [users, setUsers] = useState(false)

    useEffect(() => {
                dispatch(getAllUsers())
                setUsers(false)
    }, [users])
    
    function changeStatus(e,user){
        user.StatusId === 'active' ?
        dispatch(modifyUser(user.id, {StatusId: 'inactive'}))
        :   dispatch(modifyUser(user.id, {StatusId: 'active'}))
        setUsers(true)
    }

    function changeRol(e,user){
        user.RolId === 'user' ?
            dispatch(modifyUser(user.id, {RolId: 'admin'}))
        :   dispatch(modifyUser(user.id, {RolId: 'user'}))    
        setUsers(true)
    }

    

    function listUsers(){
        return(
            <>
            {validToken && user.Rol !== 'user' ? (<div className={style.containerUsers}>
                {allUsers.map((user)=>
                    <ul key={user.id}>
                        <li>
                        {<Link to={`/userProfile?username=${user.username}`}>{user.username}</Link>}
                        
                        {<label>Status: {user.StatusId}</label>}
                        {<button onClick={(e)=>changeStatus(e,user)}>{user.StatusId === 'active' ? 'Ban' : 'Unban'}</button>}


                        {<label>Rol: {user.RolId}</label>}
                        {<button onClick={(e)=>changeRol(e,user)}>{user.RolId === 'user' ? 'Up to Admin' : 'Low to User'}</button>}
                        
                        </li>
                    </ul>
                    )}
            </div>) : navigateTo('/login')}
            </>
            )
    }
    return(
        <div>
            {listUsers()}
        </div>
    )
}