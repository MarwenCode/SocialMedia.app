import React, { useState, useEffect, useContext } from "react";
import { BsChatSquareText } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { FaTrashAlt, FaRegCommentAlt, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import LeftHome from "../../components/leftHome/LeftHome";
import { Link, useLocation } from "react-router-dom";
import Reactions from "../../components/reactions/Reactions";
import Share from "../../components/share/Share";
import axios from "axios";
import { AppContext } from "../../components/context/context";
import Post from "../post/Post";

import "./friendprofile.scss";

const getlocalStorage = () => {
  let follow = localStorage.getItem("follow");
  if (follow) {
    return JSON.parse(localStorage.getItem("follow"));
  } else {
    return [];
  }
};

const FriendProfile = () => {
  const { user, dispatch } = useContext(AppContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(getlocalStorage(false));
  const location = useLocation();
  console.log(location);
  const path = location.pathname.split("/")[3];
  console.log(path);

  const [users, setUsers] = useState([]);

  const [posts, setPosts] = useState([]);

  const image = "http://localhost:5500/images/";

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get(`/profile/friend/${user._id}`);
      const res = await axios.get("https://social-media-app-vp1y.onrender.com/api/profile/friend/" + path);
      console.log(res);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

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

  const [commentMode, setCommentMode] = useState(false);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  // get all comments and stock it all in const [comment, seComment]
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/comments/${comment._id}`);

      console.log(res);
      setComment(res.data);
    };

    fetchComment();
  }, []);

  console.log(comment);

  //like and deslike a post
  const [like, setLike] = useState();

  const [isLiked, setIsLiked] = useState(false);

  // useEffect(() => {
  //   setIsLiked(post.likes.includes(user._id));
  // }, [user._id, post.likes]);

  const likeHandler = () => {
    try {
      // axios.put("/post/" + post._id + "/like", { userId: user._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    localStorage.setItem("follow", JSON.stringify(followed));
  }, [followed]);

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
        <div className="informations">
          <li className="list">Age</li>
          <li className="list">City</li>
          <li className="list">Occupation</li>
        </div>
        <div className="follow" onClick={() => setFollowed((prev) => !prev)}>
          <button className="followBtn">
            {followed ? "Follow" : "UnFollow"}
          </button>
        </div>
      </div>
      <div className="center">
        <div className="image">
          <img className="picBack" src="/images/image2.jpeg" />
        </div>

        <div className="posts">
          {posts.map((post) => (
            <div className="post">
              <div className="postWrapper">
                <div className="postTop">
                  <div className="postTopLeft">
                    <img
                      className="postProfileImg"
                      src={"/images/noAvatar.png"}
                      alt=""
                    />

                    <span className="postUsername">{post.username}</span>
                    <span className="postDate">
                      {new Date(post.createdAt).toDateString()}
                    </span>
                  </div>
                </div>
                <div className="postCenter">
                  <span className="postText"> {post.desc} </span>
                  {/* <img className="postImg" src="./images/image2.jpeg" /> */}
                  <img className="postImg" src={image + post.img} alt="" />
                </div>
                <div className="postBottom">
                  <div className="postBottomLeft">
                    <img
                      className="likeIcon"
                      src="./images/like.png"
                      onClick={likeHandler}
                    />
                    <img
                      className="likeIcon"
                      src="./images/heart.png"
                      onClick={likeHandler}
                    />

                    <span className="postLikeCounter">like it {like} </span>
                  </div>
                  <div className="comment">
                    {/* {post.comments.map((comment) => ( */}
                    {post.comments.map((comment) => (
                      <div className="commentText">
                        <p className="text"> {comment.text}</p>

                        <span className="commentUser">{comment.username}</span>
                        <div className="editDeleteComment"></div>
                      </div>
                    ))}
                    {/* <div className="iconRespond">
                      <img className="likeIcon" src="./images/like.png" />
                      <FaRegCommentAlt
                        className="respond"
                        onClick={() => setCommentMode((prev) => !prev)}
                      />
                    </div> */}
                    {/* {commentMode && (
                      <textarea
                        className="respondInput"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="users"></div>
    </div>
  );
};

export default FriendProfile;
