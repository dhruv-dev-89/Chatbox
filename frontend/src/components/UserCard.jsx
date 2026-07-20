import React from 'react'

const UserCard = ({user,setSelectedUser,onlineUsers}) => {
  return (
    <div onClick={()=>{
        setSelectedUser(user);
    }} className='w-70 h-15 lg:h-18 lg:w-89  flex lg:items-center ml-6 hover:bg-panel rounded-xl  hover:border hover:border-border cursor-pointer justify-around mb-2 '>
        <div>
            <img className='self-start size-13 rounded-xl items-center ' src="/images/profile.png" alt="" />
        </div>
        <div className='w-[60%]'>
            <h1 className='truncate'>{user.username}</h1>
            <p className='truncate'>{user.lastMessage||"Start Chatting..."}</p>
        </div>
        <div className='self-end pb-3'>
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