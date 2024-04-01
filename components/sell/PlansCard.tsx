"use client"
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
import { PlansInfo } from "@/interfaces/sell/CardInfo";
import { TypographyH3, TypographyP } from "../ui/typography";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
interface Props {
  card: PlansInfo;
  lang: string;
}
const PlansCard = ({ card, lang }: Props) => {
  const router = useRouter();;
   const handleNavigate = (e: any, mode: "classic" | "direct" | undefined) => {
      const token = getToken();
    e.preventDefault();

    if (!token) {
      router.push(`${lang}/login`);
      return;
    }

    router.push(`/${lang}/sell/${mode}`);
  }
  return (
    <Card
      key={card.title}
      className="max-w-[504px] w-full h-min  bg-primary/10 px-12 py-10 border border-primary text-primary-foreground transform transition-transform hover:scale-105"
    >
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-primary text-lg flex flex-row items-center space-x-2">
          {card.icon}
          <TypographyH3>{card.title}</TypographyH3>
        </CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">
          <TypographyP>{card.description}</TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 py-[30px]">
        <ul className="space-y-2 text-black">
          {card.text.map((text) => (
            <li key={text} className="flex items-center">
              <CheckCheck
                width={16}
                height={16}
                color="#2563EB"
                className="border-primary"
              />
              <div className="ml-[10px] text-sm">{text}</div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          className="w-full border rounded-lg"
          onClick={(e) => handleNavigate(e, card.plan)}
        >
          <div>{card.buttonText}</div>
          <ChevronRight width={16} height={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlansCard;
