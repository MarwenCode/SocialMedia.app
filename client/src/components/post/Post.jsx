import React, { useContext, useState } from "react";
import { FaTrashAlt, FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/context";
import "./post.scss";
import { useEffect } from "react";

const Post = ({ post }) => {
  const { user } = useContext(AppContext);
  const image = "http://localhost:5500/images/";
  const [commentMode, setCommentMode] = useState(false);

  const [comments, setComments] = useState([]);

  const addComment = (e) => {
    e.preventDefault();
    const newComment = {
      commenterId: user.commenterId,
      username: user.username,
      text: comments,
    };

    try {
      const res = axios.post(`/comments/${post._id}`, newComment);

      setComments(res.data);

      console.log("test");

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    addComment();
  };
  console.log(addComment);
  console.log(comments);

  // }, [])

  const deletePost = async () => {
    try {
      await axios.delete(`/post/${post._id}`, {
        data: { userId: user._id },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(post._id);
  // console.log(post);

  // console.log(post.comments);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg"  src={
                  image + user.profilePicture
                 
                } />

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
            <img className="likeIcon" src="./images/like.png" />
            <img className="likeIcon" src="./images/heart.png" />

            <span className="postLikeCounter">like it 20 {post.likes} </span>

            <div className="deletePost">
              <FaTrashAlt onClick={deletePost} />
            </div>
          </div>
          <div className="comment">
            {/* {post.comments.map((comment) => ( */}
            {post.comments.map((comment) => (
              // <div className="text">
                <p className="text">{comment.text}</p>
              // </div>
            ))}
            <div className="iconRespond">
              <img className="likeIcon" src="./images/like.png" />
              <FaRegCommentAlt
                className="respond"
                onClick={() => setCommentMode((prev) => !prev)}
              />
              {/* <span>add comment</span> */}
              <button
                className="addComment"
                // onClick={(e) => addComment(e)}>reply</button>
                onClick={(e) => addComment(e)}>reply</button>
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
  );
};

export default Post;
