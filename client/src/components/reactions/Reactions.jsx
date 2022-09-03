import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import "./reactions.scss"

const Reactions = () => {
  const { user, dispatch, posts, setPosts } = useContext(AppContext);



  return (
    <div className="reactions">
      {posts.map((reaction) => (
        <div className="reactionBox">
          <span className="date">{new Date(reaction.createdAt).toDateString()} </span>
          <span className="username">  { user.username }</span>
          <span className="reaction">   post this : 
           {reaction.desc}
           </span>
        </div>
      ))}
    </div>
  );
};

export default Reactions;
