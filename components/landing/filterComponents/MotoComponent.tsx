/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";
import SvgIcon from "../../SvgIcon";
import { Card, CardContent, CardFooter } from "../../ui/card";
import RangeSlider from "../RangeSlider";

import { MotoComponentProps } from "../types";

const bodyTypes: string[] = [
  "All",
  "Sedan",
  "SUV",
  "Hatchback",
  "Pickup",
  "Example",
];

const fuelTypes: string[] = [
  "All",
  "Petrol",
  "Gas",
  "Electric",
  "Diesel",
  "Hybrid",
];

export function MotorcycleComponent({
  handleSliderChange,
  filter,
  handleSelectorChange,
}: MotoComponentProps) {
  console.log("MOTO");
  return (
    <Card className="bg-background border-0">
      <CardContent className="space-y-2 mt-8">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mt-4 mb-6">
          <RangeSlider
            value={filter.price}
            fixedLowerText="1000 $"
            fixedUpperText="100000 $"
            filename="banknote.svg"
            id="price"
            min={1000}
            max={100000}
            step={1000}
            label="Price"
            onValueChange={(values) =>
              handleSliderChange("moto", "price", values)
            }
          />
          <RangeSlider
            value={filter.milage}
            fixedLowerText="0 km"
            fixedUpperText="500000 km"
            filename="milage.svg"
            id="milage"
            min={0}
            max={500000}
            step={10000}
            label="Milage"
            onValueChange={(values) =>
              handleSliderChange("moto", "milage", values)
            }
          />
          <RangeSlider
            value={filter.year}
            fixedLowerText="1975"
            fixedUpperText="2023"
            filename="calendar.svg"
            id="year"
            min={1975}
            max={2023}
            step={1}
            label="Year"
            onValueChange={(values) =>
              handleSliderChange("moto", "year", values)
            }
          />
        </div>
        {/* New Selectors */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              {" "}
              {/* Flex container */}
              <Label htmlFor="filter1">Brand</Label>
              <SvgIcon
                filepath="icons/tick.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("moto", "brandAndModel", selectorValue)
              }
            >
              <SelectTrigger>Select brand...</SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Model</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("moto", "vehicleBody", selectorValue)
              }
              value={filter.brandAndModel}
            >
              <SelectTrigger currentValue={filter.vehicleBody}>
                Select body...
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter3">Fuel type</Label>
              <SvgIcon
                filepath="icons/fuel.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("moto", "fuelType", selectorValue)
              }
              value={filter.fuelType}
            >
              <SelectTrigger currentValue={filter.fuelType}>
                Select fuel...
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* New Sliders */}
      </CardContent>
      <CardFooter className="grid place-items-end">
        <Button>
          100000 offers
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
