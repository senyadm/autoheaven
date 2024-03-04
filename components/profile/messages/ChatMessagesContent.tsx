"use client";
import { Divide } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useAppSelector } from "../../../app/GlobalRedux/store";

const ChatMessagesContent = ({ ws }) => {
  const currentChat = useAppSelector((state) => state.chats.currentChat);
  const currentMessages = useAppSelector(
    (state) => state.chats.currentChatMessages
  );
  const userId = useAppSelector((state) => state.user.id);
  let firstMessageYou = true,
    firstMessageResponder = true;
  useEffect(() => {
    if (!currentChat) return;
    console.log(localStorage);
    if (!ws) return;
    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [currentChat, ws]);

  return (
    <div className="flex flex-col w-full h-full px-4 py-2">
      {currentMessages.map((message, index) => {
        const shouldPutMarkerYou = () =>
          userId !== message.receiver_id && firstMessageYou;
        const shouldPutMarkerResponder = () =>
          userId !== message.receiver_id && firstMessageResponder;
        let firstStr = "",
          secondStr = "";
        if (shouldPutMarkerYou()) {
          firstMessageYou = false;
          firstStr = "You";
        }

        if (shouldPutMarkerResponder()) {
          firstMessageResponder = false;
          secondStr = message.receiver_id;
        }
        const areYouSender = userId !== message.receiver_id;
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
                {message.message_content}
              </div>
              <div
                className={`flex justify-end text-[10px] ${
                  areYouSender ? "text-muted-foreground" : "text-muted"
                }`}
              >
                {/* {message.timestamp.toISOString()} */}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ChatMessagesContent;
