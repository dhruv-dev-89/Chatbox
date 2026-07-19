import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

const ChatHeader = ({selectedUser,onlineUsers,isTyping,setSelectedUser}) => {
    const isOnline = onlineUsers.includes(selectedUser?._id);
  return (
    <div className='flex justify-start h-full bg-panel border-b border-border text-ink-primary lg:p-3'>
        <div className='flex  lg:ml-8 gap-4 justify-center items-center '>
            <div className=' flex size-7 justify-center items-center'>
                <FaArrowLeft className='size-5 ml-2' onClick={()=>{
                    setSelectedUser(null);
                }
                }/>
            </div>
            <div>
                <img className='size-12' src="src/assets/profile.png" alt="" />
            </div>
            <div className='flex flex-col'>
                <h1>{selectedUser.username}</h1>
                <p>{isTyping?"Typing...":isOnline ? "🟢 Online" : "⚪ Offline"}</p>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader