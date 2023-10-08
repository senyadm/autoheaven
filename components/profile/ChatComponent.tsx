import React from 'react'
import Image from 'next/image'

const ChatComponent = ({
    name,
        lastMessage,
        bg,
        id,
}) => {
  return (
    <div className='flex border px-2 py-[18px] space-x-[10px]'>
        <Image src={bg} alt=''  width={64}
      height={64}/>
      <div className='flex flex-col'>
       {name}
       <p>{lastMessage}</p>
      </div>
    </div>
  )
}

export default ChatComponent