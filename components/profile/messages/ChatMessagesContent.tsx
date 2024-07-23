"use client";
import { Divide } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/GlobalRedux/store";
import { ChatMessageAPI } from "../../../interfaces/profile/messages";
import {
  fetchChatMessages,
  setCurrentChat,
} from "../../../app/GlobalRedux/profile/chatSlice";
import { useRouter } from "next/router";
import { formatMessageDate } from "../../../src/shared/utils/date";
interface ChatMessagesContentProps {}
const ChatMessagesContent = () => {
  const dispatch = useAppDispatch();
  const currentMessages: ChatMessageAPI[] = useAppSelector(
    (state) => state.chats.currentChatMessages
  );
  const messagesByDate = useMemo(() => {
    return Object.groupBy(currentMessages, (message) =>
      new Date(message.created_at).toDateString()
    );
  }, [currentMessages]);
  const userId = useAppSelector((state) => state.user.id);
  let firstMessageYou = true,
    firstMessageResponder = true;
  return (
    <div className="flex flex-col w-full h-full px-4 py-2 overflow-auto">
      {Object.entries(messagesByDate).map(([date, messages]) => (
        <div key={date}>
          <div className="text-center text-xs text-muted-foreground">
            {formatMessageDate(new Date(date))}
          </div>
          {messages?.map((message, index) => {
            const shouldPutMarkerYou = () =>
              userId === message.sender_id && firstMessageYou;
            const shouldPutMarkerResponder = () =>
              userId === message.sender_id && firstMessageResponder;

            const areYouSender = userId == message.sender_id;
            return (
              <div
                className={`flex w-full ${areYouSender ? "" : ""}`}
                key={message.timestamp + message.message_id}
              >
                <div
                  className={`w-5/12 space-y-1 rounded-lg border pr-2 py-2 pl-4 ${
                    areYouSender ? "ml-auto text-foreground bg-primary" : ""
                  }`}
                >
                  <div
                    className={`text-sm ${
                      areYouSender
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {message.message_content}
                  </div>
                  <div
                    className={`flex justify-end text-[10px] ${
                      areYouSender
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChatMessagesContent;
