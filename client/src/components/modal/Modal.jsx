import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../components/context/context";
import axios from 'axios';
import "./modal.scss";

const Modal = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user, dispatch } = useContext(AppContext);

  //update profile
  const updateProfile = async (e) => {
    e.preventDefault();
    const updateData = {
      userId: user._id,
      username,
      email,
      password,
    };

    try {
       const res =await axios.put("https://social-media-app-vp1y.onrender.com/api/user/" + user._id,
        updateData
      );
      //  const data = await res.json()
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    window.location.replace(`/profile/${user._id}`)
    setShowModal(!showModal)
    updateProfile()
  
  };

  return (
    <div className="modal">
      <form className="settingForm" onSubmit={updateProfile}>
        <div className="settingProfilePicutre">
          {/* <img src={file ? URL.createObjectURL(file) : + publicFolder+user.profilePic} */}
          {/* <img src={file && URL.createObjectURL(file)} /> */}
          <img src="" />
          <label>
            {/* <i className="settingsPPIcon far fa-user-circle"></i> */}
          </label>
          {/* <input
          type="file"
          className="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        /> */}
        </div>

        <div className="inputText">
          <label>username</label>
          <input
            type="text"
            //   placeholder={user.username}
            className="settingInput"
              onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            //   placeholder={user.email}
            className="settingInput"
              onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            className="settingInput"
              onChange={(e) => setPasswrod(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button
            className="settingsSubmit "
            type="submit"
          >
            Update
          </button>
          <button
            className="settingsSubmit"
            style={{ margin: "20px" }}
            onClick={() => setShowModal(!showModal)}>
            Cancel
          </button>
        </div>

        {/* {successMessage && (
        <span
          style={{
            color: "green",
          }}>
          Your profile has been updated
        </span>
      )} */}
      </form>
    </div>
  );
};

export default Modal;
