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
    <div className='w-[30%] h-full bg-sidebar border-r border-border'>
        <SearchBar/>
        {users.map((user)=>{
            return <UserCard setSelectedUser={setSelectedUser} key={user._id} user={user} onlineUsers={onlineUsers}/>
        })}
    </div>
  )
}

export default Sidebar