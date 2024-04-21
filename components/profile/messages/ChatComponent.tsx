import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "../../../app/GlobalRedux/store";
import { Chat } from "../../../interfaces/profile/messages";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { deleteChat } from "../../../app/GlobalRedux/profile/chatSlice";
import { carsDomain, clientChats } from "../../../app/GlobalRedux/client";
import Image from "next/image";
interface ChatComponentProps {
  chat: Chat;
  onChatClick?: (id: number) => void;
}
const ChatComponent = ({ chat, onChatClick }: ChatComponentProps) => {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector((state) => state.chats.currentChat);
  const { chat_id, last_message, chatter_id, carInfo, product_id } = chat;
  // if (!carInfo) return null;
  // const { imageurl, title } = carInfo;
  function handleDelete() {
    console.log("Deleting chat");

    dispatch(deleteChat(chat));
    clientChats.delete(`/chat_list/${chat_id}`).catch((err) => {
      console.error(err);
    });
  }
  return (
    <div
      className={`flex border-b ${
        chat_id === currentChat?.chat_id ? "bg-secondary" : ""
      }
      hover:bg-secondary`}
    >
      <Button
        onClick={onChatClick}
        className={`flex w-full bg-inherit justify-start shadow-none text-left hover:bg-inherit space-x-[10px] h-[100px]`}
      >
        <div className="h-16 w-16 relative">
          <div className="absolute inset-0 overflow-hidden  rounded-lg">
            {/* <Image
            src={imageurl}
            alt=""
            layout="fill" // This will fill the parent container
            objectFit="cover" // Crop the image to cover the container
          /> */}
            <Image
              alt=""
              src={`${carsDomain}/cars/download/${product_id}`}
              fill={true}
              sizes={"100%"}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-lg text-foreground font-semibold">
            {carInfo?.title || `${carInfo?.make} ${carInfo?.model}`}
          </div>
          <div className="text-muted text-muted-foreground">
            {last_message?.message_content}
          </div>
        </div>
      </Button>
      <Dialog>
        <DialogTrigger className="h-4 p-2">
          <TrashIcon className="hover:text-red-700 h-4 w-4" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure you want to delete this chat?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              chat.
            </DialogDescription>
            <DialogClose asChild>
              <DialogFooter className="sm:justify-around">
                <Button type="button" variant="secondary">
                  Close
                </Button>

                <Button onClick={handleDelete}>Confirm</Button>
              </DialogFooter>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatComponent;
