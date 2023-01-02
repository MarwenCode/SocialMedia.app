import React, { useContext, useState,useEffect, useRef } from "react";
import { FaTrashAlt, FaRegCommentAlt, FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { PencilSimple } from "phosphor-react";
import { AiOutlineDislike } from "react-icons/ai";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../components/context/context";
import "./commentfriendprofile.scss"

const CommentsFriendProfile = () => {
    const { user, dispatch } = useContext(AppContext);
    console.log(user);

    //add a comment
    const [comment, setComment] = useState([])

    //comment mode 
    const [commentMode, setCommentMode] = useState(false);
    //edit a comment
const [editComment, setEditComment] = useState("");
const [editModeComment, setEditModeComment] = useState(false);

    const location = useLocation();
  console.log(location);
  const path = location.pathname.split("/")[2];
  console.log(path);


  //get a single post
  const [post, setPost] = useState([])

  useEffect(() => {
    const fetchPost = async() => {
        const res = await axios.get("https://social-media-app-vp1y.onrender.com/api/post/"+ path )

        console.log(res.data)
        setPost(res.data)


    }
    fetchPost()
  }, [])

  console.log(post);


  //add a comment
  const addComment = (e) => {
    e.preventDefault();
    const newComment = {
      // commenterId: user.commenterId,
      userId: user._id,
      username: user.username,
      text: comment,
    };

    try {
      // const res = axios.post(`/comments/${post._id}`, newComment);
      const res = axios.post(
        `https://social-media-app-vp1y.onrender.com/api/comments/${path}`,
        newComment
      );

      setComment(res.data);

      console.log("test");
      console.log(res);

      console.log(res.data);

      window.location.replace(`/commentsfriendprofile/${path}`);
    } catch (err) {
      console.log(err);
    }
    addComment();
  };

  //edit a comment
  const EditComment = async (commentId) => {
    try {
      await axios.put(
        `https://social-media-app-vp1y.onrender.com/api/comments/${commentId}`,
        {
          username: user.username,
          userId: user._id,
          text: editComment,
        }
      );

      window.location.replace(`/commentsfriendprofile/${path}`);
    } catch (error) {}
  };


  // delete a comment
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
      window.location.replace(`/commentsfriendprofile/${path}`);
    } catch (error) {
      console.log(error);
    }
  };

 //like and deslike a post
 const [like, setLike] = useState();
//  post?.likes?.length

 const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    try {
      axios.put(
       ` https://social-media-app-vp1y.onrender.com/api/post/${path}/like`,
        { userId: user._id }
      );
      // axios.put("/post/" + post._id + "/like", { userId: user._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };




console.log(like)



  return (
    <div className='commentFriendsPost'>
        <div className="postWrapper">
<div className="postTop">
  <div className="postTopLeft">
    <img

  /> 

    <span className="postUsername">{post.username}</span>

    <span className="postDate">
      {new Date(post.createdAt).toDateString()}
    </span>

    {/* </Link> */}
  </div>
  <div className="postTopRight">{/* <MoreVert /> */}</div>
</div>
<div className="postCenter">
  
    <>
      {/* <textarea
        className="editDescription"
        // value={descriptionUpdate}
        defaultValue={post.desc}
        onChange={(e) => setDescriptionUpdate(e.target.value)}
      />
      <button onClick={() => handleEditDescription(post._id)}>
        Edit
      </button> */}
    </>

    <span className="postText"> {post.desc} </span>


  {/* <img className="postImg" src="./images/image2.jpeg" /> */}
  {/* <img className="postImg" src={image + post.img} alt="" /> */}
</div>
<div className="postBottom">
  <div className="postBottomLeft">
  
    <FcLike className="likeIcon"  onClick={likeHandler}/>


    <span className="postLikeCounter">like it {post?.likes?.length} </span>

    {/* <div className="deletePost">
      <FaTrashAlt onClick={deletePost} />
    </div> */}
  </div>
  <div className="comment">
    {post?.comments?.map((comment, index) => (
      <>
        <div className="commentText" key={index}>
        {user._id === comment.userId && editModeComment ? (
          <>
            <textarea
              className="commentInput"
              type="text"
              defaultValue={comment.text}
              onChange={(e) => setEditComment(e.target.value)}
            />

            <button
              className="updateCommentBtn"
              onClick={() => EditComment(comment._id)}
              
              >
              update
            </button>
          </>
        ) : (
          <p className="text">
            
            {comment.text}
            <span>
              <span className="timeAgo">
                
                {new Date(comment.createdAt).toDateString()}
              </span>
            </span>
          </p>
        )}
          <span className="commentUser">{comment.username}</span>
        {user._id === comment.userId && !editModeComment  && (
        
           

            <div className="editDeleteComment">
              {/* <GiConfirmed className="edit"
              //  onClick={handleEdit}
               
               /> */}
              <FaEdit
                className="edit"
                onClick={() => setEditModeComment((prev) => !prev)}
                // onClick={() => handleEditComment(comment._id)}
                // onClick={showEditComment}
              />
              {/* <FaEdit className="edit"  onClick={handleEdit} /> */}

              <MdDeleteForever
                onClick={() => deleteComment(comment._id)}
                className="delete"
              />
            </div>
        
        )}

        
      </div>
      
      
      
      </>
    
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
            onClick={(e) => addComment(e)}
            
            >
            reply
          </button>
        )}
      </div>
    )}
    {commentMode && (
      <textarea
        className="respondInput"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    )}
  </div>
</div>
</div>
 
      


    </div>
  )
}

export default CommentsFriendProfile



