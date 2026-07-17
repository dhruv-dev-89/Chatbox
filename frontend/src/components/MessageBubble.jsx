import React from 'react'

const MessageBubble = ({text,myMessage,time}) => {
  return (
    <div className='w-full'>
        <div className={`flex mx-2  ${myMessage?"justify-end":"justify-start"} `}>
            <div className={`flex flex-col ${myMessage? "bg-bubble-sent text-white":"bg-bubble-received text-ink-primary"}  max-w-[50%] min-w-[8%]  w-auto py-1 px-3 rounded-2xl`}>
                <p>{text}</p>
                <p className='text-[12px] self-end'>
                  {
                    new Date(time).toLocaleTimeString([],{
                      hour:"2-digit",
                      minute:"2-digit"
                    })
                  }
                </p>
            </div>
        </div>
    </div>
  )
}

export default MessageBubble