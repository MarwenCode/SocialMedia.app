import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../components/context/context";
import axios from "axios";
import "./modal.scss";

const Modal = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(AppContext);

  //update profile
  const updateProfile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", profilePic);
    data.append("upload_preset", "uploads");
    try {
      const uploadFiles = await axios.post(
        "https://api.cloudinary.com/v1_1/djzv6xzgd/image/upload",
        data
      );
      console.log(uploadFiles.data);
      const { url } = uploadFiles.data;

    
      const updateData = {
        userId: user._id,
        username,
        email,
        password,
        profilePicture: url,
      };

      try {
        const res = await axios.put(
          "https://social-media-app-vp1y.onrender.com/api/user/" + user._id,
          updateData
        );
        //  const data = await res.json()
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      setShowModal(!showModal);
      window.location.replace(`/profile/${user._id}`);
      
      updateProfile();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user)

  return (
    <>
       {!showModal && (
      <div className="modal">
      <form className="settingForm" onSubmit={updateProfile}>
        <div className="settingProfilePicutre">
          {/* <img src={file ? URL.createObjectURL(file) : + publicFolder+user.profilePic} */}
          {/* <img src={file && URL.createObjectURL(file)} /> */}
          {/* <img src={URL.createObjectURL(profilePic)} /> */}
          {/* <img src={user.profilePicture} /> */}
          <img  src={
                user
                  ? user.profilePicture
                  :

                "/images/image1.jpg"
              }/>
          <label>
            <i className="settingsPPIcon far fa-user-circle"></i>
          </label>
          <input
          type="file"
          className="fileInput"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="settingsSubmit " type="submit"
          onClick={(e) => updateProfile(e)} 
          
          
          >
            Update
          </button>
          <button
            className="settingsSubmit"
            style={{ margin: "20px" }}
            onClick={() => setShowModal((prev) => !prev)}>
        
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










    )


  }
    
    
    
    </>
    
 
 
  );
};

export default Modal;
