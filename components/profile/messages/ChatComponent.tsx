import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { clientChats } from "../../../app/GlobalRedux/client";
import { useAppDispatch, useAppSelector } from "../../../app/GlobalRedux/store";
import { fetchChatMessages } from "../../../app/GlobalRedux/profile/chatSlice";
import { Chat } from "../../../interfaces/profile/messages";
import { current } from "@reduxjs/toolkit";
interface ChatComponentProps {
  chat: Chat;
  onChatClick?: (id: number) => void;
}
const ChatComponent = ({ chat, onChatClick }: ChatComponentProps) => {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector((state) => state.chats.currentChat);
  const { chat_id, carInfo } = chat;
  if (!carInfo) return null;
  const { imageurl, title } = carInfo;
  return (
    <Button
      onClick={onChatClick}
      className={`flex w-full bg-background hover:bg-secondary ${
        chat_id === currentChat?.chat_id ? "bg-secondary" : ""
      } justify-start text-left border-b px-2 py-[18px] space-x-[10px] h-[100px]`}
    >
      <div className="h-16 w-16 relative">
        <div className="absolute inset-0 overflow-hidden  rounded-lg">
          <Image
            src={imageurl}
            alt=""
            layout="fill" // This will fill the parent container
            objectFit="cover" // Crop the image to cover the container
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg text-foreground font-semibold">{title}</div>
        <div className="text-muted text-muted-foreground">{"lastMessage"}</div>
      </div>
    </Button>
  );
};

export default ChatComponent;
