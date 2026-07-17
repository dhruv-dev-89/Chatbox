import React, { useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import api from '../api/Api';
import socket from '../socket/socket';

const MessageInput = ({setUserChat,selectedUser}) => {

    const [text, setText] = useState("");

    const typingTimeout=useRef(null);
    const handleChange=(e)=>{
        setText(e.target.value);

        if(!selectedUser) return;
        socket.emit("typing",{
            receiverId:selectedUser._id
        });

        clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {

            socket.emit("stop-typing", {
                receiverId: selectedUser._id
            });

        }, 1200);

    };


    const sendMessage=async ()=>{
       
        if(!selectedUser || text.trim().length==0){
            return ;
        }
         try {
            const response = await api.post(
                `/api/message/send/${selectedUser._id}`,
                { text }
            );
            console.log(response.data); 
            
            setUserChat(prev=>[...prev,response.data.newMessage]);
            setText("");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='bg-inputbar border-t border-border h-full'>
        <div className='flex justify-center  mx-5 gap-3 h-full items-center'>
            <input 
            value={text}
            onChange={handleChange}
            className='bg-app text-ink-primary placeholder:text-ink-placeholder rounded-xl px-2 py-1 flex-1'
            type="text" placeholder='type your message'/>
            <button onClick={sendMessage}
            className='bg-accent hover:bg-accent-hover text-white px-3 py-2 rounded-xl'><IoSend/></button>
        </div>
    </div>
  )
}

export default MessageInput