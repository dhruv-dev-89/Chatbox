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
    <div className='flex flex-col items-center w-full  sm:w-full h-full bg-sidebar border-r border-border'>
        <SearchBar/>
        {users.map((user)=>{
            return <div className='flex-col justify-center  items-center w-full'>
                <UserCard setSelectedUser={setSelectedUser} key={user._id} user={user} onlineUsers={onlineUsers}/>
            </div>
        })}
    </div>
  )
}

export default Sidebar