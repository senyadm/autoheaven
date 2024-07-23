import React, { useRef, useCallback } from "react";
import { useDrag, useGesture } from "@use-gesture/react";
import { useSprings, a, useSpring, animated } from "@react-spring/web";
import SliderCarCard, { SliderCard } from "./CarCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { config } from "@react-spring/web";
import { addToWishlist, addToWishlistThunk } from "../../../entities/user";
import { useAppDispatch } from "../../../../app/GlobalRedux/store";
function calcZ(index, currentIndex, itemsCount) {
  return itemsCount - Math.ceil((currentIndex - index) / 3) * 3 - index;
}
function calcItemIndex(index, currentIndex) {
  const res = 3 * Math.ceil((currentIndex - index) / 3) + index;
  return res;
}

const CARDS_RENDERED = 4;

export function Slider({ carResults, vehicleUIData }) {
  const items = carResults;
  const itemsCount = items.length;
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const startSwipeAnimation = (swipeDirection: 1 | -1) => {
    const springIndex = currentIndex % 3;
    api.start((i) => {
      if (springIndex !== i) return;
      setCurrentIndex(currentIndex + 1);
      if (swipeDirection === 1) {
    
        dispatch(addToWishlistThunk(items[currentIndex].id));
      }
      return {
        opacity: 0.05,
        x: 200 * swipeDirection,
        onRest: () => {
          if (springIndex !== i) return;

          api.start((j) => {
            if (springIndex !== j) return;

            return {
              immediate: true,
              skipAnimation: true,
              opacity: 1,
              x: 0,
              // zIndex: itemsCount - currentIndex - 3,
            };
          });
        },
      };
    });
  };
  const handleSwipe = (swipeDirection: 1 | -1) => {
    if (swipeDirection === 1) {
      likeOffer();
    } else {
      dislikeOffer();
    }
  };
  const likeOffer = () => {
    startSwipeAnimation(1);
    // addToWishlist()
  };
  const dislikeOffer = () => {
    startSwipeAnimation(-1);
  };
  const [springs, api] = useSprings(
    3,
    () => ({
      from: {
        x: 0,
      },
      config: config.gentle,
    }),
    []
  );

  const bind = useDrag((state) => {
    const {
      swipe, // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
      tap,
      args, // is the drag assimilated to a tap
    } = state;
    const index = args[0];
    const [dx] = swipe;
    if (dx) {
      handleSwipe(dx as 1 | -1);
    }
  });

  return (
    <div className="relative w-full h-full grow flex justify-center align-center text-primary">
      <Dialog defaultOpen>
        <DialogContent className="p-2">
          <DialogHeader>
            <DialogTitle>List Heaven Tutorial</DialogTitle>
            <DialogDescription className="flex flex-col">
              Swipe right to like an offer. Swipe left to see the next offer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {[0, 1, 2].map((cardNumber) => {
        const itemIndex = calcItemIndex(cardNumber, currentIndex);
        const itemsLeft = itemsCount > itemIndex;
        return (
          <div
            key={"card " + cardNumber}
            style={{ zIndex: calcZ(cardNumber, currentIndex, itemsCount) }}
            className="absolute w-full h-full "
          >
            {itemsLeft && (
              <animated.div
                {...bind(cardNumber)}
                style={{
                  ...springs[cardNumber],
                }}
                className={` w-full h-full touch-none`}
              >
                <SliderCarCard
                  carDetails={items[itemIndex]}
                  types={vehicleUIData.types}
                  buttonCallbacks={{ likeOffer, dislikeOffer }}
                ></SliderCarCard>
              </animated.div>
            )}
          </div>
        );
      })}

      <SliderCard
        className={
          "text-primary h-full bg-primary-foreground flex items-center justify-center"
        }
      >
        <p className="text-lg font-bold">No more offers found</p>
      </SliderCard>
    </div>
  );
}
