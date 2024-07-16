"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { carsDomain } from "@/src/shared/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchImageFileNames } from "../api/image";

const VehicleImage = ({ id }: { id: number }) => {
  const [imageFileNames, setImageFileNames] = useState<string[]>([]);
  useEffect(() => {
    fetchImageFileNames(id)
      .then((res) => {
        setImageFileNames(res);
      })
      .catch((e) => {
        console.error("Error fetching image file names:");
      });
  }, [id]);
  return (
    <div className="min-w-[152px] min-h-[108px]">
      {imageFileNames &&
        imageFileNames[0] &&
        (imageFileNames.length > 1 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {imageFileNames.map((image, index) => (
                <CarouselItem key={carDetails.id + " image" + index}>
                  <AspectRatio
                    ratio={16 / 9}
                    className=" bg-muted w-[152px] h-[108px]"
                  >
                    <Image
                      alt=""
                      src={`${carsDomain}/api/cars/download/${image}`}
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-0 z-10 bg-gray-100 opacity-50" />
            <CarouselNext className="absolute top-1/2 right-0 z-10 bg-gray-100 opacity-50" />
          </Carousel>
        ) : (
          <AspectRatio ratio={16 / 9} className=" bg-muted w-[152px] h-[108px]">
            <Image
              alt=""
              src={`${carsDomain}/api/cars/download/${imageFileNames[0]}`}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        ))}
    </div>
  );
};

export default VehicleImage;
