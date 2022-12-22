import React, { useContext, useState } from "react";
// import { FaTrashAlt, FaRegCommentAlt, FaEdit } from "react-icons/fa";
// import { GiConfirmed } from "react-icons/gi";
// import { MdDeleteForever } from "react-icons/md";
// import { BiLike } from "react-icons/bi";
// import { FcLike } from "react-icons/fc";
// import { PencilSimple } from "phosphor-react";
// import { AiOutlineDislike } from "react-icons/ai";
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

  return (
    <div className="singlePost">

    </div>

//     <div className="post">
//     <div className="postWrapper">
//       <div className="postTop">
//         <div className="postTopLeft">
//           <img
//           // className="postProfileImg"
//           // src={
//           //   user.profilePicture
//           //     ? image + user.profilePicture
//           //     : "/images/noAvatar.png"
//           // }
//           // alt=""
//           />

//           {/* <img
//           className="postImg"
//           src={
//             user.profilePicture
//               ? image + user.profilePicture
//               :  "/images/noAvatar.png"
//           }
//           alt=""
//         /> */}
  
//           <span className="postUsername">{post.username}</span>
       
//           <span className="postDate">
//             {new Date(post.createdAt).toDateString()}
//           </span>
//           <Link to={`/editPost/${post._id}`} className="link">
//           <span className="editPost"> <PencilSimple /></span>
          
//           </Link>
       
//         </div>
//         <div className="postTopRight">{/* <MoreVert /> */}</div>
//       </div>
//       <div className="postCenter">
//         <span className="postText"> {post.desc} </span>
//         {/* <img className="postImg" src="./images/image2.jpeg" /> */}
//         <img className="postImg" src={image + post.img} alt="" />
//       </div>
//       <div className="postBottom">
//         <div className="postBottomLeft">
//           {/* <img
//             className="likeIcon"
//             src="./images/like.png"
//             onClick={likeHandler}
//           /> */}
//           <FcLike className="likeIcon" onClick={likeHandler} />
//           {/* <AiOutlineDislike className="likeIcon" onClick={likeHandler} /> */}
//           {/* <img
//             className="likeIcon"
//             src="./images/heart.png"
//             onClick={likeHandler}
//           /> */}

//           <span className="postLikeCounter">like it {like} </span>

//           <div className="deletePost">
//             <FaTrashAlt onClick={deletePost} />
//           </div>
//         </div>
//         <div className="comment">
//           {post.comments.map((comment) => (
//             <div className="commentText">
//               {editModeComment ? (
//                 <>
//                   <textarea
//                     className="commentInput"
//                     type="text"
//                     value={editComment}
//                     onChange={(e) => setEditComment(e.target.value)}
//                   />

//                   <button
//                     className="updateCommentBtn"
//                     onClick={() => handleEdit(comment._id)}>
//                     update
//                   </button>
//                 </>
//               ) : (
//                 <p className="text"> {comment.text} <span><span className="timeAgo"> {new Date(post.createdAt).toDateString()}</span></span>   </p>
//               )}

//               {!editModeComment && (
//                 <>
//                   <span className="commentUser">{comment.username}</span>
                  
//                   <div className="editDeleteComment">
//                     {/* <GiConfirmed className="edit"
//                     //  onClick={handleEdit}
                     
//                      /> */}
//                     <FaEdit
//                       className="edit"
//                       onClick={() => setEditModeComment((prev) => !prev)}
//                       // onClick={showEditComment}
//                     />
//                     {/* <FaEdit className="edit"  onClick={handleEdit} /> */}

//                     <MdDeleteForever
//                       onClick={() => deleteComment(comment._id)}
//                       className="delete"
//                     />
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}

//           {!editModeComment && (
//             <div className="iconRespond">
//               {/* <img className="likeIcon" src="./images/like.png" /> */}
//               {/* <span className="likeIcon">
//                 <BiLike />
//               </span> */}

//               <FaRegCommentAlt
//                 className="respond"
//                 onClick={() => setCommentMode((prev) => !prev)}
//               />

//               {/* <span>add comment</span> */}
//               {commentMode && (
//                 <button
//                   className="addComment"
//                   // onClick={(e) => addComment(e)}>reply</button>
//                   onClick={(e) => addComment(e)}>
//                   reply
//                 </button>
//               )}
//             </div>
//           )}
//           {commentMode && (
//             <textarea
//               className="respondInput"
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   </div>

  
  )
}

export default EditPost