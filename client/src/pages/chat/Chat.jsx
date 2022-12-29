import React, { useRef, useContext, useState, useEffect } from "react";
import "./chat.scss";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { AppContext } from "../../components/context/context";
import { io } from "socket.io-client";
import axios from "axios";

const Chat = () => {
  const { user } = useContext(AppContext);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const refView = useRef();

  //socket io
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket?.current?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  console.log(currentChat)

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", user._id);
    socket?.current?.on("getUsers", (users) => {
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);



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

  console.log(currentChat);

  //get messages of a single conversation
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/" + currentChat._id);
        console.log(res.data);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  //add a new message to the conversation
  const handleSubmit = async () => {
    // e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  //socket 
  const receiverId = currentChat?.members?.find(
    (member) => member !== user._id
  );
  console.log(receiverId);


  socket?.current?.emit("sendMessage", {
    senderId: user._id,
    receiverId,
    text: newMessage,
  });
  console.log(socket)

  //scroll usinf useRef to get the last message on the chat
  useEffect(() => {
    refView.current?.scrollIntoView({ behavior: 'smooth', 
    inline: 'nearest'})
  }, [messages])

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
                {messages.map((mess) => (
                  <div ref={refView}>
                    <Message message={mess} own={mess.sender === user?._id} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}></textarea>
                <button
                  className="chatSubmitButton"
                  onClick={(e) => handleSubmit(e)}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
