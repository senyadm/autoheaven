import React from 'react'
import ChatComponent from './ChatComponent'

const chatsData = [
    {
        name: "Audi A8",
        lastMessage: "Hey! we are finalizing some deals",
        bg: "/img/cars/Preview-1.png",
        id: 0,
    }
]
const Chats = () => {
  return (
    <div className='min-w-[256px] h-25'>
        {
            chatsData.map(chatsElement => <ChatComponent {...chatsElement} key={chatsElement.id}/>)
        }
    </div>
  )
}

export default Chats