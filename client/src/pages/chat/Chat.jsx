import React from 'react';
import "./chat.scss";
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';

const Chat = ({own}) => {
  return (
    <div className='chat'>
        <div className="chatMenu">
       
            <div className="chatMenuWrapper">
                <input 
                placeholder='search for a friend'
                className='chatMenuInput'
                
                
                />
                <Conversation />
                <Conversation />
                <Conversation />
           

            </div>

        </div>
        <div className="chatBox">
       
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                <Message own={true}/>
                <Message />
                <Message own={true}/>
                <Message />
                <Message own={true}/>
                <Message />
                <Message own={true}/>
                <Message />
                <Message own={true}/>
                <Message />
                <Message own={true}/>
                <Message />
                <Message own={true}/>
                <Message />
                 
              </div>
              <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    // onChange={(e) => setNewMessage(e.target.value)}
                    // value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" >
                    Send
                  </button>
                </div>

            </div>

        </div>


    </div>
  )
}

export default Chat