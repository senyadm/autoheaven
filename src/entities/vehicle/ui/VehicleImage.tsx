"use client";
import  { ImgHTMLAttributes, useEffect, useState } from "react";

import Image, { ImageProps } from "next/image";
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
import { cn } from "@/src/shared/utils/cn";

type ImageOptions = Partial<ImageProps & ImgHTMLAttributes<HTMLImageElement>>;

interface VehicleImageProps {
  id: number;
  imageOptions?: ImageOptions;
  imageClassName?: string;
}

export const VehicleImage = ({ id, imageOptions, imageClassName }:VehicleImageProps) => {
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
    <OptionalCarousel
      imageFileNames={imageFileNames}
      imageOptions={imageOptions}
      imageClassName={imageClassName}
    />
  );
};


interface OptionalCarouselProps {
  imageFileNames: string[];
  imageOptions?: ImageOptions;
  imageClassName?: string;
}

export  function OptionalCarousel({
  imageFileNames,
  imageOptions,
  imageClassName,
}: OptionalCarouselProps) {
  return (
    imageFileNames &&
    imageFileNames[0] &&
    (imageFileNames.length > 1 ? (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {imageFileNames.map((image, index) => (
            <CarouselItem key={image}>
              <AspectRatio
                ratio={16 / 9}
                className=" bg-muted"
              >
                <Image
                  alt=""
                  src={`${carsDomain}/api/cars/download/${image}`}
                  className={cn("rounded-md object-cover", imageClassName)}
                  {...imageOptions}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-0 z-10 bg-gray-100 opacity-50" />
        <CarouselNext className="absolute top-1/2 right-0 z-10 bg-gray-100 opacity-50" />
      </Carousel>
    ) : (
      <AspectRatio ratio={16 / 9} className=" bg-muted">
        <Image
          alt=""
          src={`${carsDomain}/api/cars/download/${imageFileNames[0]}`}
          {...imageOptions}
          className={cn("rounded-md object-cover", imageClassName)}
        />
      </AspectRatio>
    ))
  );
}
