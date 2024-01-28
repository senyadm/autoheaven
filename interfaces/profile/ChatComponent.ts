export interface ChatComponentProps {
  name: string;
  lastMessage: string;
  bg: string;
  id: number;
  onChatClick?: (id: number) => void;
  activeChatID?: number;
}
