import { tipsInfo } from "@/interfaces/tipsInfo";
import { TipsBlockDictionary } from "@/types";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { LogIn, Search, Siren, SlidersHorizontal } from "lucide-react";
import SvgIcon from "../SvgIcon";
import ArticleCard from "./ArticleCard";
import GradientHeading from "./GradientHeading";

const tipsData: tipsInfo[] = [
  {
    tipType: "Tips",
    title: "How to Sell Your Car Safely Online",
    description:
      "Learn practical steps to protect yourself from online car scams when buying or selling.",
    icon: <Siren width={36} height={36} />,
    ind: "tip1",
  },
  {
    tipType: "Explore",
    title: "Where to Find Your Dream Car",
    description:
      "Explore how to find the perfect car using easy categories and subcategories.",
    icon: <Search width={36} height={36} />,
    ind: "tip2",
  },
  {
    tipType: "Tips",
    title: "Benefits of registering to AutoHeaven",
    description:
      "Understand the considerations of registering on our platform versus using it as a guest.",
    icon: <LogIn width={36} height={36} />,
    ind: "tip3",
  },
  {
    tipType: "Tips",
    title: "Using Filters Effectively",
    description:
      "Discover how filters help you find your ideal car. Learn to narrow down options by price, year, mileage, type, and fuel to find the perfect match.",
    icon: <SlidersHorizontal width={36} height={36} />,
    ind: "tip4",
  },
  {
    tipType: "Explore",
    title: "Exploring Electric Cars",
    description:
      "Learn why electric cars are gaining popularity. Explore benefits, charging options, and how our platform supports the electric car movement.",
    icon: <LightningBoltIcon width={36} height={36} />,
    ind: "tip5",
  },
  {
    tipType: "Explore",
    title: "Unique Vehicles: Trucks",
    description:
      "Dive into special vehicles like tractors and motorhomes. Discover unique options in the 'Special Vehicles' category to meet specific needs.",
    icon: (
      <SvgIcon
        filepath="icons/TruckTractor.svg"
        alt=""
        width={36}
        height={36}
      />
    ),
    ind: "tip6",
  },
];

interface Props {
  tipsBlock: TipsBlockDictionary | null;
}

const TipsBlock = ({ tipsBlock }: Props) => {
  return (
    <section className="flex flex-col items-center px-17.5 py-10 mt-9 bg-background mx-20 border-border border rounded-md max-w-full w-full md:max-w-6xl">
      <GradientHeading
        title={tipsBlock?.learnPlatformTitle || "Learn our Platform"}
        className="mb-9"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-9 gap-x-5 w-full px-4">
        {tipsData.map((tipsElement) => (
          <ArticleCard
            tipsDict={tipsBlock ? tipsBlock.tips[tipsElement.ind] : null}
            tipsInfo={tipsElement}
            key={tipsElement.title}
          ></ArticleCard>
        ))}
      </div>
    </section>
  );
};

export default TipsBlock;
