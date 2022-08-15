import React,{useContext, useState} from 'react'
import { AppContext } from '../context/context';
import {FaRegTimesCircle, FaRegSun} from "react-icons/fa"
import "./modal.scss"

const Modal = () => {
  const { modalOpen, setModalOpen } = useContext(AppContext);

  // const closeModal = () => {
  //   setModalOpen(prev => prev(!modalOpen))
  // }
  return (
    <div className="modalbackground">
        <div className="sign">
        <FaRegTimesCircle className="close" onClick={() => setModalOpen((prev) => !prev)}/>
        <li className="logout">Logout</li>
  
        <li className="signItemLogin">Login</li>
  
        <li className="signItemRegister">Register</li>
        <li className="setting">
        Setting <FaRegSun className='settingItem'/>
        </li>
       
      
        
  
  
          </div>

    </div>
  )
}

export default Modal