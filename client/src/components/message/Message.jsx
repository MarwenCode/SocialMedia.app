import React from 'react';
import "./message.scss"

const Message = ({own}) => {
  return (
    <div className={own ? "message own" : "message" } >
    <div className="messageTop">
      <img
        className="messageImg"
        src="images/image4.jpg"
        alt=""
      />
      <p className="messageText">Hello</p>
    </div>
    <div className="messageBottom">1 hour ago</div>
  </div>
  )
}

export default Message