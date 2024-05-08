import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import SvgIcon from "@/components/SvgIcon";
import { Input } from "../ui/input";
type RangeSliderProps = {
  value?: [number, number];
  min: number;
  max: number;
  step: number;
  id: string;
  label: string;
  filename: string;
  fixedLowerText?: string;
  fixedUpperText?: string;
  onValueChange?: (values: [number, number]) => void;
};
type tempRange = {
  Range: [number, number];
};

interface RangeSliderRef {
  reset: () => void;
}

const RangeSlider = forwardRef<RangeSliderRef, RangeSliderProps>(
  (
    {
      value,
      min,
      max,
      step,
      id,
      label,
      filename,
      fixedLowerText,
      fixedUpperText,
      onValueChange,
    },
    ref
  ) => {
    const [range, setRange] = useState<[number, number]>([min, max]),
      [errorInput, setErrorInput] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setRange([min, max]);
        setErrorInput(false);
        onValueChange && onValueChange([min, max]);
      },
    }));

    const getSymbol = () => {
      if (id === "price") {
        return "$";
      } else if (id === "milage") {
        return "km";
      }
      return "";
    };
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const temp: [number, number] = [range[0], range[1]];
      const inputValue = e.target.value;
      const isNumber = /^\d+$/.test(inputValue);
      if (isNumber) {
        if (Number(inputValue) < min || Number(inputValue) > max) {
          setErrorInput(true);
          return;
        }

        temp[index] = Number(inputValue);
        setRange(temp);
        onValueChange && onValueChange(temp);
      } else {
        setErrorInput(true);
      }
    };
    return (
      <div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={id}>{label}</Label>
          <SvgIcon
            filepath={`/icons/${filename}`}
            alt=""
            width={16}
            height={16}
          />
          <Input
            className="text-sm h-6 w-20 px-2"
            value={(value && value[0]) || range[0]}
            onChange={(e) => handleChange(e, 0)}
          />{" "}
          -
          <Input
            value={(value && value[1]) || range[1]}
            className="text-sm h-6 w-20 px-2"
            onChange={(e) => handleChange(e, 1)}
          />
          <span>{getSymbol()}</span>
        </div>

        <div style={{ height: "10px" }}></div>

        <Slider
          value={value}
          id={id}
          min={min}
          max={max}
          step={step}
          onValueChange={(values: [number, number]) => {
            setRange(values);
            onValueChange && onValueChange(values);
          }}
        />

        <div className="flex justify-between mt-2">
          <div style={{ fontSize: "14px" }}>{fixedLowerText || min}</div>
          <div style={{ fontSize: "14px" }}>{fixedUpperText || max}</div>
        </div>
      </div>
    );
  }
);

export type { RangeSliderRef };

RangeSlider.displayName = "RangeSlider";
export default RangeSlider;
