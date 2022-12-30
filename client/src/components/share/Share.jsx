import { FcFolder } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { useContext, useRef, useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import axios from "axios";
import "./share.scss";
import { AppContext } from "../context/context";
// import {Image, Video, Transformation} from 'cloudinary-react';
// import Emoji from "./Emoji";

const Share = () => {
  const { user } = useContext(AppContext);
  const image = "https://social-media-app-vp1y.onrender.com/api/images/";
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // const { apiKey, apiSecret, cloudName } = useCloudinary({
  //     cloudName: 'djzv6xzgd',
  //     apiKey: '388734543329589',
  //     apiSecret: 'diIBcaMWqEu5LA91weAU7nS76lE'
  // });

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      username: user.username,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const idImage = Date.now() + file.name;
      data.append("name", idImage);
      data.append("file", file);
      newPost.img = idImage;
      console.log(newPost);

      try {
        await axios.post(
          "https://social-media-app-vp1y.onrender.com/api/upload",
          data
        );
        // await axios.post("/upload", data);
      } catch (err) {}
    }
    if(video) {
    
      

        const handleVideo = () => {
        
          let findLink = desc.split(" ");
          for (let i = 0; i < findLink.length; i++) {
            if (
              findLink[i].includes("https://www.yout") ||
              findLink[i].includes("https://yout")
            ) {
              let embed = findLink[i].replace("watch?v=", "embed/");
              setVideo(embed.split("&")[0]);
              findLink.splice(i, 1);
              // setMessage(findLink.join(" "));
              // setPostPicture('');
            }
          }
        };
        handleVideo();
     

    }

    try {
      await axios.post(
        "https://social-media-app-vp1y.onrender.com/api/post",
        newPost
      );
      // await axios.post("/post", newPost)
      window.location.reload();
    } catch (err) {}
  };
  //   const handleFileChange = (event) => {
  //     const file = event.target.files[0];
  //     cloudinary.uploader.upload(file, (error, result) => {
  //         if (error) {
  //             console.error(error);
  //         } else {
  //             setVideo(result.url);
  //         }
  //     });
  // }

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  //close the emoji modal
  // useEffect(() => {
  //   const closeEmojiModal = (e) => {
  //     console.log(e)
  //     if (e.tagname !== "INPUT")

  //     setShowPicker((prev) => !prev)
  //   }
  //   // document.body.addEventListener("click", closeEmojiModal);
  //   // return () => document.body.removeEventListener("click", closeEmojiModal)
  // }, [])

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
          // className="shareProfileImg"
          // src={
          //   user.profilePicture
          //     ? image + user.profilePicture
          //     :
          //     "/images/noAvatar.png"
          // }
          // alt=""
          />
          <input
            // placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
          />

          <div className="Emoji">
            {showPicker && <span>{showPicker.emoji}</span>}
          </div>
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <MdCancel
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file">
              <FcFolder className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
           
            </label>
          

            <div className="shareOption">
              <BsEmojiSmile
                htmlColor="goldenrod"
                className="shareIcon"
                onClick={() => setShowPicker((prev) => !prev)}
              />

              {showPicker && (
                <Picker
                  pickerStyle={{ width: "100%" }}
                  onEmojiClick={onEmojiClick}
                />
              )}
            </div>
          </div>
          {showPicker && (
            <button
              className="EmojiCloseBtn"
              onClick={() => setShowPicker((prev) => !prev)}>
              X
            </button>
          )}
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
