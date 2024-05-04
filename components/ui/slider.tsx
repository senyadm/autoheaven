"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/src/shared/utils/cn";
type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  onValueChange?: (values: [number, number]) => void;
};
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>((props, ref) => {
  const { min = 0, max = 100, onValueChange, value: propValue } = props;
  const [value, setValue] = React.useState<[number, number]>([min, max]);
  React.useEffect(() => {
    if (propValue?.length === 2) {
      setValue(propValue as [number, number]);
    }
  }, [propValue]);
  return (
    <div>
      <SliderPrimitive.Root
        {...props}
        value={value}
        onValueChange={(values) => {
          if (values.length === 2) {
            setValue(values as [number, number]);
            onValueChange && onValueChange(values as [number, number]);
          }
        }}
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          props.className
        )}
      >
        <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
