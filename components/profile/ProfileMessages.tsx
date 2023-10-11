import React from "react";
import ChatMessagesContent from "./ChatMessagesContent";
import Chats from "./Chats";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import TypingComponent from "./TypingComponent";

const ProfileMessages = () => {
  return (
    <div className="h-full grid grid-cols-2 grid-rows-13 gap-px bg-border">
      <div className="row-span-12 bg-background">
        <Chats />
      </div>
      <div className="row-span-12 bg-background">
        <ChatMessagesContent />
      </div>
      <div className="row-span-1 p-2 bg-background">
        <Button className="bg-background text-secondary-foreground border h-full w-full space-x-2 hover:text-primary-foreground">
          <Trash height={16} width={16} />
          Delete all chats
        </Button>
      </div>

      <div className="flex items-center row-span-1 bg-background">
        <TypingComponent />
      </div>
    </div>
  );
};

export default ProfileMessages;
