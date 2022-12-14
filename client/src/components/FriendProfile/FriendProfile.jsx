import React, { useState, useEffect, useContext } from "react";
import { BsChatSquareText } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { FaTrashAlt, FaRegCommentAlt, FaEdit } from "react-icons/fa";
import { ArrowLeft, CloudSlash } from "phosphor-react";
import { MdDeleteForever } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import LeftHome from "../../components/leftHome/LeftHome";
import { Link, useLocation } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import Reactions from "../../components/reactions/Reactions";
import Share from "../../components/share/Share";
import axios from "axios";
import { AppContext } from "../../components/context/context";
import Post from "../post/Post";

import "./friendprofile.scss";

// const getlocalStorage = () => {
//   let follow = localStorage.getItem("follow");
//   if (follow) {
//     return JSON.parse(localStorage.getItem("follow"));
//   } else {
//     return [];
//   }
// };

const FriendProfile = () => {

  const [friendProfile, setFriendProfile] = useState([]);
  const [followers, setFollowers] = useState("");
  const [followings, setFollowings] = useState("");
  const { user: currentUser, dispatch } = useContext(AppContext);
  const [friends, setFriends] = useState([]);
  // const [followed, setFollowed] = useState(getlocalStorage(false));

  // const [unFollow , setUnFollow] = useState(true)
  const location = useLocation();
  console.log(location);
  const path = location.pathname.split("/")[3];
  console.log(path);

  const [follow, setFollow] =useState(
    currentUser.followings.includes(path)
    // currentUser._id
    // "follow"
    // false
    );
    const [unFollow, setUnFollow] = useState("UnFollow")
    // currentUser.followings.includes(friendProfile?._id)
    // user.followings.includes(friendProfile?._id) ||
    // user.followings.includes(friendProfile?._id)

    // "Follow"
    // "UnFollow"
    // "Follow"
    // null

  console.log(follow);

  const [users, setUsers] = useState([]);

  const [posts, setPosts] = useState([]);

  const image = "https://social-media-app-vp1y.onrender.com/api/images/";

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get(`/profile/friend/${user._id}`);
      const res = await axios.get(
        "https://social-media-app-vp1y.onrender.com/api/profile/friend/" + path
      );
      console.log(res);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // const usersList = await axios.get("/user");
        const usersList = await axios.get(
          "https://social-media-app-vp1y.onrender.com/api/user"
        );
        console.log(usersList);
        setUsers(usersList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  //get profile friend

  useEffect(() => {
    const profileFriend = async () => {
      try {
        //  fetch("/friend/info/" + path, {method: 'GET'})
        //  .then(response => response.json())
        // //  .then(data => setFriendProfile(data))
        //  .then(data => console.log(data))
        //   // const data = await res.json()
        //   // console.log(data)
        //   // setFriendProfile(data)

        const res = await axios.get(
          "https://social-media-app-vp1y.onrender.com/api/user/" + path
        );
        console.log(res.data);
        setFriendProfile(res.data);
        setFollowers(res.data.followers);
        setFollowings(res.data.followings);
      } catch (error) {
        console.log(error);
      }
    };
    profileFriend();
  }, [path]);

  //set followers & followings
  const handleFollow = async () => {
    try {
      if (follow) {
        await axios.put(
          `https://social-media-app-vp1y.onrender.com/api/user/unfollow/${path}`,
          {
            userId: currentUser._id,
          }
        );

        dispatch({ type: "UNFOLLOW", payload: friendProfile._id });
        // window.location.replace(`/user/friend/${path}`);
        // setFollow((prev) => !prev)
        // setUnFollow(unFollow)

        console.log("unfollow");
        // setFollow(!follow);
      } else {
        await axios.put(
          `https://social-media-app-vp1y.onrender.com/api/user/follow/${path}`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: friendProfile._id });
        console.log("follow");
        // window.location.replace(`/user/friend/${path}`);
        // setFollow(follow);
        // setFollow((prev) => !prev)

        // setFollow(true)
      }

      setFollow(!follow)
      // setFollow((prev) => !prev)
      // setFollow(false)
      // setFollow((prev) => !prev)
      // setFollow(false);
    } catch (error) {
      console.log(error);
    }
    // setFollow(true)
    // setFollow((prev) => !prev)          
  };

  console.log(follow);

  const [commentMode, setCommentMode] = useState(false);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  // get all comments and stock it all in const [comment, seComment]
  useEffect(() => {
    const fetchComment = async () => {
      // const res = await axios.get(`/comments/${comment._id}`);
      const res = await axios.get(
        `https://social-media-app-vp1y.onrender.com/api/comments/${comment._id}`
      );

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
      axios.put(
        "https://social-media-app-vp1y.onrender.com/api/post/" +
        // post._id +
   
          "/like",
        { userId: currentUser._id }
      );
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // useEffect(() => {
  //   localStorage.setItem("follow", JSON.stringify(followed));
  // }, [followed]);


  //add comment


  // const addComment = (e) => {
  //   e.preventDefault();
  //   const newComment = {
  //     // commenterId: user.commenterId,
  //     userId: currentUser._id,
  //     username: currentUser.username,
  //     text: comments,
  //   };

  //   try {
  //     // const res = axios.post(`/comments/${post._id}`, newComment);
  //     const res = axios.post(
  //       `https://social-media-app-vp1y.onrender.com/api/comments/${post._id}`,
  //       newComment
  //     );

  //     setComments(res.data);

  //     console.log("test");
  //     console.log(res);

  //     console.log(res.data);

  //     window.location.replace("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   addComment();
  // };



console.log(posts);


  return (
    <div className="profile">
      <div className="leftSide">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <Link to="/chat" className='link'>
          <BsChatSquareText className="sidebarIcon" />
          <span className="sidebarListItemText">Chats</span>
          </Link>
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
        {/* <div className="informations">
          <li className="list">Age</li>
          <li className="list">City</li>
          <li className="list">Occupation</li>
        </div> */}
        {/* <div className="follow" onClick={() => setFollowed((prev) => !prev)}>
          <button className="followBtn">
            {followed ? "Follow" : "UnFollow"}
          </button>
        </div> */}
      </div>
      <div className="center">
        {/* <div className="image">
          <img className="picBack" src="/images/image2.jpeg" />
        </div> */}

        <div className="posts">
          <div className="profileIntro">
            <div className="top">
              <ArrowLeft />
              <div className="firstbloc">
                <div className="right">
                  {/* <img src="/images/noAvatar.png" /> */}
                  <img src={friendProfile.profilePicture} />
                </div>
                {friendProfile.username !== currentUser.username && (
                  <div className="left">
                    <button onClick={() => handleFollow(friendProfile._id)}>
                      {follow ? "unfollow" : "Follow" }
                      {/* {unFollow && "follow" } */}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="center">
              <span>{friendProfile.username}</span>
              <p>Description</p>
              <span className="joined">
                member since {new Date(friendProfile.createdAt).toDateString()}
              </span>
              <div className="follow">
                <span className="followers">{followers.length} Followers</span>
                <span>{followings.length} Followings</span>
              </div>
            </div>
          </div>
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
                    {/* <img
                      className="likeIcon"
                      src="./images/like.png"
                      onClick={likeHandler}
                    />
                    <img
                      className="likeIcon"
                      src="./images/heart.png"
                      onClick={likeHandler}
                    /> */}
                    <FcLike className="likeIcon" onClick={likeHandler} />

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
                    <div className="iconRespond">
                 
                      {/* <img className="likeIcon" src="./images/like.png" /> */}
                      <Link to={`/commentsfriendprofile/${post._id}`} className="link" >
                      <FaRegCommentAlt
                        className="respond"
                        // onClick={() => setCommentMode((prev) => !prev)}
                        
                      />     <span> add a comment</span>
                     
                      </Link>
                    
                       {/* <button
                    className="addComment"
                    // onClick={(e) => addComment(e)}>reply</button>
                    onClick={(e) => addComment(e)}>
                    reply
                  </button> */}
                    </div>
                    {commentMode && (
                      <textarea
                        className="respondInput"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    )}
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
