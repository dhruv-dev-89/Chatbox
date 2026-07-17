import React, { useEffect, useEffectEvent, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatArea from '../components/ChatArea'
import socket from '../socket/socket';

const ChatHome = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {

    const token = localStorage.getItem("token");

    socket.auth = { token };

    const handleOnlineUsers = (users) => {
        console.log("Received online users:", users);
        setOnlineUsers(users);
    };

    socket.on("online-users", handleOnlineUsers);

    socket.on("connect", () => {
        console.log("Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.log(err.message);
    });

    socket.connect();

    return () => {
        socket.off("online-users", handleOnlineUsers);
        socket.disconnect();
    };

  }, []);

  useEffect(()=>{

    const handleTyping=({userId})=>{

      if(selectedUser&&selectedUser._id===userId){
        setIsTyping(true);
      }

    }

    const handleStopTyping=({ userId }) => {

        if (selectedUser && selectedUser._id === userId) {
          setIsTyping(false);
        }
    }
    socket.on("user-typing",handleTyping);

    socket.on("user-stop-typing",handleStopTyping);
    
    return ()=>{
      socket.off("user-typing",handleTyping);
      socket.off("user-stop-typing", handleStopTyping);
    };
  },[selectedUser]);
  return (
    <div className='flex w-full h-screen bg-app text-ink-primary'>
        <Sidebar setSelectedUser={setSelectedUser} onlineUsers={onlineUsers}/>
        {selectedUser &&
        <ChatArea isTyping={isTyping} onlineUsers={onlineUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
    </div>
  )
}

export default ChatHome