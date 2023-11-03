import React from "react";
import { Navbar } from "@/components/shared/header/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  BadgeCheck,
  Banknote,
  CalendarCheck,
  CheckCheck,
  Clipboard,
  ChevronRight,
  Star,
  Megaphone,
  Zap,
  ZoomIn,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import styles from "../../components/sell/sell.module.css";
import { Label } from "@/components/ui/label";
import SectionHeader from "@/components/sell/SectionHeader";
import PlansCard from "@/components/sell/PlansCard";
import ProcessCard from "@/components/sell/ProcessCard";
import StarRating from "@/components/sell/StarRating";

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
    icon: <BadgeCheck width={24} height={24} color="#2563EB" />,
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
    icon: <Zap width={24} height={24} color="#2563EB" />,
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

const Benefits = [
  {
    title: "Some Benefit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 3,
    direct: 5,
  },
  {
    title: "Some Benefit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 3,
    direct: 5,
  },
  {
    title: "Some Benefit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 1,
    direct: 4,
  },
  {
    title: "Some Benefit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 2,
    direct: 5,
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

        <div className="flex space-x-6 mt-8">
          <Card className="w-[1008px] h-min px-12 py-10 bg-primary-foreground border border-primary text-primary-foreground">
            <CardContent className="p-0">
              <table>
                <thead className="text-primary">
                  <tr>
                    <th></th>
                    <th>
                      <div className="flex">
                        <BadgeCheck width={24} height={24} color="#2563EB" />
                        <div>Classic</div>
                      </div>
                    </th>
                    <th>
                      <div className="flex">
                        <Zap width={24} height={24} color="#2563EB" />
                        <div>Direct</div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Benefits.map((benefit, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex flex-col">
                          <div className="text-foreground">
                            {
                              //semibold 24
                            }
                            {benefit.title}
                          </div>
                          <div className="text-muted-foreground">
                            {benefit.content}
                          </div>
                        </div>
                      </td>
                      <td>
                        <StarRating rating={benefit.classic} />
                      </td>
                      <td>
                        <StarRating rating={benefit.direct} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div></div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Sell;
