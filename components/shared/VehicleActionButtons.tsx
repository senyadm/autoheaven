'use client'
import { Button } from "../ui/button";
import SvgIcon from "../SvgIcon";
import { Heart } from "lucide-react";
import {
  addToWishlistThunk,
  deleteFromWishlistThunk,
} from "@/src/entities/user";
import {
  addChat,
  setCurrentChat,
} from "../../app/GlobalRedux/profile/chatSlice";
import { Chat } from "../../interfaces/profile/messages";
import { fetchAndSetUser } from "../../src/shared/utils/user";
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppStore } from '@/app/GlobalRedux/store';
import { Vehicle, VehicleOnCard } from '@/src/entities/vehicle';
import { cn } from '@/src/shared/utils/cn';
import LinkLikeButton from '@/src/shared/ui/LinkLikeButton';

// type PageDisplayed = "cars" | "profileCars" | "profileAds";

interface VehicleActionButtonsProps {
  carDetails: VehicleOnCard,
  className?: string;
}

const VehicleActionButtons: React.FC<VehicleActionButtonsProps> = ({
  carDetails, className
}) => {
  const router = useRouter();
  const buttonsText = useAppSelector((state) => state.pageData.dict?.shared?.listing);

  const [user, dispatch] = useAppStore((state) => state.user);
  const { wishlist, id: userId } = user;
  const productId = carDetails.id;
  const isMine = carDetails.seller_id === userId;
  const isWish = wishlist?.includes(productId);
  // const buttonBaseClasses = "flex items-center justify-center w-full md:w-auto"; // w-full on mobile, auto width on larger screens
  // const heartButtonClasses = `${buttonBaseClasses} text-primary hover:text-primary-foreground p-2 md:p-[0.625rem] mb-2 md:mb-0 md:mr-2
  //   ${isWish ? "bg-primary text-background" : "bg-background"}`;
  // const contactButtonClasses = `${buttonBaseClasses} bg-primary text-secondary px-2 py-2 md:px-2 md:py-3 mb-2 md:mb-0`;
  const onButtonClick = (type: string) => {
    // const item = getToken();
    if (!userId) {
      fetchAndSetUser(dispatch, true);
      return;
    }

    if (type === "advertise") {
      const newParams = new URLSearchParams({
        id: String(productId),
        type: carDetails.vehicleType,
      }).toString();
      router.push(`/payment?id=${newParams}`);

      return;
    }

    if (type === "like") {
      if (wishlist?.includes(productId)) {
        dispatch(deleteFromWishlistThunk(productId));
      } else {
        dispatch(addToWishlistThunk(productId));
      }
    }
    if (type === "contact") {
      const newChat: Chat = {
        product_id: productId,
        chat_id: 0,
        last_message: null,
        buyer_id: userId,
        seller_id: carDetails.seller_id,
        chatter_id: carDetails.seller_id,
        carInfo: carDetails,
      };

      dispatch(addChat(newChat));
      dispatch(setCurrentChat(newChat));
      router.push("/profile/messages");
    }
  };
  
  return isMine ? (
    <div className={cn("flex space-x-2", className)}>
    <Button onClick={() => onButtonClick("advertise")}>
      <p className="text-xs">{buttonsText?.advertise || 'Advertise'}</p>
    </Button>
    <LinkLikeButton
      href={`/profile/cars/edit/${productId}`}
      className="h-9 px-4 py-2"
    >
      <p className="text-xs text-secondary cursor-pointer">{buttonsText?.edit || 'Edit'}</p>
    </LinkLikeButton>
  </div>
  ) :
      <div className={cn("flex", className)}>
        <Button
          className={` text-primary hover:text-primary-foreground md:p-[0.625rem] mr-2
      ${isWish ? "bg-primary text-background" : "bg-background"}`}
          onClick={() => onButtonClick("like")}
        >
          <Heart width={16} height={16} />
        </Button>
        <Button
          className="bg-primary text-secondary py-0 md:px-2 md:py-3"
          onClick={() => onButtonClick("contact")}
        >
          <SvgIcon
            filepath="/icons/cars/envelope-closed.svg"
            width={16}
            height={16}
            alt=""
            className="invert mr-2"
          />
          <p className="text-xs"> {buttonsText?.contact || 'Contact'}</p>
        </Button>
      </div>
  };

export default VehicleActionButtons;
