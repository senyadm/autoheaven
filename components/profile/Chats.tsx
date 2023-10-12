import React from "react";
import ChatComponent from "./ChatComponent";
import { ChatComponentProps } from "../../interfaces/profile/ChatComponent";

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
const Chats = () => {
  return (
    <div className="min-w-[256px] h-25">
      {chatsData.map((chatsElement) => (
        <ChatComponent {...chatsElement} key={chatsElement.id} />
      ))}
    </div>
  );
};

export default Chats;
