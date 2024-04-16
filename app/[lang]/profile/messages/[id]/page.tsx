"use client";

import { useEffect } from "react";
import TypingComponent from "../../../../../components/profile/TypingComponent";
import { RootState, useAppDispatch, useAppSelector } from "@/app/GlobalRedux/store";
import { fetchChatMessages, setCurrentChat } from "@/app/GlobalRedux/profile/chatSlice";
import ChatMessagesContent from "@/components/profile/messages/ChatMessagesContent";

const Chat = ({ params }) => {
  const userChats = useAppSelector((state: RootState) => state.chats.chats);
  
  const chatId = params.id;
  const dispatch = useAppDispatch();
  console.log("🚀 ~ Chat ~ params:", params);
  useEffect(()=> {
    //  dispatch(setCurrentChat(userChats[index]));
     dispatch(fetchChatMessages(chatId));
  }, [chatId, dispatch, userChats])
  const handleSendClick = () => {};
  return (
    
     <div className="row-span-12 bg-background col-span-2">
        <ChatMessagesContent ws={webSckt} />
      </div>
  );
};

export default Chat;
