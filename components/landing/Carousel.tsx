"use client";
import React from "react";
import { TypographyH1, TypographyH4 } from "../ui/typography";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import Image from "next/image";

const carouselBgs = [
  "waqas-sultan.png",
  "scooter.png",
  "truck 1.png",
  "markus-winkler.png",
];
const Carousel = () => {
  const activeTransportCategory = useSelector(
    (state: RootState) => state.transportCategory.activeCategory
  );
  return (
    <div
      className={`w-full h-[22.1875rem] bg-center bg-cover absolute text-card-foreground`}
    >
      <div className="absolute top-0 h-full w-full">
        {carouselBgs.map((carouselBg, index) => (
          <Image
            src={`/img/landing/${carouselBg}`}
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            key={carouselBg}
            className={`transition-opacity duration-700 ${
              activeTransportCategory !== index ? "opacity-0" : "opacity-100"
            }`}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 -10em 15em black",
          }}
        ></div>
      </div>
      <div className="z-10 flex flex-col items-center justify-end h-full relative text-white">
        <TypographyH1>Cruise in Comfort</TypographyH1>
        <TypographyH4 className="mt-2.5">
          Discover Cars Tailored to Your Lifestyle
        </TypographyH4>
        <div className="mb-[4.2rem] mt-[1.25rem] flex">
          {
            // get an array of 4 elements to draw the dots
            Array.from({ length: 4 }, (_, i) => i).map((index) => (
              <div
                className={`h-2 rounded-full mr-2 ${
                  activeTransportCategory === index
                    ? "w-6 bg-gray-50"
                    : "w-2 bg-gray-300"
                }`}
                key={index}
              ></div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Carousel;
