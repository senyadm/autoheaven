"use client";

import React, { use, useCallback, useEffect, useRef, useState } from "react";
import ChatMessagesContent from "./ChatMessagesContent";
import Chats from "./Chats";
import { Button } from "../../ui/button";
import { Trash } from "lucide-react";
import TypingComponent from "./TypingComponent";
import {
  addMessage,
  fetchUserChats,
} from "../../../app/GlobalRedux/profile/chatSlice";
import { useAppSelector } from "../../../app/GlobalRedux/store";
import { getToken } from "../../../utils/auth";
import { useAppStore } from "../../../app/GlobalRedux/useStore";
import { ChatMessageAPI } from "../../../interfaces/profile/messages";
import { fetchUserData } from "../../../app/GlobalRedux/profile/userSlice";

const ProfileMessages = () => {
  const [userId, dispatch] = useAppStore((state) => state.user.id);
  const currentChat = useAppSelector((state) => state.chats.currentChat);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!userId) {
      dispatch(fetchUserData());
      return;
    }
    dispatch(fetchUserChats(userId));
  }, [dispatch, userId]);
  const createMessage = useCallback(
    function (msg, senderId) {
      if (!currentChat) return console.error("No chat selected");
      const messagePayload: ChatMessageAPI = {
        message_content: msg,
        sender_id: senderId,
        chat_id: currentChat.chat_id,
        timestamp: new Date().toISOString(),
        read_status: false,
        message_id: -1, // local messages do no have message_id, they come from the server
      };
      dispatch(addMessage(messagePayload));
    },
    [currentChat, dispatch]
  );
  useEffect(() => {
    if (!currentChat) return;
    ws.current = new WebSocket(
      `ws://seashell-app-p3opp.ondigitalocean.app/ws/${getToken()}/${
        currentChat.chatter_id
      }/${currentChat.product_id}`
    );
    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.current.onmessage = (event) => {
      createMessage(event.data, currentChat.chatter_id);
    };
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      ws.current?.close();
    };
  }, [createMessage, currentChat]);

  function handleSendClick(inputValue: string) {
    if (!ws.current) return;
    if (!userId) {
      console.error("User not found");
      return;
    }
    if (!currentChat) {
      console.error("No chat selected");
      return;
    }
    createMessage(inputValue, userId);
    ws.current.send(inputValue);
  }
  return (
    <div className="h-full grid grid-cols-3 grid-rows-13 gap-px bg-border">
      <div className="row-span-12 col-span-1 bg-background">
        <Chats />
      </div>
      <div className="row-span-12 bg-background col-span-2">
        <ChatMessagesContent />
      </div>

      <div className="row-span-1 p-2 bg-background col-span-1">
        <Button className="bg-background text-secondary-foreground border h-full w-full space-x-2 hover:text-primary-foreground ">
          <Trash height={16} width={16} />
          Delete all chats
        </Button>
      </div>
      <div className="flex items-center row-span-1 bg-background col-span-2">
        <TypingComponent onSendClick={handleSendClick} />
      </div>
    </div>
  );
};

export default ProfileMessages;
