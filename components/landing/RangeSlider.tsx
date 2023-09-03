import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type RangeSliderProps = {
    min: number,
    max: number,
    step: number,
    id: string,
    label: string,
    onValueChange?: (values: [number, number]) => void;
};

function RangeSlider({
    min,
    max,
    step,
    id,
    label,
    onValueChange
}: RangeSliderProps) {
    const [range, setRange] = useState<[number, number]>([min, max]);
    let displayText = '';
    if (id === "price") {
        displayText = `${range[0]} $ - ${range[1]} $`;
    } else if (id === "milage") {
        displayText = `${range[0]} km - ${range[1]} km`;
    } else if (id === "year") {
        displayText = `${range[0]} - ${range[1]}`;
    }
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
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

            <div>
                {displayText && <div className="mt-2 text-center">{displayText}</div>}
            </div>

        </div>
    );
}

export default RangeSlider;
