import React, { useRef,useContext,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/context/context';
import "./login.scss"


const Login = () => {
 
  const {user, dispatch } = useContext(AppContext);


//   const email = useRef();
//   const password = useRef();

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()


  const handleLogin = async(e) => {
    e.preventDefault()
    dispatch({type:"LOGIN_START"})

    try {
        // const res = await axios.post("/auth/login", {
        const res = await axios.post("https://social-media-app-vp1y.onrender.com/api/auth/login", {
            email,
            password
        })
        console.log(res)
        dispatch({type:"LOGIN_SUCCESS",payload: res.data})
        res.data && window.location.replace("/");
        
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE"})

        
    }

   }
  console.log(user)
 
  return (
    <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <img src="images/logo.jpg" className='logo'/>
        <span className="loginDesc">
          Make a touch and connect every where.
        </span>
      </div>
      <div className="loginRight" >
        <form className="loginBox"  onSubmit={handleLogin}>
          <input placeholder="Email" type="email" className="loginInput" required  
           onChange={(e) => setEmail(e.target.value)}
          
          
          />
          <input placeholder="Password" type="password" className="loginInput" 
          onChange={(e) => setPassword(e.target.value)}
          
          />
          <button className="loginButton"  type="submit" >Log in</button>
          <span className="loginForgot">Forgot Password?</span>
        
          <Link to="/register">
          <button className="loginRegisterButton">
            Create a New Account
          </button>
          
          </Link>
        
         
        
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login;

// {isFetching ? "Loading" : "Log In"}

