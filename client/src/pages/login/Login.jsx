import React, { useRef, useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../components/context/context";
import "./login.scss";
import Spinner from "../../components/spinner/Spinner";
import { useEffect } from "react";

const Login = () => {
  const { user, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  //   const email = useRef();
  //   const password = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      // const res = await axios.post("/auth/login", {
      const res = await axios.post(
        "https://social-media-app-vp1y.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      // res.data && window.location.replace("/");

      setTimeout(() => {
        setLoading(true);
        res.data && window.location.replace("/");
      }, 3000);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  console.log(user);

  return (
    <div className="login">
      {loading ? (
        <Spinner />
      ) : (
        <div className="loginWrapper">
          <div className="loginLeft">
            {/* <img src="images/logo.jpg" className='logo'/> */}
            <span className="loginDesc">
              Make a touch & connect every where.
            </span>
            <p>
              Do not have an account?
              <Link to="/register" className="link">
                <span
                  style={{
                    textDecoration: "none",
                    color: "#1c7ed6",
                  }}>
                  Register
                </span>
              </Link>
            </p>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleLogin}>
              <label>Email</label>
              <input
                placeholder="Email"
                type="email"
                className="loginInput"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                className="loginInput"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="loginButton" type="submit">
                Login
              </button>

          
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
