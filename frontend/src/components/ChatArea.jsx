import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import MessageContainer from './MessageContainer'
import MessageInput from './MessageInput'
import { useEffect } from 'react'
import api from '../api/Api'
const ChatArea = ({selectedUser,onlineUsers,isTyping,setSelectedUser}) => {
    const [userChat, setUserChat] = useState([]);
    

  return (
    <div className='flex flex-1 h-screen flex-col'>
        <div className='h-[10%] border-border'>
            <ChatHeader setSelectedUser={setSelectedUser} isTyping={isTyping} onlineUsers={onlineUsers} selectedUser={selectedUser}/>
        </div>
        <div className='flex-1 bg-panel custom-scrollbar scroll-smooth overflow-y-auto'>
            <MessageContainer userChat={userChat} setUserChat={setUserChat} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        </div>
        <div className='h-auto'>
            <MessageInput setUserChat={setUserChat} selectedUser={selectedUser}/>
        </div> 
    </div>
  )
}

export default ChatArea           