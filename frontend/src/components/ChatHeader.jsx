import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

const ChatHeader = ({selectedUser,onlineUsers,isTyping,setSelectedUser}) => {
    const isOnline = onlineUsers.includes(selectedUser?._id);
  return (
    <div className='flex justify-start h-full bg-panel border-b border-border/60 text-ink-primary lg:p-3'>
        <div className='flex  lg:ml-2  justify-center items-center '>
            <div onClick={()=>{
                setSelectedUser(null);
            }}
            className='size-12 md:hidden rounded-full hover:bg-white/5 cursor-pointer transition flex justify-center items-center'>
                <FaArrowLeft className='size-5 '/>
            </div>
            <div>
                <img className='size-13' src="/images/profile.png" alt="" />
            </div>
            <div className='flex flex-col pl-1'>
                <h1 className='text-lg font-semibold '>{selectedUser.username}</h1>
                <p className='text-sm text-gray-400'>{isTyping?"Typing...":isOnline ? "🟢 Online" : "⚪ Offline"}</p>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader