import React from 'react'
import ChatMessagesContent from './ChatMessagesContent'
import Chats from './Chats'

const ProfileMessages = () => {
  return (
    <div className='flex'>
      <Chats />
      <ChatMessagesContent />

    </div>
  )
}

export default ProfileMessages