import React from 'react'

const UserCard = ({user,setSelectedUser,onlineUsers}) => {
  return (
    <div onClick={()=>{
        setSelectedUser(user);
    }} className='w-70 flex ml-6 hover:border-2  lg:ml-17 h-15 hover:border-gray-400 rounded mb-2'>
        <div className='flex justify-center items-center w-[20%]'>
            <img className='size-10' src="src\assets\profile.png" alt="" />
        </div>
        <div className='w-[60%]'>
            <h1 className='truncate'>{user.username}</h1>
            <p className='truncate'>{user.lastMessage||"Start Chatting..."}</p>
        </div>
        <div className='flex items-end pb-2'>
            <p className='text-sm'>
            {user.lastMessageTime
            ? new Date(user.lastMessageTime).toLocaleTimeString([],{
                hour:"2-digit",
                minute:"2-digit"
            })
            :""}
            </p>
        </div>
    </div>
  )
}

export default UserCard