import React , {useContext, useState}from "react";
import {FaTrashAlt} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/context";


const Post = ({post}) => {
    const {user} = useContext(AppContext)
    
    // const [comments, setComments] = useState([]); 

    // const [text, setText] = useState("");


    // const addComment = async (commenterId, username, text) => {
    //     try {
    //       const res = await axios.get("/comments/" + post._id, {
    //         data: { commenterId, username, text },
    //       });
    //       setText(res.data);
    //       console.log(res.data);
    //       console.log(comments);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //     addComment();
    //   };

  console.log(post.comments)

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
        
              <img
                className="postProfileImg"
              
              />
            
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.createdAt}</span>
          </div>
          <div className="postTopRight">
            {/* <MoreVert /> */}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText"> {post.desc}  </span>
          <img className="postImg"  />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
             
            />
            <img
              className="likeIcon"
           
            />

            <span className="postLikeCounter">like it  {post.likes}  </span>
            <p>{post.comments.map( comment => <p>{comment.text}</p>)} </p>
          </div>
        
          <div className="deletePost">
            <FaTrashAlt  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
