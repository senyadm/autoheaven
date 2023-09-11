import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import SvgIcon from "@/components/SvgIcon"
type RangeSliderProps = {
    min: number,
    max: number,
    step: number,
    id: string,
    label: string,
    filename: string,
    onValueChange?: (values: [number, number]) => void;
};

function RangeSlider({
    min,
    max,
    step,
    id,
    label,
    filename,
    onValueChange
}: RangeSliderProps) {
    const [range, setRange] = useState<[number, number]>([min, max]);
    let lowerText = '';
    let upperText = '';
    
    if (id === "price") {
        lowerText = `${range[0]} $`;
        upperText = `${range[1]} $`;
    } else if (id === "milage") {
        lowerText = `${range[0]} km`;
        upperText = `${range[1]} km`;
    } else if (id === "year") {
        lowerText = `${range[0]}`;
        upperText = `${range[1]}`;
    }
    
    return (
        <div>
                    <div className="flex items-center space-x-2">
                    <Label htmlFor={id}>{label}</Label>
            <SvgIcon filepath={`icons/${filename}`} alt='' width={16} height={16}/>
        </div>
     
            <div style = {{height: "10px"}}></div>
            <Slider
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
                <div style={{ fontSize: "14px" }}>{lowerText}</div>
                <div style={{ fontSize: "14px" }}>{upperText}</div>
            </div>
        </div>
    );
}

export default RangeSlider;
