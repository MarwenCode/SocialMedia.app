import { FcFolder } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { useContext, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import axios from "axios";
import "./share.scss";
import { AppContext } from "../context/context";
// import Emoji from "./Emoji";

const Share = () => {
  const { user } = useContext(AppContext);
  const image = "http://localhost:5500/images/";
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const idImage = Date.now();
      data.append("name",idImage);
      data.append("file",file);
      newPost.img = idImage;
    //   console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {}
  };

  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={image + user.profilePicture} alt="" />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
            value={inputStr}
            onChange={e => setInputStr(e.target.value)}
          />

          <div className="Emoji">
            {showPicker && <span>{showPicker.emoji}</span>}
          </div>
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <MdCancel className="shareCancelImg" onClick={() => setFile(null)} />
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
              {/* {chosenEmoji &&   <Emoji />} */}

              {/* <EmojiEmotions htmlColor="goldenrod" className="shareIcon"   /> */}
              {/* {showPicker && <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={onEmojiClick} />
          } */}
              {/* <div className="picker"> <Picker onEmojiClick={onEmojiClick}/></div> */}
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;

{
  /* {chosenEmoji && <Picker onEmojiClick={onEmojiClick} htmlColor="goldenrod" className="shareIcon" /> } */
}
{
  /* <Picker onEmojiClick={onEmojiClick} htmlColor="goldenrod" className="shareIcon" /> */
}
