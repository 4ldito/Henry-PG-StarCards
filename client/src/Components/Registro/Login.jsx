import React, {useState} from 'react'
import axios from 'axios'
import { signIn } from '../../redux/actions/user'
import './login.css'
import { useDispatch } from 'react-redux'

export default function Login () {
  /*const { loginWithRedirect } = useAuth0()
  return (
    <button onClick={() => loginWithRedirect()}>Login</button>
  )
    */
    const dispatch = useDispatch();
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const [input, setInput] = useState({
      loginPassword:'',
      loginEmail: ''
    });
    // User Login info

    const login = () => {
      dispatch(signIn({loginEmail,loginUsername,loginPassword}));
    };

    const handleOnChange= (e)=> {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    }
  
    const errors = {
      uname: "invalid username",
      pass: "invalid password"
    };
  
    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
  
      var { uname, pass } = document.forms[0];
  
      // Find user login info
      const userData = database.find((user) => user.username === uname.value);
  
      // Compare user info
      if (userData) {
        if (userData.password !== pass.value) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsSubmitted(true);
        }
      } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );
  
    // JSX code for login form
    const renderForm = (
      <div className="form">
        <form onSubmit={login}>
          <div className="input-container">
            <label>Username </label>
            <input type="email" name="email" onChange={handleOnChange} required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" onChange={handleOnChange} required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  
    return (
      <div className="appli">
        <div className="login-form">
          <div className="title">Sign In</div>
          {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
      </div>
    );
   
    
  
}
