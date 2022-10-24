import React, { useContext, useState, useEffect } from "react";
import { FaTrashAlt, FaRegCommentAlt } from "react-icons/fa";
import {FcLike} from "react-icons/fc";
import {AiOutlineDislike} from "react-icons/ai"
import { MdDeleteForever } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/context";

import "./singlepost.scss";

const SinglePost = () => {
  const { user } = useContext(AppContext);
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const image = "http://localhost:5500/images/";

  const location = useLocation();
  console.log(location);
  const path = location.pathname.split("/")[2];
  console.log(path);

  useEffect(() => {
    const getPost = async () => {
      // const res = await axios.get("https://social-media-app-vp1y.onrender.com/api/post/" + path);
      const res = await axios.get("/post/" + path);
      console.log(res.data);
      setPost(res.data);
      //   setTitle(res.data.title);
      //   setDescription(res.data.description)
    };

    getPost();
  }, [path]);

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`/comments/${comments._id}` + path);
      console.log(res.data);
      setComments(res.data);
      //   setTitle(res.data.title);
      //   setDescription(res.data.description)
    };

    getComments();
  }, [path]);

  console.log(comments);
  console.log(post);

  //add comment
  const addComment = (e) => {
    e.preventDefault();
    const newComment = {
      // commenterId: user.commenterId,
      userId: user._id,
      username: user.username,
      text: comments,
    };

    try {
      const res = axios.post(`/comments/${post._id}`, newComment);

      setComments(res.data);

      console.log("test");
      console.log(res);

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    addComment();
  };

  //Delete comment
  const deleteComment = async () => {
    // setComment(comment.filter(el => el._id !== comment._id))
    // const CommentDeleted = {
    //   commenterId : user._id
    // }
    try {
      // await axios.delete(`/comments/${comment._id}`
      await axios.delete(`/comments/${comments._id}`,

        {

          // data: { userId: user._id },
          // data:{comments: comment._id}
          // data: { username: user.username },
          // comments: {comments._id} ,
         
        }
      );
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }

    // const newList = comment.filter((item) => {
    //   return item.id !== id

    // })

    // setComment(newList)

    // console.log(comment)
    // console.log(newList)
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={image + user.profilePicture} />

            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.createdAt}</span>
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
          <FcLike className="likeIcon"   / >
          <AiOutlineDislike className="likeIcon" />

            <span className="postLikeCounter">like it 20 {post.likes} </span>

            <div className="deletePost">
              <FaTrashAlt />
            </div>
          </div>
          <div className="comment">
            
            {comments.map((comment) => (
              <div className="commentText">
                <p className="text">{comment.text}</p>
                <span className="commentUser">{comment.username}</span>
                {/* <div className="editDeleteComment">
                  <FaRegCommentAlt className="edit" />
                  <MdDeleteForever onClick={deleteComment} className="delete" />
                </div> */}
              </div>
            ))}
            {/* <div className="iconRespond">
              <img className="likeIcon" src="./images/like.png" />
              <FaRegCommentAlt
                className="respond"
                onClick={() => setCommentMode((prev) => !prev)}
              />
              <span>add comment</span>
              <button className="addComment" onClick={(e) => addComment(e)}>
                reply
              </button>
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
  );
};

export default SinglePost;

//////////////////////////////////////////////////////////////////////////:

//  {/* {post.comments.map((comment) => ( */}
//  {post.comments.map((comment) => (
//     <div className="commentText">
//       <p className="text">{comment.text}</p>
//       <span className="commentUser">{comment.username}</span>
//       <div className="editDeleteComment">

//         <FaRegCommentAlt className="edit"/>

// {/*
//         <MdDeleteForever  onClick={deleteComment} className="delete"/> */}

//       </div>
//      </div>
//   ))}
//   <div className="iconRespond">
//     <img className="likeIcon" src="./images/like.png" />
//     <FaRegCommentAlt
//       className="respond"
//       onClick={() => setCommentMode((prev) => !prev)}
//     />
//     {/* <span>add comment</span> */}
//     <button
//       className="addComment"
//       // onClick={(e) => addComment(e)}>reply</button>
//       // onClick={(e) => addComment(e)}
//       >
//           reply
//           </button>
//   </div>
//   {commentMode && (
//     <textarea
//       className="respondInput"
//       value={comments}
//       onChange={(e) => setComments(e.target.value)}
//     />
//   )}
