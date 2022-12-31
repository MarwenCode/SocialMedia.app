import axios from "axios";
import { useEffect, useState } from "react";
import "./onlinefriends.scss";

const OnlineFriends = ({currentId,setCurrentChat }) => {
const [friends, setFriends] = useState([]);


//get friends list
useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/user/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);
  
  console.log(friends);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversation/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };




  return (
    <div className="chatOnline">
      {friends.map((friend) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(friend)} >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  )
}

export default OnlineFriends