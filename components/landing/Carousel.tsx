"use client";

import { RootState } from "@/app/GlobalRedux/store";
import { getlocales } from "@/app/actions";
import { Locale } from "@/i18n.config";
import { CarouselDictionaryItem } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TypographyH1, TypographyH4 } from "../ui/typography";
import { VehicleType } from "../../src/entities/filters";
import { title } from "process";

const carouselData = {
  [VehicleType.Car]: {
    imageName: "waqas-sultan.png",
    title: "Cruise in Comfort",
    subtitle: "Discover Cars Tailored to Your Lifestyle",
  },
  [VehicleType.Moto]: {
    imageName: "scooter.png",
    title: "Effortless Urban Travel",
    subtitle: "Discover Cars Tailored to Your Lifestyle",
  },
  [VehicleType.Truck]: {
    imageName: "truck 1.png",
    title: "Group Travel Made Easy",
    subtitle: "Discover Cars Tailored to Your Lifestyle",
  },
  [VehicleType.Bus]: {
    imageName: "markus-winkler.png",
    title: "Empower Your Business",
    subtitle: "Discover Cars Tailored to Your Lifestyle",
  },
};

const Carousel = ({
  lang,
  menu,
}: {
  lang: Locale;
  menu: CarouselDictionaryItem[];
}) => {
  const activeTransportCategory = useSelector(
    (state: RootState) => state.transportCategory.activeCategory
  );

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
      <div className="z-10 flex flex-col items-center justify-end h-full relative text-white text-center bottom-16">
        <TypographyH1>
          {carouselData[activeTransportCategory].title || "Cruise in Comfort"}
        </TypographyH1>
        <TypographyH4 className="mt-2.5">
          {carouselData[activeTransportCategory].subtitle ||
            "Discover Cars Tailored to Your Lifestyle"}
        </TypographyH4>
      </div>
    </div>
  );
};

export default Carousel;
