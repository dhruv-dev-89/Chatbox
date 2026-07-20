import React from 'react'

const UserCard = ({user,setSelectedUser,onlineUsers}) => {
  return (
    <div onClick={()=>{
        setSelectedUser(user);
    }} className='w-70 h-15 lg:h-20 lg:w-89 flex lg:items-center ml-6 hover:bg-panel rounded-xl  hover:border hover:border-border cursor-pointer justify-around mb-2 '>
        <div>
            <img className='self-start size-13 rounded-xl items-center ' src="/images/profile.png" alt="" />
        </div>
        <div className='w-[60%]'>
            <h1 className='truncate font-semibold'>{user.username}</h1>
            <p className='truncate text-gray-400 text-sm'>{user.lastMessage||"Start Chatting..."}</p>
        </div>
        <div className='self-end pb-4.5'>
            <p className='text-xs lowercase text-gray-400'>
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