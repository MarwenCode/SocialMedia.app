import React from "react";
import { FaCommentSlash } from "react-icons/fa";
import FriendProfile from "../FriendProfile/FriendProfile";
import Post from "../post/Post";

const Posts = ({ posts }) => {
  return (
    <>
      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </>
  );
};

export default Posts;
