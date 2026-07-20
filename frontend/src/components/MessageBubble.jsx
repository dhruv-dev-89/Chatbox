import React from 'react'

const MessageBubble = ({text,myMessage,time}) => {
  return (
    <div className='w-full '>
        <div className={`flex mx-2  ${myMessage?"justify-end":"justify-start"} `}>
            <div className={`flex flex-col wrap-break-word  whitespace-pre-wrap  ${myMessage? "bg-bubble-sent rounded-br-md text-white":"bg-bubble-received rounded-bl-md text-ink-primary"} max-w-[80%] lg:max-w-[70%] min-w-[8%]  w-auto py-2 px-3 rounded-2xl`}>
                <p>{text}</p>
                <p className='text-[11px] lowercase text-gray-400 self-end'>
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