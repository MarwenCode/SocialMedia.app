import React, { useState, useEffect, useContext } from "react";
import { BsChatSquareText } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";
import { MdGroups } from "react-icons/md";
import LeftHome from "../../components/leftHome/LeftHome";
import { Link } from "react-router-dom";
import Reactions from "../../components/reactions/Reactions";
import Share from "../../components/share/Share";
import axios from "axios";
import { AppContext } from "../../components/context/context";
import Post from "../../components/post/Post";
import "./profile.scss";

const Profile = () => {
  const { user,dispatch } = useContext(AppContext);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const image = "http://localhost:5500/images/";

  //fetch friends list

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

  //fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await axios.get("/user");
        console.log(usersList);
        setUsers(usersList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  console.log(users);

  //fetch my own posts 

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/post/myposts/${user._id}`);
      console.log(res);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);



//fetch users to follow
// const [followed, setFollowed] = useState(
//   user.followings.includes(user?.id)
// );


// const handleClick = async () => {
//   try {
//     if (followed) {
//       await axios.put(`/user/unfollow/${user._id}`, {
//         userId: user._id,
//       });
//       dispatch({ type: "UNFOLLOW", payload: user._id });
//     } else {
//       await axios.put(`/user/follow/${user._id}`, {
//         userId: user._id,
//       });
//       dispatch({ type: "FOLLOW", payload: user._id });
//     }
//     setFollowed(!followed);
//   } catch (err) {
//   }
// };




  return (
    <div className="profile">
      <div className="news">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <BsChatSquareText className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <FcVideoCall className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <MdGroups className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
        </ul>
        <div className="reactions">
          <Reactions />
        </div>
      </div>
      <div className="center">
        <div className="image">
          <img className="picBack" src="/images/image2.jpeg" />
        </div>

        <div className="share">
          <Share />
        </div>
        <div className="posts">
          {posts.map((post) => (
            <Post post={post} />


          ))}

        </div>
      </div>
      <div className="users">
      <span className="title">
          suggestions
          </span>
         <div className="suggTop">
        
          {users.map((user) => (
            <div className="suggestions">
              <img className="image"  
              src={
                    user.profilePicture
                      ? image + user.profilePicture
                      : "/images/noAvatar.png"
                  }/>

                <Link className="link" to={`/profile/friend/${user._id}`} >
                <span className="name">{user.username}</span>
                </Link>
            
            </div>
          ))}
            </div>
        
        <div className="friendsList">
        <span className="title">
            On Line Friends
          </span>
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
    </div>
  );
};

export default Profile;

