import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../../../src/shared/utils/auth";
import { clientCars, clientChats } from "../../../src/shared/api/client";
import { RootState } from "../store";
import {
  Chat,
  ChatListAPI,
  ChatMessageAPI,
} from "../../../interfaces/profile/messages";

// export interface ChatFromBackend {
//   buyer_id: number;
//   product_id: number;
//   seller_id: number;
//   chat_id: number;
//   last_message_timestamp: Date;

//   // does not come from backend
//   chatter_id: number;
//   last_message?: string;
//   imageURL?: string;
// }
// export interface Chat extends ChatFromBackend {
//   // does not come from backend
//   chatter_id: number;
//   last_message?: string;
//   imageURL?: string;
// }

// export interface ChatMessage {
//   product_id: number;
//   sender_id: number;
//   receiver_id: number;
//   content: string;
//   timestamp: Date;
// }

interface ChatState {
  currentChatMessages: ChatMessageAPI[];
  currentChat: Chat | null;
  chats: Chat[];
}

const initialState: ChatState = {
  currentChat: null,
  currentChatMessages: [],
  chats: [],
};
export interface MessagePayload {
  messageContent: string;
  userId: number;
  timestamp: Date;
}
function determineChatterId(userId: number, chat: Chat) {
  return userId == chat.buyer_id ? chat.seller_id : chat.buyer_id;
}
export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setCurrentChathistory: (state, action: PayloadAction<ChatMessageAPI[]>) => {
      state.currentChatMessages = action.payload.reverse();
    },
    setCurrentChat: (state, action: PayloadAction<Chat>) => {
      state.currentChat = action.payload;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    // addChats: (state, action: PayloadAction<ChatListAPI>) => {
    //   const chats = action.payload[0].map((chat) => {
    //     return {
    //       ...chat,
    //       chatter_id: determineChatterId(action.payload[1], chat),
    //     };
    //   });
    //   state.chats = [...state.chats, ...chats];
    // },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats = [...state.chats, action.payload];
    },
    deleteChat: (state, action: PayloadAction<Chat>) => {
      state.chats = state.chats.filter(
        (chat) => chat.chat_id !== action.payload.chat_id
      );
    },
    addMessage: (state, action: PayloadAction<ChatMessageAPI>) => {
      if (!state.currentChat) return;

      state.currentChatMessages = [
        ...state.currentChatMessages,
        action.payload,
      ];
    },
  },
});

export const {
  setCurrentChathistory,
  setCurrentChat,
  addChat,
  addMessage,
  setChats,
  deleteChat,
} = chatSlice.actions;

export const fetchUserChats = createAsyncThunk(
  "user/fetchUserChats",
  async (clientUserId: number, { dispatch, getState }) => {
    try {
      const chatListResponse = await clientChats.get(`/chat_list`);

      let chatList = [] as Chat[];
      for (const chat of chatListResponse.data) {
        // remove chats with yourself
        if (chat.buyer_id !== chat.seller_id) {
          const chatterId = determineChatterId(clientUserId, chat);
          chatList.push({
            ...chat,
            chatter_id: chatterId,
            carInfo: null,
          });
        }
      }

      const carPromiseURLs = chatList.map(
        (chat) => `api/cars/${chat.product_id}`
      );

      const carPromises = carPromiseURLs.map((url: string) =>
        clientCars.get(url)
      );
      await Promise.allSettled(carPromises).then((carInfos) => {
        carInfos.forEach((carInfo, index) => {
          if (carInfo.status === "fulfilled") {
            chatList[index].carInfo = carInfo.value.data;
          } else {
            console.error("Error fetching car info:", carInfo.reason);
          }
        });
      });
      dispatch(setChats(chatList));
      return chatList;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  "user/fetchChatMessages",
  async (chat_id: number, { dispatch }) => {
    try {
      const response = await clientChats.get(`/chat_history/${chat_id}`, {});
      dispatch(setCurrentChathistory(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
  }
);

export const selectChat = createAsyncThunk(
  "user/selectChat",
  async (chat: Chat, { dispatch, getState }) => {
    dispatch(setCurrentChat(chat));
    dispatch(fetchChatMessages(chat.chat_id));
  }
);
