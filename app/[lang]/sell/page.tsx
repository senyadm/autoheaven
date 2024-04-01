import React, { useEffect, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  CalendarCheck,
  Clipboard,
  Megaphone,
  Zap,
  ZoomIn,
} from "lucide-react";
import styles from "../../../components/sell/sell.module.css";
import SectionHeader from "@/components/sell/SectionHeader";
import PlansCard from "@/components/sell/PlansCard";
import ProcessCard from "@/components/sell/ProcessCard";
import BenefitsBlock from "@/components/sell/BenefitsBlock";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PlansInfo } from "@/interfaces/sell/CardInfo";
import { getlocales } from "@/app/actions";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell your car on AutoHeaven",
  description: "Sell your car on AutoHeaven and get the best price",
};

const Sell = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const {
  //         sell: { main, classic },
  //       } = await getlocales(lang);
  //       setLabels(classic);
  //       setDict(main);
  //     } catch (error) {
  //       console.error("Error fetching tools data:", error);
  //     }
  //   }

  //   if (!dict) {
  //     fetchData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lang]);
  const locales = await getlocales(lang);
  const dict = locales.sell.main;
  const labels = locales.sell.classic;
  const cardInfo: PlansInfo[] = [
    {
      plan: "classic",
      title: dict?.classicAdWay || "Classic Ad",
      description:
        dict?.sellViaPlatform ||
        "Sell your car using our platform to other client",
      text: [
        dict?.setYourPrice || "Set your own price",
        dict?.fullAdControl || "Full control of your advert",
        dict?.communicateCustomers || "Communicate with other customers",
      ],
      buttonText: dict?.getStarted || "Get started",
      icon: <BadgeCheck width={32} height={32} color="#2563EB" />,
    },
    {
      plan: "direct",
      title: dict?.directPartner || "Direct Partner",
      description:
        dict?.sellToPartners || "Sell your car to our trusted partners",
      text: [
        dict?.sellIn3Days || "Sell within 3 days",
        dict?.professionalValuation || "Professional valuation of your car",
        dict?.unsubscribeFree || "Unsubscribe anytime for free",
      ],
      buttonText: dict?.getStarted || "Get started",
      icon: <Zap width={32} height={32} color="#2563EB" />,
    },
  ];

  const FAQItems = [
    {
      question: dict?.howToSellVehicle || "How do I sell my vehicle?",
      answer: dict?.howToSellVehicle || "How do I sell my vehicle?",
    },
    {
      question: dict?.informSetPrice || "Inform and set the price?",
      answer: dict?.informSetPrice || "Inform and set the price?",
    },
    {
      question: dict?.vehicleCarePreparation || "Vehicle care and preparation",
      answer: dict?.vehicleCarePreparation || "Vehicle care and preparation",
    },
  ];

  const howItWorksInfo = [
    {
      title: dict?.classicAd || "Classic Ad way",
      description: labels?.description || "Description",
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
      title: dict?.directPartner || "Direct Partners way",
      description: labels?.description || "Description",
      text: [
        dict?.determineCostOnline || "Determine the cost of vehicle online",
        dict?.onsiteAssessment || "On-site expert assessment",
        dict?.easySale || "Easy sale",
      ],
      icons: [
        <Clipboard key={0} width={16} height={16} color="#2563EB" />,
        <ZoomIn key={1} width={16} height={16} color="#2563EB" />,
        <Banknote key={2} width={16} height={16} color="#2563EB" />,
      ],
      buttonText: dict?.getStarted || "Get started",
      icon: <Zap width={24} height={24} color="#2563EB" />,
    },
  ];


  return (
    <div>
      <main
        className={`flex flex-col justify-center items-center flex-grow py-4 ${styles["bg-gradient1"]}`}
      >
        <SectionHeader
          title={dict?.howToSell || "How to Sell?"}
          text={dict?.sellYourCar || "Sell your car with AutoHeaven"}
          description={
            dict?.howToSell || "How would you like to sell your vehicle?"
          }
        />

        <div className="flex w-full justify-center space-x-6 mt-8">
          {cardInfo.map((card) => (
            <PlansCard
              card={card}
              key={card.title}
            />
          ))}
        </div>
        <div className="text-center mb-6 mt-12 flex flex-col">
          <SectionHeader
            title="Process"
            text={dict?.howItWorks || "How it works"}
            description={dict?.simple3Step || "Simple 3-step on either plan"}
          />
        </div>

        <div className="flex w-full justify-center space-x-6 mt-8">
          {howItWorksInfo.map((card) => (
            <ProcessCard card={card} key={card.title} />
          ))}
        </div>

        <div className="text-center mb-6 mt-12 flex flex-col">
          <SectionHeader
            title="Benefits"
            text={dict?.letsCompare || "Let’s compare"}
            description={
              dict?.decideNeeds || "Decide what fits your needs the most"
            }
          />
        </div>

        <BenefitsBlock />

        <div className="text-center mb-6 mt-12 flex flex-col">
          <SectionHeader
            title="FAQ"
            text={dict?.importantQuestions || "Important Questions"}
            description={
              dict?.happyToKnowMore ||
              "We are happy to see that you are eager to know more"
            }
          />
        </div>

        <Accordion type="single" collapsible className="w-[406px] mb-12">
          {FAQItems.map((accItem, index) => (
            <AccordionItem value={"" + index} key={accItem.question}>
              <AccordionTrigger>{accItem.question}</AccordionTrigger>
              <AccordionContent>{accItem.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
};

export default Sell;
