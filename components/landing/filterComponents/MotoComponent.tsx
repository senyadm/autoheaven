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
import { ChevronRight, RotateCcw } from "lucide-react";
import SvgIcon from "../../SvgIcon";
import { Card, CardContent, CardFooter } from "../../ui/card";
import RangeSlider, { RangeSliderRef } from "../RangeSlider";

import { MotoComponentProps } from "../types";
import { createRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/input-field";
import { FilterPayload } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { clientCars } from "@/src/shared/api/client";
import { VehicleType } from "../../../src/shared/model/params";

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
  lang = "en",
  dict,
  motoTypes = [],
  motoList = [],
  handleSelectorChange,
}: MotoComponentProps) {
  const [offers, setOffers] = useState<number>(0);
  const [payloadFilters, setPayloadFilters] = useState<string>("");

  const router = useRouter();

  const sliderRefs = useRef([
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
  ]);

  const handleReset = () => {
    handleSliderChange("motos", "price", [1000, 1000000]);
    handleSliderChange("motos", "milage", [0, 500000]);
    handleSliderChange("motos", "year", [1975, 2023]);
    handleSelectorChange("motos", "brand", "");
    handleSelectorChange("motos", "model", "");
    handleSelectorChange("motos", "type_id", "");
    sliderRefs.current.forEach((ref) => {
      ref.current?.reset();
    });
  };

  const handleNavigate = (e: any) => {
    e.preventDefault();
    console.log(payloadFilters);
    router.push(`${lang}/cars?${payloadFilters}`);
  };

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;

    const sendRequest = () => {
      console.log(filter.model, filter.brand, filter.type_id);

      const payloadFilter = {
        max_results: 100000,
        body_type: filter.vehicleBody || "",
        make: filter.brand || "",
        model: filter.model || "",
        type: VehicleType.Moto,
        type_id: filter.type_id || "",
        price_min: 0,
        price_max: filter.price[1] || 1000000,
        mileage_min: filter.milage[0] || 0,
        mileage_max: filter.milage[1] || 500000,
        min_year: filter.year[0] || 1975,
        max_year: filter.year[1] || 2023,
      };

      const queryParam = Object.keys(payloadFilter)
        .map(
          (key) =>
            `${key}=${encodeURIComponent((payloadFilter as any)[key] || "")}`
        )
        .join("&");

      setPayloadFilters(queryParam);
      fetchMotoList(payloadFilter).then((data) => {
        let len = Object.keys(data).length;

        if (!data["0"].length) len = 0;

        setOffers(len);
      });
    };

    if (filter) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(sendRequest, 1000);
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [filter]);

  const fetchMotoList = async (filters: FilterPayload) => {
    try {
      if (Object.keys(filters).length === 0) return {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          delete filters[key as keyof typeof filters];
        }
      });
      const response = await clientCars.get(`/api/motos/fetch`, {
        params: filters,
        timeout: 20000,
      });
      return response.data;
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Card className="bg-background border-0">
      <CardContent className="space-y-2 mt-8">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mt-4 mb-6">
          <RangeSlider
            ref={sliderRefs.current[0]}
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
              handleSliderChange("motos", "price", values)
            }
          />
          <RangeSlider
            ref={sliderRefs.current[1]}
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
              handleSliderChange("motos", "milage", values)
            }
          />
          <RangeSlider
            ref={sliderRefs.current[2]}
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
              handleSliderChange("motos", "year", values)
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
                handleSelectorChange("motos", "brand", selectorValue)
              }
              value={
                motoList.find((item) => item.id === filter.brand)?.make_name
              }
            >
              <SelectTrigger
                currentValue={
                  motoList.find((item) => item.id === filter.brand)?.make_name
                }
              >
                Select brand...
              </SelectTrigger>
              <SelectContent className="scrollbar-thin">
                {motoList.map((item, index) => (
                  <SelectItem key={index} value={item.id}>
                    {item.make_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Type</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("motos", "type_id", selectorValue)
              }
              value={filter.type_id}
            >
              <SelectTrigger
                currentValue={
                  motoTypes.find((m) => m.id === filter.type_id)?.moto_type
                }
              >
                Select type...
              </SelectTrigger>
              <SelectContent>
                {motoTypes.map((item, index) => (
                  <SelectItem key={index} value={item.id}>
                    {item.moto_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter3">Moto Model</Label>
              <SvgIcon
                filepath="icons/fuel.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <InputField
              value={filter.model}
              onChange={(e) =>
                handleSelectorChange("motos", "model", e.target.value)
              }
              className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md text-muted-foreground w-[150px] w-full"
              placeholder="Search model..."
              style={{
                borderColor: "transparent",
                outline: "none",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            />
          </div>
        </div>

        {/* New Sliders */}
      </CardContent>
      <CardFooter className="grid place-items-end">
        <div className="flex flex-row space-x-2">
          <Button variant="secondary" onClick={handleReset}>
            <span className="me-2">{dict?.reset || "Reset"}</span>
            <RotateCcw size={24} />
          </Button>
          <Button onClick={handleNavigate}>
            {offers || 0} {dict?.offers || "offers"}
            <ChevronRight />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
