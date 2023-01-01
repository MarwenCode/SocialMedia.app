import React, { useRef, useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../components/context/context";
import "./register.scss";

const Register = () => {
  const { user, dispatch } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //handle erros form

  // const [values, setValues] = useState({
  //   username:"",
  //   password:""
  // })

  // const [errors, setErrors] = useState({})

  // const handleChange = (e) => {
  //   setValues({...values, [e.target.name]: e.target.value})
  // }

  // const validationForm = (values) => {
  //   // let errors= {}

  //   if(!values.username) {
  //     errors.name ="username is required"
  //   }else if (values.username.length < 4) {
  //     errors.name ="username must be more than 4 characters"
  //   }
  //   if(!values.password) {
  //     errors.name ="password is required"
  //   }else if (values.username.length < 4) {
  //     errors.name ="password must be more than 4 characters"
  //   }

  //   return errors

  // }

  // const validationForm = (values) => {
  //   const newErrors = {...errors};

  //   if(!username || email || password || passwordAgain) {
  //     newErrors = "this element is required"
  //   }else if (username.length < 3 )  {

  //     newErrors = "the element must be at least 3 characters long"
  //   }else {
  //     newErrors= ""
  //   }

  //   if(password.length < 5 || passwordAgain.length < 5) {

  //     newErrors = 'Password must be at least 8 characters long';
  //   } else {
  //     newErrors =""
  //   }

  //  setErrors(newErrors)

  // }

  // const formValidation = () => {
  //   const newErrors = {...errorMessage};

  //    // Clear any existing error message
  //    setErrorMessage("");
  //    // Validate the form fields
  //    if (username.length < 4) {
  //     //  setErrorMessage("Username must be at least 4 characters");
  //      newErrors.username = "Username must be at least 4 characters"
  //      // return;
  //    }
  //    if (password.length < 6 || password !== passwordAgain) {
  //     //  setErrorMessage(
  //     //    "Password must be at least 6 characters & must match with confirm password"
  //     //  );
  //     newErrors.password = "Password must be at least 6 characters & must match with confirm password"
  //      // return;
  //    }

  //    setErrorMessage(newErrors)

  // }

  const handleRegister = async (e) => {
    e.preventDefault();
    // Clear any existing error message
    setErrorMessage("");
    // Validate the form fields
    // if (username.length < 4) {
    //   setErrorMessage('Username must be at least 4 characters');
    //   return;
    // }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    if (passwordAgain !== password) {
      setErrorMessage("Password are not match");
      return;
    }

    dispatch({ type: "LOGIN_START" });

    try {
      // const res = await axios.post("/auth/register", {
      const res = await axios.post(
        "https://social-media-app-vp1y.onrender.com/api/auth/register",
        {
          password,
          username,
          email,
        }
      );
      localStorage.setItem("user", JSON.stringify(res));
      console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      //   res.data && window.location.replace("/login");
      res.data && window.location.replace("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.res.data);
    }
  };
  console.log(user);
  console.log(errorMessage);

  return (
    <div className="register">
      <div className="loginWrapper">
        <div className="loginLeft">
          <span className="loginDesc">Make a touch & connect every where.</span>
          <p>
            Already have an account?
            <Link to="/login" className="link">
              <span
                style={{
                  textDecoration: "none",
                  color: "#1c7ed6",
                }}>
                Login
              </span>
            </Link>
          </p>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              placeholder="Username"
              className="loginInput"
              type="text"
              // name="username"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              // onChange={handleChange}
            />
            {/* {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>} */}
            {/* {errors.username && <p>{errors.username}</p>} */}
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              // name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //  onChange={handleChange}
            />
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            {/* {errorMessage.password && <p>{errorMessage.password}</p>} */}
            <input
              placeholder="Confirm Password "
              className="loginInput"
              type="password"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

            <button className="loginButton" type="submit">
              Sign in
            </button>
            {/* <button className="loginRegisterButton">
            Create a New Account
          </button> */}
            {/* <Link to="/login">
          <button className='loginButton'>if you have a profile Log in </button>
          </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
