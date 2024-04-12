import React, { useEffect, useState } from "react";
import { ChatComponentProps } from "../../../interfaces/profile/ChatComponent";

import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/GlobalRedux/store";
import {
  fetchChatMessages,
  setCurrentChat,
} from "../../../app/GlobalRedux/profile/chatSlice";
import ChatComponent from "./ChatComponent";
import { useRouter } from "next/navigation";

const Chats = () => {
  // const [chats, setChats] = useState<ChatComponentProps[]>([]);
  const dispatch = useAppDispatch();
  const userChats = useSelector((state: RootState) => state.chats.chats);
  const { replace } = useRouter();
  // useEffect(() => {
  //   if (!userChats?.length) return;

  //   const newChats = userChats.map((chat, index) => {
  //     const { chatter_id, product_id, last_message, imageURL, chat_id } = chat;
  //     return {
  //       name: chatter_id,
  //       lastMessage: last_message,
  //       bg: imageURL,
  //       id: product_id,
  //       chat_id: chat_id,
  //     };
  //   });

  //   setChats(newChats);
  // }, [userChats]);

  return (
    <div className="min-w-[256px] h-full overflow-y-auto">
      {userChats?.map((chat, index) => (
        <ChatComponent
          chat={chat}
          key={`message ${chat.chat_id}`}
          onChatClick={() => {
            replace(`/profile/messages/${chat.chat_id}`);
            dispatch(setCurrentChat(userChats[index]));
            dispatch(fetchChatMessages(userChats[index].chat_id));
          }}
        />
      ))}
    </div>
  );
};

export default Chats;
