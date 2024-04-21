import React, { useEffect, useState } from "react";
import { ChatComponentProps } from "../../../interfaces/profile/ChatComponent";

import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/GlobalRedux/store";
import {
  fetchChatMessages,
  selectChat,
  setCurrentChat,
} from "../../../app/GlobalRedux/profile/chatSlice";
import ChatComponent from "./ChatComponent";
import { useRouter } from "next/navigation";
import { getWS } from "../../../utils/chats";
import { getToken } from "../../../utils/auth";

const Chats = () => {
  // const [chats, setChats] = useState<ChatComponentProps[]>([]);
  const dispatch = useAppDispatch();
  const userChats = useSelector((state: RootState) => state.chats.chats);
  console.log("🚀 ~ Chats ~ userChats:", userChats);
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
    <div className=" h-full overflow-y-auto">
      {userChats?.map((chat, index) => (
        <ChatComponent
          chat={chat}
          key={`message ${chat.chat_id}`}
          onChatClick={() => {
            dispatch(
              selectChat({
                ...chat,
              })
            );
          }}
        />
      ))}
    </div>
  );
};

export default Chats;
