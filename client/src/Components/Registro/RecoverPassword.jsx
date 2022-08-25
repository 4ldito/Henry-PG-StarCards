import style from './login.module.css'
import style2 from '../../styles/landingPage/landingPage.module.css'
import style3 from '../../styles/register/Register.module.css'
import { useEffect, useRef, useState } from 'react';
import { getUserByEmail, userClean } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { changeModal, sendMail, successAction } from '../../redux/actions/sendMail';
import VerifyRegister from '../Mail/VerifyRegister';

export default function RecoverPassword(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const validUser = useSelector(state => state.userReducer.validUser);
    const modal = useSelector((state) => state.sendMailReducer.modal)
    const successAction1 = useSelector((state) => state.sendMailReducer.successAction)
    const [render, setRender] = useState(true)
    const [userPass, setUserPass] = useState(true)
    const input1 = useRef(null)
    const input2 = useRef(null)
    const [input, setInput] = useState({
        username: '',
        email: ''
      });

      useEffect(() => {

      }, [modal])
      
useEffect(() => {
  if(user.email && validUser){
    if(user.username !== input.username){
      Swal.fire({
        title: 'error',
        text: 'Las credenciales no coinciden',
        icon: 'error',
      });
      input1.current.value= ''
      input2.current.value= ''
      dispatch(userClean())    
    }
    else{                             
      dispatch(sendMail({email: input.email}))
      setUserPass(user)
      Swal.fire({
        title: 'Token',
        text: 'Se envio Token al Mail ingresado',
        icon: 'success',
      });
      input1.current.value= ''
      input2.current.value= ''
      dispatch(userClean())   
      setRender(false)
    }
  }
  else if(!user.email && validUser){
        Swal.fire({
          title: 'error',
          text: 'No se encontro usuario',
          icon: 'error',
        });
        input1.current.value= ''
        input2.current.value= ''
        dispatch(userClean())
      }
}, [user])

function login(e){
    e.preventDefault();
    dispatch(getUserByEmail(input.email))
}

function handleOnChange (e){
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
}

    return(
        <div className={style.appli}>
        <div className={style2.options}>
          {(render && !modal)? (
          <div><div className={style.inputcontainer}>
            <label style={{fontSize:"larger"}}>Ingrese Username </label>
            <input className= {style3.input} style={{width:"400px"}} type="text" name="username"  ref={input1} onChange={handleOnChange} />
          </div>
          <div className={style.inputcontainer}>
            <label style={{fontSize:"larger"}}>Ingrese Email </label>
            <input  className= {style3.input} style={{width:"400px"}} type="email" name="email" ref={input2} onChange={handleOnChange} />
          </div>
          <div style={{height:"15px"}}></div>
          <div className={style.buttoncontainer}>
            <button className={style2.button}  onClick={(e)=>login(e)} data='Recuperar Contraseña'></button>
          </div></div>) : <VerifyRegister userPass={userPass} email={input.email}/>}
      </div>
    </div>
    )
}