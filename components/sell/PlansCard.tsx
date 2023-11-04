import { CheckCheck, ChevronRight } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { PlansInfo } from '@/interfaces/sell/CardInfo';
import { TypographyH3, TypographyP } from '../ui/typography';
interface Props{
  card: PlansInfo;
}
const PlansCard = ({card}: Props) => {
  return (
    <Card
      key={card.title}
      className="w-[504px] h-min  bg-primary/10 px-12 py-10 border border-primary text-primary-foreground transform transition-transform hover:scale-105"
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
        <Button className="w-full border rounded-lg">
          <div>{card.buttonText}</div>
          <ChevronRight width={16} height={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PlansCard