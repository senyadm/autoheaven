import { Divide } from "lucide-react";
import React from "react";

const chatIdToMessages = {
  0: [
    {
      text: "Hi!",
      time: "19:01",
      sender: "Buyer - Austin",
    },
    {
      text: "Hey",
      time: "19:01",
      sender: "You",
    },
    {
      text: "I was wondering about this Audi R8",
      time: "19:01",
      sender: "Buyer - Austin",
    },
    {
      text: "Yeah, what's that",
      time: "19:01",
      sender: "You",
    },
  ],
};
const currentChatId = 0;
const ChatMessagesContent = () => {
  let firstMessageYou = true,
    firstMessageResponder = true;
  return (
    <div className="flex flex-col w-full h-full px-4 py-2">
      {chatIdToMessages[currentChatId].map((message, index) => {
        const shouldPutMarkerYou = () =>
          message.sender === "You" && firstMessageYou;
        const shouldPutMarkerResponder = () =>
          message.sender !== "You" && firstMessageResponder;
        let firstStr = "",
          secondStr = "";
        if (shouldPutMarkerYou()) {
          firstMessageYou = false;
          firstStr = "You";
        }

        if (shouldPutMarkerResponder()) {
          firstMessageResponder = false;
          secondStr = message.sender;
        }
        const areYouSender = message.sender === "You";
        return (
          <>
            <div className="text-sm text-muted-foreground mb-1">
              <div className="flex justify-end">{firstStr}</div>
              <div>{secondStr}</div>
            </div>

            <div
              key={index}
              className={`w-5/12 space-y-1 rounded-lg border pr-2 py-2 pl-4 ${
                areYouSender ? "ml-auto text-foreground" : "bg-primary"
              }`}
            >
              <div
                className={`text-sm ${
                  areYouSender ? "text-foreground" : "text-primary-foreground"
                }`}
              >
                {message.text}
              </div>
              <div
                className={`flex justify-end text-[10px] ${
                  areYouSender ? "text-muted-foreground" : "text-muted"
                }`}
              >
                {message.time}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ChatMessagesContent;
