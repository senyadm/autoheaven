import { Car } from "../shared/Car";

export interface ChatListAPI {
  buyer_id: number;
  chat_id: number;
  last_message_timestamp: string | null;
  product_id: number;
  seller_id: number;
}

export interface Chat extends ChatListAPI {
  carInfo?: Car;
  chatter_id?: number;
}
export interface ChatMessageAPI {
  chat_id: number;
  message_content: string;
  message_id: number;
  read_status: boolean;
  sender_id: number;
  timestamp: string;
}
