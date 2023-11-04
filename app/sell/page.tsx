import React from "react";
import {
  BadgeCheck,
  Banknote,
  CalendarCheck,
  Clipboard,
  Megaphone,
  Zap,
  ZoomIn,
} from "lucide-react";
import styles from "../../components/sell/sell.module.css";
import SectionHeader from "@/components/sell/SectionHeader";
import PlansCard from "@/components/sell/PlansCard";
import ProcessCard from "@/components/sell/ProcessCard";
import BenefitsBlock from "@/components/sell/BenefitsBlock";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const cardInfo = [
  {
    title: "Classic Ad",
    description: "Sell your car using our platform to other client",
    text: [
      "Set your own price",
      "Full control of your advert",
      "Communicate with other customers",
    ],
    buttonText: "Get started",
    icon: <BadgeCheck width={32} height={32} color="#2563EB" />,
  },
  {
    title: "Direct Partner",
    description: "Sell your car to our trusted partners",
    text: [
      "Sell within 3 days",
      "Professional valuation of your car",
      "Unsubscribe anytime for free",
    ],
    buttonText: "Get started",
    icon: <Zap width={32} height={32} color="#2563EB" />,
  },
];

const howItWorksInfo = [
  {
    title: "Classic Ad way",
    description: "",
    text: [
      "Create an ad",
      "Receive requests by making appointments",
      "Sell a car at the best price",
    ],
    icons: [
      <Megaphone key={0} width={16} height={16} color="#2563EB" />,
      <CalendarCheck key={1} width={16} height={16} color="#2563EB" />,
      <Banknote key={2} width={16} height={16} color="#2563EB" />,
    ],
    buttonText: "Get started",
    icon: <BadgeCheck width={24} height={24} color="#2563EB" />,
  },
  {
    title: "Direct Partners way",
    description: "",
    text: [
      "Determine the cost of vehicle online",
      "On-site expert assessment",
      "Easy sale",
    ],
    icons: [
      <Clipboard key={0} width={16} height={16} color="#2563EB" />,
      <ZoomIn key={1} width={16} height={16} color="#2563EB" />,
      <Banknote key={2} width={16} height={16} color="#2563EB" />,
    ],
    buttonText: "Get started",
    icon: <Zap width={24} height={24} color="#2563EB" />,
  },
];
const FAQItems = [
  {
    question: "How do I sell my vehicle?",
    answer: "How do I sell my vehicle?",
  },
  {
    question: "Inform and set the price",
    answer: "Inform and set the price",
  },
  {
    question: "Vehicle care and preparation",
    answer: "Vehicle care and preparation",
  },
];
const Sell = () => {
  return (
    <div>
      <main
        className={`flex flex-col justify-center items-center flex-grow py-4 ${styles["bg-gradient1"]}`}
      >
        <SectionHeader
          title="Plans"
          text=" Sell your car with AutoHeven"
          description="How would you like to sell your vehicle?"
        />

        <div className="flex space-x-6 mt-8">
          {cardInfo.map((card) => (
            <PlansCard card={card} key={card.title} />
          ))}
        </div>
        <div className="text-center mb-6 mt-12 flex flex-col">
          <SectionHeader
            title="Process"
            text=" How it works?"
            description="Simple 3-step on either plan"
          />
        </div>

        <div className="flex space-x-6 mt-8">
          {howItWorksInfo.map((card) => (
            <ProcessCard card={card} key={card.title} />
          ))}
        </div>

        <div className="text-center mb-6 mt-12 flex flex-col">
          <SectionHeader
            title="Benefits"
            text="Let’s compare"
            description="Decide what fits your needs the most"
          />
        </div>

        <BenefitsBlock />

        <div className="text-center mb-6 mt-12 flex flex-col">
          <SectionHeader
            title="FAQ"
            text="Important Questions"
            description="We are happy to see that you are eager to know more"
          />
        </div>
        
        <Accordion type="single" collapsible className="w-[406px] mb-12">
          {FAQItems.map((accItem, index) => (
            <AccordionItem value={""+index} key={accItem.question}>
              <AccordionTrigger>{accItem.question}</AccordionTrigger>
              <AccordionContent>
                {accItem.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
};

export default Sell;
