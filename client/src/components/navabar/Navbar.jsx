import React, { useState, useContext, useEffect } from "react";
import "./navbar.scss";
import { FaSearch, FaRegEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { modalOpen, setModalOpen ,user} = useContext(AppContext);
  //   const publicFolder = "http://localhost:8000/images/";
  //   const [posts, setPosts] = useState([]);
  const Navigate = useNavigate();


  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [searchActive, setSearchActive] = useState(false);

  //   const handleLogout = () => {
  //     dispatch({ type: "LOGOUT" });
  //     // window.location.replace("/login")
  //     Navigate("/login")
  //   };

  //   useEffect(() => {
  //     const fetchPosts = async () => {
  //       const res = await axios.get("/post");
  //       console.log(res);
  //       setPosts(res.data);
  //     };

  //     fetchPosts();
  //   }, []);

  //   const handleClickSearchTerm = () => {
  //     setSearchActive(false);
  //   };

  //   useEffect(() => {
  //     const closeSearchBox = (e) => {
  //       console.log(e);
  //       if (e.path[0].tagName !== "INPUT") {
  //         setSearchActive(false);
  //       }
  //     };
  //     document.body.addEventListener("click", closeSearchBox);
  //     return () => document.body.removeEventListener("click", closeSearchBox);
  //   }, []);

  return (
    <div className="navbar">
      <div className="leftnavbar">
      </div>
      <div className="searchSection">
        <div className="FasearchInput">
          <FaSearch className="Fasearch" />
          <input
            className="inputSearch"
            type="text"
            placeholder="search for a post..."
          />
        </div>
      </div>
      <div className="setting">
        <div className="settingList">
        <ul className="list">
          <Link to={`/profile/${user._id}`} className="link" >
          <li className="item">Profile</li>
          </Link>
        
          <Link to="/"  className="link" >
          <li className="item">Home</li>
          </Link>
       
          <li  className="item">
            <FaRegEnvelope  /> 
            <span className="IconBadge">2</span>
            
            </li>
        </ul>

        </div>
        <div className="sign">
        
      <img className="topImg"  src="images/image1.jpg" onClick={() => {
        setModalOpen(true)
      }}/>
      {/* <span className="logout">Logout</span>

      <span className="signItemLogin">Login</span>

      <span className="signItemRegister">Register</span> */}


        </div>



      </div>
 
    </div>
  );
};

export default Navbar;

