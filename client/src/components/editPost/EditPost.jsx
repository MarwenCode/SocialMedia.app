import React, { useContext, useState } from "react";
import { FaTrashAlt, FaRegCommentAlt, FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { PencilSimple } from "phosphor-react";
import { AiOutlineDislike } from "react-icons/ai";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/context";
// import Post from "../post/Post"
import { useEffect } from "react";

const EditPost = () => {
    const { user } = useContext(AppContext);
    const [singlePost, setSinglePost] = useState([]);

    const location = useLocation();
    console.log(location);
    const path = location.pathname.split("/")[2];
    console.log(path);




    useEffect(() => {
        const getSinglePost = async() => {
            const res = await axios.get(`/post/${path}`)
            // const res = await axios.get("https://social-media-app-vp1y.onrender.com/api/post/" + path)
            console.log(res.data);
            setSinglePost(res.data)
        }
        getSinglePost()
    }, [path])

console.log(singlePost)


//////////////
const [commentMode, setCommentMode] = useState(false);

const [comments, setComments] = useState([]);
const [comment, setComment] = useState([]);
const [text, setText] = useState("");
const Location = useLocation();

console.log(Location);
const { userId } = useParams();

// get all comments and stock it all in const [comment, seComment]

useEffect(() => {
  const fetchCommentsData = async () => {
    // const res = await axios.get("/comments")
    const res = await axios.get(
      `https://social-media-app-vp1y.onrender.com/api/comments/${comment._id}`
    );

    console.log(res);
    setComment(res.data);
    // setEditComment(res.data.editComment);
    // setText(res.data.comment)
  };

  fetchCommentsData();
}, [comment._id]);

console.log(comment);

// add comment and stock it on const [comment, setComment]

const addComment = (e) => {
  e.preventDefault();
  const newComment = {
    // commenterId: user.commenterId,
    userId: user._id,
    username: user.username,
    text: comments,
  };

  try {
    // const res = axios.post(`/comments/${post._id}`, newComment);
    const res = axios.post(
      `https://social-media-app-vp1y.onrender.com/api/comments/${singlePost._id}`,
      newComment
    );

    setComments(res.data);

    console.log("test");
    console.log(res);

    console.log(res.data);

    window.location.replace("/");
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
    // await axios.delete(`/post/${post._id}`, {
    await axios.delete(
      `https://social-media-app-vp1y.onrender.com/api/post/${singlePost._id}`,
      {
        data: { userId: user._id },
      }
    );
    window.location.replace("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (commentId) => {
  console.log();
  try {
    // await axios.delete(`/comments/${commentId}`,
    await axios.delete(
      `https://social-media-app-vp1y.onrender.com/api/comments/${commentId}`,

      {
        data: { userId: user._id },
        // data:{comments: comment._id}
        // data: { username: user.username },
        // comments: {comments._id} ,
      }
    );
    window.location.replace("/");
  } catch (error) {
    console.log(error);
  }
};

//like and deslike a post
// const [like, setLike] = useState(singlePost.likes.length);
const [like, setLike] = useState();

const [isLiked, setIsLiked] = useState(false);

// useEffect(() => {
//   setIsLiked(post.likes.includes(user._id));
// }, [user._id, post.likes]);

const likeHandler = () => {
  try {
    axios.put(
      "https://social-media-app-vp1y.onrender.com/api/post/" +
      singlePost._id +
        "/like",
      { userId: user._id }
    );
    // axios.put("/post/" + post._id + "/like", { userId: user._id });
  } catch (err) {}
  setLike(isLiked ? like - 1 : like + 1);
  setIsLiked(!isLiked);
};

//Edit post

const [edit, setEdit] = useState("");

// const handleEdit = async() => {
//   try {
//     await axios.put(`/comments/${post._id}`, {
//       username: user.username,
//       userId: user._id,
//       text:edit
//     });

//     setEditComment(false)

//     // setComments(comments)

//   } catch (error) {

//   }
// }

//edit a comment
const [editComment, setEditComment] = useState("");
const [editModeComment, setEditModeComment] = useState(false);

// const showEditComment = (e) => {
//   if(editComment === comment.id) {
//     setComment(editComment)
//     setEditComment(true)
//   }else {
//     return false
//   }
// }

const handleEdit = async (commentId) => {
  try {
    await axios.put(
      `https://social-media-app-vp1y.onrender.com/api/comments/${commentId}`,
      {
        username: user.username,
        userId: user._id,
        text: editComment,
      }
    );
    window.location.replace("/");

    // const specificComment = comments.find((currentComment) => currentComment._id === commentId)
    // console.log(post)

    // setComment(specificComment.editComment)

    // setEditModeComment(false)
    // setEditComment(editComment)
  } catch (error) {}
};

  return (
    // <div className="singlePost">
          <div className="post">
    <div className="postWrapper">
      <div className="postTop">
        <div className="postTopLeft">
          <img
          // className="postProfileImg"
          // src={
          //   user.profilePicture
          //     ? image + user.profilePicture
          //     : "/images/noAvatar.png"
          // }
          // alt=""
          />

          {/* <img
          className="postImg"
          src={
            user.profilePicture
              ? image + user.profilePicture
              :  "/images/noAvatar.png"
          }
          alt=""
        /> */}
  
          <span className="postUsername">{singlePost.username}</span>
       
          <span className="postDate">
            {new Date(singlePost.createdAt).toDateString()}
          </span>
          <Link to={`/editPost/${singlePost._id}`} className="link">
          <span className="editPost"> <PencilSimple /></span>
          
          </Link>
       
        </div>
        <div className="postTopRight">{/* <MoreVert /> */}</div>
      </div>
      <div className="postCenter">
        <span className="postText"> {singlePost.desc} </span>
        {/* <img className="postImg" src="./images/image2.jpeg" /> */}
        {/* <img className="postImg" src={image + singlePost.img} alt="" /> */}
      </div>
      <div className="postBottom">
        <div className="postBottomLeft">
          {/* <img
            className="likeIcon"
            src="./images/like.png"
            onClick={likeHandler}
          /> */}
          <FcLike className="likeIcon" onClick={likeHandler} />
          {/* <AiOutlineDislike className="likeIcon" onClick={likeHandler} /> */}
          {/* <img
            className="likeIcon"
            src="./images/heart.png"
            onClick={likeHandler}
          /> */}

          <span className="postLikeCounter">like it {like} </span>

          <div className="deletePost">
            <FaTrashAlt onClick={deletePost} />
          </div>
        </div>
        <div className="comment">
          {comments.map((comment) => (
            <div className="commentText">
              {editModeComment ? (
                <>
                  <textarea
                    className="commentInput"
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                  />

                  <button
                    className="updateCommentBtn"
                    onClick={() => handleEdit(comment._id)}>
                    update
                  </button>
                </>
              ) : (
                <p className="text"> {comment.text} <span><span className="timeAgo"> {new Date(singlePost.createdAt).toDateString()}</span></span>   </p>
              )}

              {!editModeComment && (
                <>
                  <span className="commentUser">{comment.username}</span>
                  
                  <div className="editDeleteComment">
                    {/* <GiConfirmed className="edit"
                    //  onClick={handleEdit}
                     
                     /> */}
                    <FaEdit
                      className="edit"
                      onClick={() => setEditModeComment((prev) => !prev)}
                      // onClick={showEditComment}
                    />
                    {/* <FaEdit className="edit"  onClick={handleEdit} /> */}

                    <MdDeleteForever
                      onClick={() => deleteComment(comment._id)}
                      className="delete"
                    />
                  </div>
                </>
              )}
            </div>
          ))}

          {!editModeComment && (
            <div className="iconRespond">
              {/* <img className="likeIcon" src="./images/like.png" /> */}
              {/* <span className="likeIcon">
                <BiLike />
              </span> */}

              <FaRegCommentAlt
                className="respond"
                onClick={() => setCommentMode((prev) => !prev)}
              />

              {/* <span>add comment</span> */}
              {commentMode && (
                <button
                  className="addComment"
                  // onClick={(e) => addComment(e)}>reply</button>
                  onClick={(e) => addComment(e)}>
                  reply
                </button>
              )}
            </div>
          )}
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

    // </div>



  
  )
}

export default EditPost