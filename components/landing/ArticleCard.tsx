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

  return (
    <>
      <Card
        className={`w-[350px] w-full bg-background shadow transform transition-transform duration-300 ${
         "hover:scale-105"
        }`}
        onClick={()=>setIsHovered(true)}
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
