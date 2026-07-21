import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import UserCard from './UserCard'
import api from '../api/Api'

const Sidebar = ({setSelectedUser,onlineUsers}) => {
    const [users,setUsers]=useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/api/user/getallusers");
                setUsers(response.data.users);
                console.log(response.data.users);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchUsers();
    }, []);

  return (
    <div className='flex flex-col px-4 items-center w-full  sm:w-full h-full bg-sidebar border-r border-border'>
        <SearchBar/>
        {[...users]
        .sort((a, b) => {
            return new Date(b.lastMessageTime || 0) - new Date(a.lastMessageTime || 0);
        }).
        map((user)=>{
            return <div className='flex-col justify-center   items-center w-full'>
                <UserCard setSelectedUser={setSelectedUser} key={user._id} user={user} onlineUsers={onlineUsers}/>
            </div>
        })}
    </div>
  )
}

export default Sidebar