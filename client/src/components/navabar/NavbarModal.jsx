import React, { useContext, useState } from "react";
import { AppContext } from "../context/context";
import { FaRegTimesCircle, FaRegSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navbarModal.scss";

const Modal = () => {
  const { modalOpen, setModalOpen, user, dispatch } = useContext(AppContext);
 

  // const closeModal = () => {
  //   setModalOpen(prev => prev(!modalOpen))
  // }
  const Navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    Navigate("/login");
  };






  return (
    <div className="navbarModal">
      <div className="sign">
        <ul className="signList">
          <FaRegTimesCircle
            className="close"
            onClick={() => setModalOpen((prev) => !prev)}
          />

          {user && (
            <>
                 <Link to={`/profile/${user._id}`} className="link"   onClick={() => setModalOpen((prev) => !prev)}  >
               <li className="item">Profile</li>
             </Link>
            <li className="item" onClick={handleLogout}>
              Logout
            </li>
            
            </>
          
          )}

          {/* <li className="signItemLogin">Login</li>
  
        <li className="signItemRegister">Register</li> */}
          <li className="item">
            Setting 
            <FaRegSun className="settingItem" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
