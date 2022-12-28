import React from 'react';
import "./message.scss";
import { format } from "timeago.js";

const Message = ({message, own}) => {
  return (
    <div className={own ? "message own" : "message" } >
    <div className="messageTop">
      <img
        className="messageImg"
        src="images/image4.jpg"
        alt=""
      />
      <p className="messageText">{message.text}</p>
    </div>
    <div className="messageBottom">{format(message.createdAt)}</div>
  </div>
  )
}

export default Message