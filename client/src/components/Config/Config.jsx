import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/ProfileUser/Config.module.css";
import BtnUserProfile from "../Buttons/BtnUserProfile";
import { useNavigate } from "react-router-dom";
import { deleteUser, modifyUser } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { FaUserSecret } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import Swal from 'sweetalert2';
import { Button } from 'reactstrap'
import VerifyMail from '../Mail/VerifyMail'
import { changeModal, renderVerifyRegister, successAction } from "../../redux/actions/sendMail";

export default function Config({ user }) {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const email1 = useRef(null);
  const modal = useSelector((state) => state.sendMailReducer.modal)
  const successAction1 = useSelector((state) => state.sendMailReducer.successAction)

  const [input, setInput] = useState(true)
  function deleteAccount() {
    dispatch(deleteUser(user.id));
    Swal.fire({
      title: 'Borrado',
      text: 'Usuario Borrado',
      icon: 'success',
    });
    // dispatch(renderVerifyRegister())
    navigateTo("/");
  }

  function modifyMail(){
    // console.log('changemodal')
    dispatch(changeModal(true))
  }

  useEffect(() => {
       if(!modal && successAction1){
        setInput(!input)
       }
  }, [successAction1])

  function sendMail (e) {
    e.preventDefault()
    let email = email1.current.value
    if(email.length >7){
      dispatch(modifyUser(user.id, {email : email}))
      setInput(!input)
      dispatch(successAction())
    }
  };

function closed(e){
  setInput(true)
  dispatch(successAction())

}

  function changeMail(){
    return(
    <div className={style.mail}>
      <form onSubmit={(e)=>sendMail(e)}>
      <label >Email: </label>
      <input
        type="email"
        name="email"
        placeholder="Ingrese nuevo email..."
        ref={email1}
      />
      <button className={style.button} type="submit">Confirmar</button>
      <button onClick={(e)=>closed(e)}>X</button>
      </form>
    </div>)
  }
  
  return (
    <div className={style.container}>
      <div className={style.config}>
        <h3>
          <center>Profile</center>
        </h3>
        <div className={style.modal}>
          <FaUserSecret />
          <span className={style.span}>
            Username: {user.username}
            {user.RolId !== "user" && ` (${user.RolId})`}
          </span>
        </div>
        <div>
          <BtnUserProfile user={user} property="username" />
        </div>
        <div className={style.modal}>
          <MdPassword />
          <span className={style.span}>Password: </span>
        </div>
        <div>
          <BtnUserProfile user={user} property="password" />
        </div>
        {input ? (<div className={style.modal}>
          <span className={style.span}>Email: {user.email}</span> 
          <Button color='success' onClick={modifyMail}>MODIFY</Button>
        </div>) : changeMail()}
        <div className={style.modal}>
          <span className={style.span}>Score: {user.score}</span>
        </div>
        <div className={style.modal}>
          <span className={style.span}>Deck:{user.DeckId}</span>
        </div>
        <div>
          <button className={style.bdelete} onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
      {modal ? <VerifyMail user={user}/> : ''}
    </div>
  );
}