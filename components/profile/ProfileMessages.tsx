import React from 'react'
import ChatMessagesContent from './ChatMessagesContent'
import Chats from './Chats'
import { Button } from '../ui/button';

const ProfileMessages = () => {
  return (
    <div className="h-full grid grid-cols-2 grid-rows-13">
      <div className="row-span-12">
        <Chats />
      </div>
      <div className="row-span-12">
        <ChatMessagesContent />
      </div>
      <div className="row-span-1">
        <Button>Delete</Button>
      </div>

      <div className="row-span-1">Write</div>
    </div>
  );
}

export default ProfileMessages