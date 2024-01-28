import React, { useEffect, useState } from "react";
import ChatComponent from "./ChatComponent";
import { ChatComponentProps } from "../../interfaces/profile/ChatComponent";
import { ChatList, setCurrentChatID } from "@/app/GlobalRedux/profile/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";

const chatsData: ChatComponentProps[] = [
  {
    name: "Audi A8",
    lastMessage: "Hey! we are finalizing some deals",
    bg: "/img/cars/Preview-1.png",
    id: 0,
  },
  {
    name: "Bentley A",
    lastMessage: "Hey! we are finalizing some deals",
    bg: "/img/cars/Preview-2.png",
    id: 0,
  },
  {
    name: "BMW x2",
    lastMessage: "Hey! we are finalizing some deals",
    bg: "/img/cars/Preview-3.png",
    id: 0,
  },
  {
    name: "Porsche",
    lastMessage: "Hey! we are finalizing some deals",
    bg: "/img/cars/Preview-4.png",
    id: 0,
  },
  {
    name: "Audi",
    lastMessage: "Hey! we are finalizing some deals",
    bg: "/img/cars/Preview-5.png",
    id: 0,
  },
];

interface ChatsProps {
  userChats: ChatList;
}

const Chats = ({ userChats }: ChatsProps) => {
  const [chats, setChats] = useState<ChatComponentProps[]>([]);
  const dispatch = useDispatch();
  const activeChatID = useSelector((state: RootState) => state.user.currentChatID)
  
  useEffect(() => {
    if (!userChats.recipients.length) return;

    const chats = userChats.recipients.map((id, index) => {
      return {
        name: chatsData[index].name,
        lastMessage: userChats.last_messages[id.toString()],
        bg: chatsData[index].bg,
        id,
      };
    });

    setChats(chats);
  }, [userChats])

  const onChatClick = (id: number) => {
    dispatch(setCurrentChatID(id))
  }

  return (
    <div className="min-w-[256px] h-25">
      {chats.map((chatsElement) => (
        <ChatComponent {...chatsElement} onChatClick={onChatClick} key={chatsElement.id} activeChatID={activeChatID} />
      ))}
    </div>
  );
};

export default Chats;
