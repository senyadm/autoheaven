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
import { TypographyH3 } from "../ui/typography";
interface Props {
  card: ProcessInfo;
}
const ProcessCard = ({ card }: Props) => {
  return (
    <Card
      key={card.title}
      className="max-w-[504px] w-full h-min px-9 py-12 bg-primary-foreground border border-primary text-primary-foreground transform transition-transform hover:scale-105"
    >
      <CardHeader className="p-0">
        <CardTitle className="text-primary text-lg flex flex-row items-center space-x-2">
          {card.icon}
          <TypographyH3>{card.title}</TypographyH3>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-9 pb-0 text-black">
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
              <div className="ml-[10px] text-sm">{text}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProcessCard;
