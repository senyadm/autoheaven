import { Divide } from 'lucide-react';
import React from 'react'

const chatIdToMessages = {
    0: [
        {
            text: "Hi!",
            time: "19:01",
            sender: "Buyer - Austin"
        },
        {
            text: "Hey",
            time: "19:01",
             sender: "You"
        },
        {
            text: "I was wondering about this Audi R8",
            time: "19:01",
             sender: "Buyer - Austin"
        },
        {
            text: "Yeah, what's that",
            time: "19:01",
             sender: "You"
        },
    ]
}
const currentChatId = 0;
const ChatMessagesContent = () => {
  return (
    <div className='flex border flex-col w-full px-4 py-2'>
        {
            chatIdToMessages[currentChatId].map((message, index )=> 
         
            <div key={index} className={`w-5/12 space-x-1 rounded-lg border pr-2 py-2 pl-4 ${message.sender === "You" ? "ml-auto": "bg-primary text-primary-foreground"}`}>
                <div className='text-sm'>   
                    {message.text}
                    </div>
                <div className='flex justify-end text-[10px]'>
                    {message.time}
                </div>
            </div>
            )
        }
    </div>
  )
}

export default ChatMessagesContent