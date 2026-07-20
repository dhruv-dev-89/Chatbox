import React, { useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import api from '../api/Api';
import socket from '../socket/socket';

const MessageInput = ({setUserChat,selectedUser}) => {

    const textAreaRef = useRef(null);
    const [text, setText] = useState("");

    const handleEnter=(e)=>{
        if(e.key==="Enter" && !e.shiftKey){
            e.preventDefault();
            sendMessage();
        }
    }
    const typingTimeout=useRef(null);
    const handleChange=(e)=>{
        setText(e.target.value);
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =textAreaRef.current.scrollHeight + "px";

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
            textAreaRef.current.style.height = "auto";
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='bg-panel  h-full'>
        <div  className='flex mb-4 justify-center  mx-3 gap-3 h-full items-center'>
            <textarea onKeyDown={(e)=>{
                handleEnter(e)
            }}
            value={text}
            rows={1}
            ref={textAreaRef}
            onChange={handleChange}
            className='flex-1  overflow-y-auto overflow-hidden  resize-none rounded-3xl px-5 py-3 outline-none   max-h-40 bg-app focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20  border-t border-border h-11 text-ink-primary placeholder:text-ink-placeholder'
            type="text" placeholder='Type a message...'/>
            <button onClick={sendMessage}
            className='size-12 flex justify-center items-center bg-accent hover:bg-accent-hover text-white  rounded-full transition-all duration-200 active:scale-97'><IoSend/></button>
        </div>
    </div>
  )
}

export default MessageInput