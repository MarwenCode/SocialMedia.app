import React, { useContext, useState } from "react";
import { FaTrashAlt, FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/context";
import "./post.scss";
import { useEffect } from "react";

const Post = ({ post }) => {
  const { user } = useContext(AppContext);
  const image = "http://localhost:5500/images/";
  const [commentMode, setCommentMode] = useState(false)

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const Location = useLocation();

  console.log(Location);
  const { userId } = useParams();

  // const commentDelete = comments.map(commentDelete)

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

  const deleteComment = async (commentId ) => {
    console.log(commentId)
    try {
      await axios.delete(
        `/comments/${commentId}`,

        {
          data: { userId: user._id},
          // data:{comments: comment._id}
          // data: { username: user.username },
          // comments: {comments._id} ,
        }
      );
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }

    

    // setComment(newList)

    // console.log(comment)
    // console.log(newList)
  };

  // console.log(post._id);
  // console.log(post);

  // console.log(post.comments);


  //like and deslike a post 
  const [like, setLike] = useState(post.likes.length);
 
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("/post/" + post._id +"like",{userId: user._id })
      
    } catch (err) {
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
      
    }
  }


  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={
              user.profilePicture
                ? image + user.profilePicture
                :  "/images/noAvatar.png"
            }
            alt="" />

            {/* <img
            className="postImg"
            src={
              user.profilePicture
                ? image + user.profilePicture
                :  "/images/noAvatar.png"
            }
            alt=""
          /> */}

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
            <img className="likeIcon" src="./images/like.png"  onClick={likeHandler} />
            <img className="likeIcon" src="./images/heart.png"  onClick={likeHandler} />

            <span className="postLikeCounter">like it 20 {post.likes} </span>

            <div className="deletePost">
              <FaTrashAlt onClick={deletePost} />
            </div>
          </div>
          <div className="comment">
            {/* {post.comments.map((comment) => ( */}
            {post.comments.map((comment) => (
              <div className="commentText">
                <p className="text">{comment.text}</p>
                <span className="commentUser">{comment.username}</span>
                <div className="editDeleteComment">
                  <Link to={`/post/${comment._id}`} className="link">
                    <FaRegCommentAlt className="edit" />
                  </Link>
                  <MdDeleteForever onClick={deleteComment} className="delete" />
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
              <button
                className="addComment"
                // onClick={(e) => addComment(e)}>reply</button>
                onClick={(e) => addComment(e)}>
                reply
              </button>
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

