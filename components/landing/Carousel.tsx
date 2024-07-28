"use client";

import { RootState, useAppSelector } from "@/app/GlobalRedux/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import { TypographyH1, TypographyH4 } from "../ui/typography";
import { VehicleType } from '@/src/shared/model/params';

const carouselData = {
  [VehicleType.Car]: {
    imageName: "waqas-sultan.png",
    },
  [VehicleType.Moto]: {
    imageName: "scooter.png",
   },
  [VehicleType.Truck]: {
    imageName: "truck 1.png",
     },
  [VehicleType.Bus]: {
    imageName: "markus-winkler.png",
      },
};

const Carousel = () => {
  const activeTransportCategory = useSelector(
    (state: RootState) => state.transportCategory.activeCategory
  );
  const carouselText = useAppSelector((state) => state.pageData.dict?.carousel);

  return (
    <div
      className={`w-full h-[22.1875rem] bg-center bg-cover absolute text-card-foreground`}
    >
      <div className="absolute top-0 h-full w-full">
        <Image
          src={`/img/landing/${carouselData[activeTransportCategory].imageName}`}
          alt="Picture of the author"
          fill
          className={`transition-opacity duration-700 object-cover object-center`}
        />

        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 -10em 15em black",
          }}
        ></div>
      </div>
      {carouselText && <div className="z-10 flex flex-col items-center justify-end h-full relative text-white text-center bottom-16">
        <TypographyH1>
          {carouselText[activeTransportCategory]?.title || "Cruise in Comfort"}
        </TypographyH1>
        <TypographyH4 className="mt-2.5">
          {carouselText[activeTransportCategory]?.subtitle ||
            "Discover Cars Tailored to Your Lifestyle"}
        </TypographyH4>
      </div>}
    </div>
  );
};

export default Carousel;
