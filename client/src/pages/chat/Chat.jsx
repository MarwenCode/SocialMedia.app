import React from 'react';
import "./chat.scss"

const Chat = () => {
  return (
    <div className='chat'>
        <div className="chatMenu">
            MEnu
            <div className="chatMenuWrapper">
                <input 
                placeholder='search for a friend'
                className='chatMenuInput'
                
                
                />

            </div>

        </div>
        <div className="chatBox">
            box
            <div className="chatBoxWrapper">

            </div>

        </div>


    </div>
  )
}

export default Chat