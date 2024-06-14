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
// const styles = {
//   container: {
//     position: "relative",
//     height: "100%",
//     width: "100%",
//     touchAction: "none",
//   },
//   item: { position: "absolute", height: "100%", willChange: "transform" },
// };

// /**
//  * Calculates a spring-physics driven infinite slider
//  *
//  * @param {Array} items - display items
//  * @param {Function} children - render child
//  * @param {number} width - fixed item with
//  * @param {number} visible - number of items that muste be visible on screen
//  */
// export function Slider({ items, width = 600, visible = 4, style, children }) {
//   const idx = useCallback(
//     (x, l = items.length) => (x < 0 ? x + l : x) % l,
//     [items]
//   );
//   const getPos = useCallback(
//     (i, firstVis, firstVisIdx) => idx(i - firstVis + firstVisIdx),
//     [idx]
//   );
//   const [springs, api] = useSprings(items.length, (i) => ({
//     x: (i < items.length - 1 ? i : -1) * width,
//   }));
//   console.log("🚀 ~ const[springs,api]=useSprings ~ springs:", springs);

//   const prev = useRef([0, 1]);
//   const target = useRef();

//   const runSprings = useCallback(
//     (y, dy) => {
//       const firstVis = idx(Math.floor(y / width) % items.length);
//       const firstVisIdx = dy < 0 ? items.length - visible - 1 : 1;
//       api.start((i) => {
//         const position = getPos(i, firstVis, firstVisIdx);
//         const prevPosition = getPos(i, prev.current[0], prev.current[1]);
//         const rank =
//           firstVis - (y < 0 ? items.length : 0) + position - firstVisIdx;
//         const configPos = dy > 0 ? position : items.length - position;
//         return {
//           x: (-y % (width * items.length)) + width * rank,
//           immediate: dy < 0 ? prevPosition > position : prevPosition < position,
//           config: {
//             tension: (1 + items.length - configPos) * 100,
//             friction: 30 + configPos * 40,
//           },
//         };
//       });
//       prev.current = [firstVis, firstVisIdx];
//     },
//     [idx, getPos, width, visible, api, items.length]
//   );

//   const wheelOffset = useRef(0);
//   const dragOffset = useRef(0);

//   useGesture(
//     {
//       onDrag: ({ event, offset: [x], direction: [dx], swipe, tap }) => {
//         console.log("🚀 ~ Slider ~ tap:", tap);
//         console.log("🚀 ~ Slider ~ swipe:", swipe);
//         console.log("🚀 ~ Slider ~ direction:", dx);
//         event.preventDefault();
//         if (dx) {
//           dragOffset.current = -x;
//           runSprings(wheelOffset.current + -x, -dx);
//         }
//       },
//       onWheel: ({ event, offset: [, y], direction: [, dy] }) => {
//         event.preventDefault();
//         if (dy) {
//           wheelOffset.current = y;
//           runSprings(dragOffset.current + y, dy);
//         }
//       },
//     },
//     { target, wheel: { eventOptions: { passive: false } } }
//   );

//   return (
//     <div ref={target} style={{ ...style, ...styles.container }}>
//       {springs.map(({ x }, i) => (
//         <a.div
//           key={i}
//           style={{ ...styles.item, width, x }}
//           children={children(items[i], i)}
//         />
//       ))}
//     </div>
//   );
// }
// const items = Array.from({ length: 5 }).map((_, index) => index + 1);

export function Slider({ carResults, vehicleUIData }) {
  const items = carResults;
  const [firstCardVisible, setFirstCardVisible] = React.useState(true);
  const [firstCardItem, setFirstCardItem] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  console.log("🚀 ~ Slider ~ currentIndex:", currentIndex);
  const [springs, api] = useSprings(
    2,
    () => ({
      from: {
        opacity: 1,
        x: 0,
      },
      to: { opacity: 0 },
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
    console.log("🚀 ~ bind ~ args:", args);
    const [dx] = swipe;
    if (dx) {
      console.log("🚀 ~ bind ~ swipe", dx);
      api.start((i) => {
        if (index !== i) return;
        setCurrentIndex(currentIndex + 1);
        return {
          opacity: 0,
          x: 100 * dx,
          onRest: () => {
            if (index !== i) return;

            console.log("🚀 ~ api.start ~ i:", i);
            api.start((i) => {
              // if (index !== i) return;

              return {
                opacity: 1,
                x: 0,
              };
            });
          },
        };
      });
    }
  });

  return (
    <div className="relative w-full grow flex justify-center align-center text-primary">
      <Dialog defaultOpen>
        <DialogContent className="p-2">
          <DialogHeader>
            <DialogTitle>List Heaven Tutorial</DialogTitle>
            <DialogDescription className="flex flex-col">
              <p>Swipe left to like an offer</p>
              <p>Swipe right to see the next offer</p>
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
      {currentIndex < items.length && (
        <animated.div
          {...bind(0)}
          style={springs[0]}
          className={`${
            currentIndex % 2 ? "z-10" : ""
          } absolute w-full h-full  touch-none`}
        >
          <SliderCarCard
            carDetails={items[currentIndex]}
            types={vehicleUIData.types}
          ></SliderCarCard>
        </animated.div>
      )}
      {currentIndex < items.length - 1 && (
        <animated.div
          className="absolute w-full h-full  touch-none"
          {...bind(1)}
          style={springs[1]}
        >
          <SliderCarCard
            carDetails={items[currentIndex + 1]}
            types={vehicleUIData.types}
          ></SliderCarCard>
        </animated.div>
      )}
      <SliderCard
        className={
          "text-primary bg-primary-foreground flex items-center justify-center"
        }
      >
        <p className="text-lg font-bold">No more offers found</p>
      </SliderCard>
    </div>
  );
}
