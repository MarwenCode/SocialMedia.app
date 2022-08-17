import React , {useContext, useState}from "react";
import {FaTrashAlt} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/context";
import "./post.scss"


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

    const deletePost = async() => {
  
      try {
        await axios.delete(`/post/${post._id}`, {
          data: {userId: user._id}
      
        })
        window.location.replace("/")
        
        
      } catch (error) {
        console.log(error)
        
      }
    }

    console.log(post._id)
    console.log(post)




  console.log(post.comments)

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
        
              <img
                className="postProfileImg"
                src="./images/image1.jpg"
              
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
          <img className="postImg" 

          src="./images/image2.jpeg"
          
          
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="./images/like.png"
             
            />
            <img
              className="likeIcon"
              src="./images/heart.png"
             
            />

            <span className="postLikeCounter">like it 20 {post.likes}  </span>
        
        
          <div className="deletePost">
            <FaTrashAlt  onClick={deletePost} />
          </div>
        </div>
        <div className="comment">
              {post.comments.map( comment => <p className="text">{comment.text}</p>)} 
            </div>
          </div>
      </div>
    </div>
  );
};

export default Post;
