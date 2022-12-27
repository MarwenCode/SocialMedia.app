import React, { useRef, useContext, useState, useEffect } from "react";
import "./chat.scss";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { AppContext } from "../../components/context/context";
import axios from "axios";

const Chat = ({ own }) => {
  const { user } = useContext(AppContext);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  //get conversation
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id);
        console.log(res.data);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  return (
    <div className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="search for a friend" className="chatMenuInput" />
          {conversation.map((conv) => (
            <div onClick={() => setCurrentChat(conv)}>
               <Conversation conv={conv} currentUser={user} />

            </div>
           
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
                <>
                <div className="chatBoxTop">
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                </div>
                <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
              // onChange={(e) => setNewMessage(e.target.value)}
              // value={newMessage}
            ></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
              </>




          ) : (
            <span className="noConversationText">
            Open a conversation to start a chat.
          </span>

          )
        
          }

       
        </div>
      </div>
    </div>
  );
};

export default Chat;
