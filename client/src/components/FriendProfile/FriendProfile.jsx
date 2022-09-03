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
  let follow = localStorage.getItem("follow")
  if(follow) {
    return JSON.parse(localStorage.getItem("follow"))
  }else {
    return []

  }
}









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
      const res = await axios.get("/profile/friend/" + path);
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
      // const res = await axios.get("/comments")
      const res = await axios.get(`/comments/${comment._id}`);

      console.log(res);
      setComment(res.data);
    };

    fetchComment();
  }, []);

  console.log(comment);

  // add comment and stock it on const [comments, setComments]

  // const addComment = (e) => {
  //   e.preventDefault();
  //   const newComment = {
  //     // commenterId: user.commenterId,
  //     userId: user._id,
  //     username: user.username,
  //     text: comments,
  //   };

  //   try {
  //     const res = axios.post(`/comments/${post._id}`, newComment);

  //     setComments(res.data);

  //     console.log("test");
  //     console.log(res);

  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   addComment();
  // };

  // }, [])

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

  // const deleteComment = async (commentId) => {
  //   console.log(commentId);
  //   try {
  //     await axios.delete(
  //       `/comments/${commentId}`,

  //       {
  //         data: { userId: user._id },
  //         // data:{comments: comment._id}
  //         // data: { username: user.username },
  //         // comments: {comments._id} ,
  //       }
  //     );
  //     window.location.replace("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



//   const handleClick = async () => {
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

useEffect(() => {
  localStorage.setItem("follow", JSON.stringify(followed))

}, [followed])



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
        <div className="follow"  onClick={() => setFollowed((prev) => !prev)}>
          <button className="followBtn" >
        
          {followed ? "Follow" : "UnFollow"}
                  {/* {followed ? <RiUserUnfollowFill /> : <RiUserFollowFill />} */}
          </button>
        </div>
      </div>
      <div className="center">
        <div className="image">
          <img className="picBack" src="/images/image2.jpeg" />
        </div>

        
        <div className="posts">
          {posts.map((post) => (
            // <Post post={post} />
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
                  <div className="postTopRight">{/* <MoreVert /> */}</div>
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
                        <div className="editDeleteComment">
                          {/* <GiConfirmed className="edit" onClick={handleEdit} /> */}
                          {/* <FaEdit
                    className="edit"
                    onClick={() => setEditMode((prev) => !prev)}
                  /> */}
                          {/* <FaEdit className="edit"  onClick={handleEdit} /> */}
{/* 
                          <MdDeleteForever
                            onClick={() => deleteComment(comment._id)}
                            className="delete"
                          /> */}
                        </div>
                      </div>
                    ))}
                    <div className="iconRespond">
                      <img className="likeIcon" src="./images/like.png" />
                      <FaRegCommentAlt
                        className="respond"
                        onClick={() => setCommentMode((prev) => !prev)}
                      />
                      {/* <span>add comment</span> */}
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
      <div className="users">
        {/* <div className="suggTop">

          <span className="title">
          suggestions
          </span>


       
        
          {users.map((user) => (
            <div className="suggestions">
              <img className="image"  
              src={
                    user.profilePicture
                      ? image + user.profilePicture
                      : "/images/noAvatar.png"
                  }/>

                <Link to={`/profile/friend/${user._id}`} >
                <span className="name">{user.username}</span>
                </Link>
            
            </div>
          ))}
            </div> */}

        {/* <div className="friendsList">
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
        </div> */}
      </div>
    </div>
  );
};

export default FriendProfile;
