"use client";

import React, { use, useEffect, useState } from "react";
import ChatMessagesContent from "./ChatMessagesContent";
import Chats from "./Chats";
import { Button } from "../../ui/button";
import { Trash } from "lucide-react";
import TypingComponent from "../TypingComponent";
import {
  addMessage,
  fetchUserChats,
} from "../../../app/GlobalRedux/profile/chatSlice";
import { useAppSelector } from "../../../app/GlobalRedux/store";
import { getToken } from "../../../utils/auth";
import { useAppStore } from "../../../app/GlobalRedux/useStore";
const token = getToken();

const ProfileMessages = () => {
  console.log(localStorage);
  const [userId, dispatch] = useAppStore((state) => state.user.id);
  const currentChat = useAppSelector((state) => state.chats.currentChat);
  const [webSckt, setWebSckt] = useState<WebSocket | null>(null);
  useEffect(() => {
    if (!userId) return;
    dispatch(fetchUserChats(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    if (!currentChat) return;
    const ws = new WebSocket(
      `ws://seashell-app-p3opp.ondigitalocean.app/ws/${token}/${currentChat?.chatter_id}/${currentChat?.product_id}`
    );
    setWebSckt(ws);
  }, [currentChat]);
  function handleSendClick(inputValue: string) {
    if (!webSckt) return;
    const messagePayload = {
      messageContent: inputValue,
      userId: userId,
      timestamp: new Date(),
    };

    dispatch(addMessage(messagePayload));
    webSckt.send(inputValue);
  }
  return (
    <div className="h-full grid grid-cols-3 grid-rows-13 gap-px bg-border">
      <div className="row-span-12 col-span-1 bg-background">
        <Chats />
      </div>
      <div className="row-span-12 bg-background col-span-2">
        <ChatMessagesContent ws={webSckt} />
      </div>
      <div className="row-span-1 p-2 bg-background col-span-1">
        <Button className="bg-background text-secondary-foreground border h-full w-full space-x-2 hover:text-primary-foreground ">
          <Trash height={16} width={16} />
          Delete all chats
        </Button>
      </div>

      <div className="flex items-center row-span-1 bg-background col-span-2">
        {currentChat && <TypingComponent onSendClick={handleSendClick} />}
      </div>
    </div>
  );
};

export default ProfileMessages;
