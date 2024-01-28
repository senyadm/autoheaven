import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChatComponentProps } from "../../interfaces/profile/ChatComponent";

const ChatComponent = ({ name, lastMessage, bg, id, onChatClick, activeChatID }: ChatComponentProps) => {
  return (
    <Button onClick={() => onChatClick?.(id)} className={`flex w-full bg-background hover:bg-secondary ${activeChatID === id ? 'bg-secondary' : ''} justify-start text-left border-b px-2 py-[18px] space-x-[10px] h-[100px]`}>
      <div className="h-16 w-16 relative">
        <div className="absolute inset-0 overflow-hidden  rounded-lg">
          <Image
            src={bg}
            alt=""
            layout="fill" // This will fill the parent container
            objectFit="cover" // Crop the image to cover the container
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg text-foreground font-semibold">{name}</div>
        <div className="text-muted text-muted-foreground">{lastMessage}</div>
      </div>
    </Button>
  );
};

export default ChatComponent;
