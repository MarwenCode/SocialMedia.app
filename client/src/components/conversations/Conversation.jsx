import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import "./conversation.scss"

const Conversation = ({conv, currentUser}) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const friendId = conv.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/user/" + friendId);
        console.log(res.data)
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conv]);
  return (
    <div className='conversation'>
        <img className='conversationImg'

        src="images/image1.jpg"
        
        />
        <span className='conversationName'>{user?.username}</span>

    </div>
  )
}

export default Conversation