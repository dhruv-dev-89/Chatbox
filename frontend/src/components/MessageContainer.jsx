import React, { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import api from '../api/Api';
import socket from '../socket/socket';

const MessageContainer = ({userChat,setUserChat,selectedUser}) => {

    const bottomRef=useRef(null);
    
    const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;

    console.log(loggedInUserId);
    
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({
            behavior:"smooth"
        });
    },[userChat]);

    useEffect(() => {

        if (!selectedUser) return;

        const receiveMessage = (message) => {

            if (message.sender !== selectedUser._id) return;

            setUserChat(prev => [...prev, message]);

        };

        socket.on("send-message", receiveMessage);

        return () => {
            socket.off("send-message", receiveMessage);
        };

    }, [selectedUser]);
    useEffect(()=>{
        if (!selectedUser) return ;

        const fetchMessage = async () => {
            try {
                const response = await api.get(`/api/message/${selectedUser._id}`);
                console.log(response.data.conversations);
                
                setUserChat(response.data.conversations);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMessage();
    },[selectedUser])
  return (
    <div className='w-full  flex flex-col  gap-2 py-3 px-2'>
        {userChat.map((chat)=>{
            return <MessageBubble key={chat._id} text={chat.text} time={chat.createdAt} myMessage={loggedInUserId===chat.sender}/>
        })}
        <div className='bg-panel' ref={bottomRef}></div>
    </div>
  )
}

export default MessageContainer