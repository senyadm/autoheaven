"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import {
  CarouselContext,
  CarouselProps,
} from "../../../../components/ui/carousel";
import { cn } from "../../../shared/utils/cn";

type CarouselApi = UseEmblaCarouselType[1];

const directionMap = {
  "-1": "forward",
  "1": "backward",
};

const readDirection = (embla: CarouselApi) => {
  return embla?.internalEngine().scrollBody.direction();
};

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        loop: false,
        // watchDrag: (apiFromDrag, another) => {
        //   // const direction = readDirection(apiFromDrag);
        //   // console.log("🚀 ~ direction:", direction);
        //   // const engine = apiFromDrag.internalEngine();
        //   // console.log("watchDrag", engine);
        //   apiFromDrag.scrollNext();
        //   return false;
        // },
        startIndex: 1,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      console.log("🚀 ~ onSelect ~ onSelect:");

      if (!api) {
        return;
      }
      // const currentIndex = api.selectedScrollSnap();
      // const direction = readDirection(api);
      // api.scrollTo(currentIndex + 1, true);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const onPointerUp = React.useCallback((api: CarouselApi, another) => {
      console.log("🚀 ~ onPointerUp ~ onPointerUp:");

      if (!api) {
        return;
      }
      const direction = readDirection(api);
      if (direction === 0) return;
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      api.on("pointerUp", onPointerUp);
      // api.on("settle", handleScroll);
      return () => {
        api?.off("select", onSelect);
        api?.off("pointerUp", onPointerUp);
      };
    }, [api, onPointerUp, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export { Carousel };
