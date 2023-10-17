"use client";
import React from "react";

import { Navbar } from "@/components/header/Navbar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { CheckCheck, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import styles from "../../components/sell/sell.module.css";

const cardInfo = [
  {
    title: "Selling privately",
    text: ["Make your own sale", "Sell at your set price", "Start for free"],
    buttonText: "Create an ad",
  },
  {
    title: "Direct sell to our partners",
    text: ["Sell your vehicle faster", "Appointments", "Trusted buyers"],
    buttonText: "Make an appointment",
  },
];

const Sell = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />

      <main
        className={`flex flex-col justify-center items-center flex-grow py-4 space-y-9 ${styles["bg-gradient1"]}`}
      >
        <h1 className="text-primary font-bold text-5xl">
          Sell your car with AutoHeven
        </h1>
        <h2 className="text-foreground font-semibold text-3xl">
          How would you like to sell your vehicle?
        </h2>
        <div className="flex space-x-12">
          {cardInfo.map((card) => (
            <Card
              key={card.title}
              className="w-80 h-min px-12 py-10 bg-background"
            >
              <CardHeader className="p-0 pb-">
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-0 py-[30px]">
                <ul className="space-y-2">
                  {card.text.map((text) => (
                    <li key={text} className="flex items-center">
                      <CheckCheck width={16} height={16} color="#2563EB" />
                      <div className="ml-[10px]">{text}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-0">
                <Button>
                  <div>{card.buttonText}</div>
                  <ChevronRight width={16} height={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Sell;
