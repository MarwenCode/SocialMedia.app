import React, { useRef,useContext, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/context/context';
import "./register.scss"


const Register = () => {
    const {user,dispatch } = useContext(AppContext)
 
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordAgain, setPasswordAgain] = useState()
  
    const Navigate = useNavigate()
  
    const handleRegister = async(e) => {
   
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
          // const res = await axios.post("/auth/register", {
          const res = await axios.post("https://social-media-app-vp1y.onrender.com/api/auth/register", {
            username,
            email,
            password,
          });
          localStorage.setItem("user", JSON.stringify(res))
          console.log(res)
          dispatch({type:"LOGIN_SUCCESS",payload: res.data})
        //   res.data && window.location.replace("/login");
          res.data && window.location.replace("/login");
        }catch(error) {
          console.log(error)
         
        }
    
      }
  console.log(user)
 
  return (
    <div className="register">
    <div className="loginWrapper">
      <div className="loginLeft">
        <img src="images/logo.jpg" className='logo'/>
        <span className="loginDesc">
          Make a touch and connect every where.
        </span>
      </div>
      <div className="loginRight" >
        <form className="loginBox"  onSubmit={handleRegister}>
        <input placeholder="Username" className="loginInput"
        onChange={(e) => setUsername(e.target.value)}
        
        />
          <input placeholder="Email" type="email" className="loginInput" required 
             onChange={(e) => setEmail(e.target.value)}
           />
          <input placeholder="Password" type="password" className="loginInput" 
           onChange={(e) => setPassword(e.target.value)}
          
          />
          <input placeholder="Confirm Password " className="loginInput" type="password" 
                   onChange={(e) => setPasswordAgain(e.target.value)}
          
          />
          <button className="loginButton"  type="submit" >Sign in</button>
          <button className="loginRegisterButton">
            Create a New Account
          </button>
          <Link to="/login">
          <button className='loginButton'>if you have a profile Log in </button>
          </Link>
         
        </form>
      </div>
    </div>
  </div>
  )
}

export default Register;

// {isFetching ? "Loading" : "Log In"}

