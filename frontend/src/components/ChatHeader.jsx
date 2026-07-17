import React from 'react'

const ChatHeader = ({selectedUser,onlineUsers,isTyping}) => {
    const isOnline = onlineUsers.includes(selectedUser?._id);
  return (
    <div className='flex justify-start h-full bg-panel border-b border-border text-ink-primary p-3'>
        <div className='flex ml-8 gap-4 justify-center items-center '>
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