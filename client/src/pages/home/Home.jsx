import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Posts from "../../components/Posts/Posts";
import Share from "../../components/share/Share";
import LeftHome from "../../components/leftHome/LeftHome";
import { FaTrashAlt, FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AppContext } from "../../components/context/context";
import "./home.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const { user } = useContext(AppContext);
  // const [comment, setComment] =useState([])

  // const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/post");
      console.log(res);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // useEffect(() => {
  //     const fetchComments = async() => {
  //         const res = await axios.get("/comments")
  //         console.log(res)
  //         setComments(res.data)

  //     }

  //     fetchComments()
  // }, [])

  //   useEffect(() => {
  //     const fetchComment = async() => {

  //         // const res = await axios.get("/comments")
  //         const res = await axios.get(`/comments/${comment._id}`)
  //         // const res = await axios.get(`/comments/${comment._id}`

  //         // , {
  //         //  data:{comments: comment._id}

  //         // }
  //         // )
  //         // const res = await axios.get("/comments")
  //         console.log(res)
  //         setComment(res.data)

  //     }

  //     fetchComment()
  // }, [])

  // useEffect(() => {
  //   const fetchComment = async () => {
  //     // const res = await axios.get("/comments")
  //     const res = await axios.get(`/comments/${comments._id}`);

  //     console.log(res);
  //     setComments(res.data);
  //   };

  //   fetchComment();
  // }, []);

  // console.log(comments)

  // console.log(comments)

  return (
    <div className="home">
      <div className="right"></div>
      <div className="center">
        <Share />

        <Posts posts={posts} />
      </div>
      <div className="left">
        <LeftHome />
      </div>
    </div>
  );
};

export default Home;
