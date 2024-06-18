import {
  CarIcon,
  BusIcon,
  TruckIcon,
  MotoIcon,
} from "@/public/icons/vehicle-category";
import Link from "next/link";
import { TypographyH4 } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bgElectric from "@/public/img/cars/listheaven/exploring_electric_cars.jpg";
import bgFilters from "@/public/img/cars/listheaven/filters_effective_usage.jpg";
import bgSell from "@/public/img/cars/listheaven/how_to_sell_your_car_online.jpg";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

const categories = [
  { icon: <CarIcon fill="#2463EB" />, href: "listheaven/cars", name: "Cars" },
  { icon: <MotoIcon />, href: "listheaven/motos", name: "Moto" },
  { icon: <TruckIcon />, href: "listheaven/trucks", name: "Trucks" },
  { icon: <BusIcon />, href: "listheaven/buses", name: "Buses" },
];

const tipCards = [
  {
    mainText: "Exploring",
    subText: "electric cars",
    bg: bgElectric,
  },
  {
    mainText: "Filters",
    subText: "effective usage",
    bg: bgFilters,
  },
  {
    mainText: "How to",
    subText: "sell your car online",
    bg: bgSell,
  },
];

const page = ({ params }) => {
  return (
    <main className="flex flex-col m-8 space-y-4">
      <section>
        <h1 className="font-bold mb-2">Category</h1>
        <div className="flex justify-between w-full ">
          {categories.map(({ icon, href, name }) => (
            <Link href={href} key={href}>
              <div className="block h-[52px] w-[52px] bg-[#5695FF63] flex items-center justify-center rounded-lg mb-1">
                {icon}
              </div>
              <Label className="block w-full text-center text-[#5F5F5F]">
                {name}
              </Label>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h1 className="font-bold mb-2">Learn out platform</h1>
        <div className="flex flex-col space-y-2">
          {tipCards.map(({ mainText, subText, bg }) => (
            <Card
              key={mainText}
              className="h-40 relative overflow-hidden text-primary-foreground  pt-12 pl-4 pb-6"
              style={{
                zIndex: -2,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: -1,
                  filter: "brightness(0.5)",
                }}
              >
                <Image
                  src={bg}
                  alt={mainText}
                  width={1920}
                  height={1080}
                  className="min-[1920px]:w-[100vw] "
                />
              </div>
              <CardHeader className="font-bold text-2xl">{mainText}</CardHeader>
              <CardContent className="p-0 mb-3 font-bold">
                {subText}
              </CardContent>
              <CardFooter className="p-0">
                <Button className="h-6">
                  Read{" "}
                  <ArrowRight width={12} height={12} className="ml-[2px]" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
