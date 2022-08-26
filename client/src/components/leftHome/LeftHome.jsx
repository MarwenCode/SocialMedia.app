import axios from "axios";
import React, { useContext, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useEffect } from "react";
import { AppContext } from "../context/context";
import Reactions from "../reactions/Reactions";
import "./lefthome.scss";

const LeftHome = () => {
  const { user } = useContext(AppContext);
  const [friends, setFriends] = useState([]);
  const image = "http://localhost:5500/images/";

  useEffect(() => {
    const getFriends = async () => {
      try {
        // const friendList = await axios.get(`/user/friends/${user._id}`);
        const friendList = await axios.get("/user/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [user._id]);

  console.log(friends);
  console.log(user);

  return (
    <div className="lefthome">
      <div className="top">
      <Reactions />

      </div>

      <div className="down">
        <div className="friendslist">
          <h4 className="rightbarTitle">User friends</h4>

          <div className="searchFriendsList">
            <FcSearch className="searchIcon" />
            <input
              placeholder="search for a friend"
              className="inputSearchFriend"
            />
          </div>
        </div>

        <div className="leftbarFollowings">
          {friends.map((friend) => (
            <div className="leftbarFollowing">
              <img
                className="leftbarFollowingImg"
                src={
                  friend.profilePicture
                    ? image + friend.profilePicture
                    : "/images/noAvatar.png"
                }
              />
              <span className="leftbarFollowingName">{friend.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftHome;
