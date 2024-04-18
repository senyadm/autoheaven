import React from "react";
import { Button } from "../ui/button";
import SvgIcon from "../SvgIcon";
import { Heart } from "lucide-react";
import { Label } from "../ui/label";

type PageDisplayed = "cars" | "profileCars" | "profileAds";

interface ResultCarCardButtonsProps {
  pageDisplayed: PageDisplayed;
  onButtonClick: (buttonType: string) => void;
  isWish?: boolean;
  isMine?: boolean;
}

const ResultCarCardButtons: React.FC<ResultCarCardButtonsProps> = ({
  pageDisplayed,
  onButtonClick,
  isWish = false,
  isMine = false,
}) => {
  const buttonBaseClasses = "flex items-center justify-center w-full md:w-auto"; // w-full on mobile, auto width on larger screens
  const heartButtonClasses = `${buttonBaseClasses} text-primary hover:text-primary-foreground p-2 md:p-[0.625rem] mb-2 md:mb-0 md:mr-2
    ${isWish ? "bg-primary text-background" : "bg-background"}`;
  const contactButtonClasses = `${buttonBaseClasses} bg-primary text-secondary px-2 py-2 md:px-2 md:py-3 mb-2 md:mb-0`;

  const myCarComponent = (
    <div className="flex flex-row space-x-2">
      <Button onClick={() => onButtonClick("advertise")}>
        <Label className="text-xs">Advertise</Label>
      </Button>
      <Button onClick={() => onButtonClick("edit")}>
        <Label className="text-xs">Edit</Label>
      </Button>
    </div>
  );
  if (isMine) return myCarComponent;
  const pageDisplayedToButtons = {
    cars: (
      <div className="w-full">
        <Button
          className={` text-primary hover:text-primary-foreground md:p-[0.625rem] mr-2
      ${isWish ? "bg-primary text-background" : "bg-background"}`}
          onClick={() => onButtonClick("like")}
        >
          <Heart width={16} height={16} />
        </Button>
        <Button
          className="bg-primary text-secondary md:px-2 md:py-3"
          onClick={() => onButtonClick("contact")}
        >
          <SvgIcon
            filepath="/icons/cars/envelope-closed.svg"
            width={16}
            height={16}
            alt=""
            className="invert mr-2"
          />
          <Label className="text-xs"> Contact</Label>
        </Button>
      </div>
    ),
    profileCars: myCarComponent,
    profileAds: (
      <>
        <Button
          className="bg-primary text-background p-[0.625rem] mr-2"
          onClick={() => onButtonClick("like")}
        >
          <Heart width={16} height={16} fill="#fff" />
        </Button>
        <Button
          className="bg-primary text-secondary px-2 py-3"
          onClick={() => onButtonClick("contact")}
        >
          <SvgIcon
            filepath="/icons/cars/envelope-closed.svg"
            width={16}
            height={16}
            alt=""
            className="invert mr-2"
          />
          Contact
        </Button>
      </>
    ),
  };
  return pageDisplayedToButtons[pageDisplayed];
};

export default ResultCarCardButtons;
