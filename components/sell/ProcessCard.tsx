import { CheckCheck, ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { ProcessInfo } from "@/interfaces/sell/CardInfo";
interface Props {
  card: ProcessInfo;
}
const ProcessCard = ({ card }: Props) => {
  return (
    <Card
      key={card.title}
      className="w-[504px] h-min px-12 py-10 bg-primary-foreground border border-primary text-primary-foreground transform transition-transform hover:scale-105"
    >
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-primary text-lg flex flex-row items-center space-x-2">
          {card.icon}
          <span>{card.title}</span>
        </CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">
          {card.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 py-[30px]">
        <ul className="space-y-2">
          {card.text.map((text, index) => (
            <li key={text} className="flex items-center">
              {card.icons && card.icons[index] ? (
                card.icons[index]
              ) : (
                <CheckCheck
                  width={16}
                  height={16}
                  color="#2563EB"
                  className="border-primary"
                />
              )}
              <div className="ml-[10px] text-sm text-primary">{text}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProcessCard;
