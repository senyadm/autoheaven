"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ChevronRight, Siren } from "lucide-react";
import { tipsInfo } from "@/interfaces/tipsInfo";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
interface ArticleCardProps {
  tipsInfo: tipsInfo; // Make sure brandInfo is properly imported
}

const ArticleCard = ({ tipsInfo }: ArticleCardProps) => {
  const { tipType, title, description, icon } = tipsInfo;
  const [isHovered, setIsHovered] = useState(false);
  const [addClassTimeout, setAddClassTimeout] = useState(null);

  const handleMouseEnter = () => {
    // Set a timeout to add the class after 1000 milliseconds (1 second)
    const timeoutId = setTimeout(() => {
      setIsHovered(true);
    }, 1000);
    setAddClassTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    // Clear the timeout if the cursor leaves before 1 second
    if (addClassTimeout) {
      clearTimeout(addClassTimeout);
    }
  };
  return (
    <>
      <Card
        className={`w-[350px] w-full bg-background shadow transform transition-transform duration-300 ${
          isHovered ? "hover:scale-105" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader>
          <CardDescription className="text-xs text-primary">
            {tipType}
          </CardDescription>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
      </Card>
      <Dialog
        open={isHovered}
        onOpenChange={() => {
          setIsHovered(false);
        }}
      >
        <DialogContent className="!w-80">
          <DialogHeader>
            <DialogDescription className="text-xs text-primary">
              {tipType}
            </DialogDescription>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription className="text-xs text-primary">
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex !justify-between w-full">
            {icon}
            <Button>
              Read more
              <ChevronRight />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleCard;
