import React from "react";
import { Navbar } from "@/components/shared/header/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { BadgeCheck, Banknote, CalendarCheck, CheckCheck, Clipboard, ChevronRight, Star, Megaphone, Zap, ZoomIn } from "lucide-react";
import { Button } from "../../components/ui/button";
import styles from "../../components/sell/sell.module.css";
import { Label } from "@/components/ui/label";

const cardInfo = [
  {
    title: "Classic Ad",
    description: "Sell your car using our platform to other client",
    text: [
      "Set your own price",
      "Full control of your advert",
      "Communicate with other customers"
    ],
    buttonText: "Get started",
    icon: <BadgeCheck width={24} height={24} color="#2563EB" />
  },
  {
    title: "Direct Partner",
    description: "Sell your car to our trusted partners",
    text: [
      "Sell within 3 days",
      "Professional valuation of your car",
      "Unsubscribe anytime for free"
    ],
    buttonText: "Get started",
    icon: <Zap width={24} height={24} color="#2563EB" />
  },
];

const howItWorksInfo = [
  {
    title: "Classic Ad way",
    description: "",
    text: [
      "Create an ad",
      "Receive requests by making appointments",
      "Sell a car at the best price"
    ],
    icons: [
      <Megaphone key={0} width={16} height={16} color="#2563EB" />,
      <CalendarCheck key={1} width={16} height={16} color="#2563EB" />,
      <Banknote key={2} width={16} height={16} color="#2563EB" />
    ],
    buttonText: "Get started",
    icon: <BadgeCheck width={24} height={24} color="#2563EB" />
  },
  {
    title: "Direct Partners way",
    description: "",
    text: [
      "Determine the cost of vehicle online",
      "On-site expert assessment",
      "Easy sale"
    ],
    icons: [
      <Clipboard key={0} width={16} height={16} color="#2563EB" />,
      <ZoomIn key={1} width={16} height={16} color="#2563EB" />,
      <Banknote key={2} width={16} height={16} color="#2563EB" />
    ],
    buttonText: "Get started",
    icon: <Zap width={24} height={24} color="#2563EB" />
  },
];

const Benefits = [
  {
    title: "Some Benefit",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 3,
    direct: 5
  },
  {
    title: "Some Benefit",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 3,
    direct: 5
  },
  {
    title: "Some Benefit",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 3,
    direct: 5
  },
  {
    title: "Some Benefit",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 3,
    direct: 5
  },
]

const Sell = () => {
  return (
    <div>
    
      <main className={`flex flex-col justify-center items-center flex-grow py-4 ${styles["bg-gradient1"]}`}>
      <Label className="text-sm text-primary mb-3 mt-3">Plans</Label>
      <Label className="text-4xl bg-gradient-to-t from-gray-500 to-gray-900 text-transparent bg-clip-text">
  Sell your car with AutoHeven
</Label>
        <Label className="text-muted-foreground font-semibold text-lg mt-2">How would you like to sell your vehicle?</Label>
        <div className="flex space-x-6 mt-8">
          {cardInfo.map((card) => (
             <Card key={card.title} className="w-[504px] h-min px-12 py-10 bg-primary-foreground border border-primary text-primary-foreground transform transition-transform hover:scale-105">
               <CardHeader className="p-0 pb-4">
                <CardTitle className="text-primary text-lg flex flex-row items-center space-x-2">
                  {card.icon}
                  <span>{card.title}</span>
                </CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-0 py-[30px]">
                <ul className="space-y-2">
                  {card.text.map((text) => (
                    <li key={text} className="flex items-center">
                      <CheckCheck width={16} height={16} color="#2563EB" className="border-primary"/>
                      <div className="ml-[10px] text-sm text-primary">{text}</div>
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
          ))}
        </div>
<div className="text-center mb-6 mt-12 flex flex-col">
        <Label className="text-sm text-primary mb-3 mt-3">Process</Label>
        <Label className="text-5xl bg-gradient-to-t from-gray-500 to-gray-900 text-transparent bg-clip-text">How it works?</Label>
        <Label className="text-muted-foreground font-semibold text-lg mt-2">Simple 3-step on either plan</Label>
</div>

<div className="flex space-x-6 mt-8">
  {howItWorksInfo.map((card) => (
    <Card key={card.title} className="w-[504px] h-min px-12 py-10 bg-primary-foreground border border-primary text-primary-foreground transform transition-transform hover:scale-105">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-primary text-lg flex flex-row items-center space-x-2">
          {card.icon}
          <span>{card.title}</span>
        </CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">{card.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0 py-[30px]">
  <ul className="space-y-2">
    {card.text.map((text, index) => (
      <li key={text} className="flex items-center">
        {card.icons && card.icons[index] ? card.icons[index] : <CheckCheck width={16} height={16} color="#2563EB" className="border-primary"/>}
        <div className="ml-[10px] text-sm text-primary">{text}</div>
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
  ))}
</div>

<div className="text-center mb-6 mt-12 flex flex-col">
        <Label className="text-sm text-primary mb-3 mt-3">Process</Label>
        <Label className="text-5xl bg-gradient-to-t from-gray-500 to-gray-900 text-transparent bg-clip-text">How it works?</Label>
        <Label className="text-muted-foreground font-semibold text-lg mt-2">Simple 3-step on either plan</Label>
</div>

<div className="flex space-x-6 mt-8">
    <Card className="w-[1008px] h-min px-12 py-10 bg-primary-foreground border border-primary text-primary-foreground">
      <CardHeader className="p-0 pb-4">
      <CardTitle className="text-primary text-lg flex justify-end items-center space-x-2">
          <BadgeCheck width={24} height={24} color="#2563EB" />
          <Label>Classic</Label>
        <Zap width={24} height={24} color="#2563EB" />
        <Label>Direct</Label>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 py-[30px]">
  <div className="space-y-2 grid grid-cols-3 gap-4">
    {Benefits.map((text, index) => (
      <div key={index}>
      <div className="flex flex-col"><Label>{text.title}</Label>
      <Label>{text.content}</Label>
        </div>
       <div>{text.classic}</div> 
       <div>{text.direct}</div>
        </div>
  ))}
  </div>
</CardContent>
    </Card>

</div>

      </main>
    </div>
  );
};

export default Sell;
