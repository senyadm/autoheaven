/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIcon from "../SvgIcon";
import { Card, CardContent, CardHeader } from "../ui/card";

import { setActiveTransportCategory } from "@/app/GlobalRedux/Features/transportCategorySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";

import { Filter, FilterStates, TabKeys, tabsTriggersInfo } from "./types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusComponent } from "./filterComponents/BusComponent";
import { CarComponent } from "./filterComponents/CarComponent";
import { MotorcycleComponent } from "./filterComponents/MotoComponent";
import { TrucksComponent } from "./filterComponents/TrucksComponent";

const filterDefault: Filter = {
  price: [1000, 1000000],
  milage: [0, 500000],
  year: [1975, 2023],
  brandAndModel: "",
  vehicleBody: "",
  fuelType: "",
};

function FilterComponent({ className, dict, lang }: any) {
  const carMakes = useSelector((state: RootState) => state.carMakes.carMakes);
  const status = useSelector((state: RootState) => state.carMakes.status);
  const [selectedIcon, setSelectedIcon] = useState(-1);
  const [hoveredIcon, setHoveredIcon] = useState(-1);
  const [offers, setOffers] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const initialFilterStates: FilterStates = {
    cars: filterDefault,
    moto: filterDefault,
    trucks: filterDefault,
    busses: filterDefault,
  };
  const [filters, setFilters] = useState<FilterStates>(initialFilterStates);
  const handleOfferNumbers = (offerNumber: number) => {
    setOffers(offerNumber);
  };
  const handleSliderChange = (
    tab: TabKeys,
    id: string,
    values: [number, number]
  ) => {
    setFilters((prev) => ({ ...prev, [tab]: { ...prev[tab], [id]: values } }));
  };

  const handleSelectorChange = (
    tab: TabKeys,
    id: string,
    selectorValue: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [id]: selectorValue },
    }));
  };

  return (
    <div className={`max-w-[1140px] w-full mb-36px ${className}`}>
      <Card className="bg-background">
        <CardHeader>
          <CardContent>
            <Tabs defaultValue="cars">
              <TabsList className="grid w-full grid-cols-4">
                {tabsTriggersInfo.map((tab, index) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => dispatch(setActiveTransportCategory(index))}
                  >
                    <SvgIcon
                      filepath={tab.icon}
                      alt={tab.label}
                      color="#2563EB"
                      width={16}
                      height={16}
                    />
                    <span className="ml-2 hidden md:block">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="cars">
                <CarComponent
                  lang={lang}
                  dict={dict}
                  handleOfferNumbers={handleOfferNumbers}
                  filter={filters.cars}
                  handleSliderChange={handleSliderChange}
                  handleSelectorChange={handleSelectorChange}
                />
              </TabsContent>
              <TabsContent value="moto">
                <MotorcycleComponent
                  filter={filters.moto}
                  handleSliderChange={handleSliderChange}
                  handleSelectorChange={handleSelectorChange}
                />
              </TabsContent>
              <TabsContent value="trucks">
                <TrucksComponent
                  filter={filters.trucks}
                  handleSliderChange={handleSliderChange}
                  handleSelectorChange={handleSelectorChange}
                  setSelectedIcon={setSelectedIcon}
                  setHoveredIcon={setHoveredIcon}
                  selectedIcon={selectedIcon}
                  hoveredIcon={hoveredIcon}
                />
              </TabsContent>

              <TabsContent value="busses">
                <BusComponent
                  filter={filters.busses}
                  handleSliderChange={handleSliderChange}
                  handleSelectorChange={handleSelectorChange}
                  setSelectedIcon={setSelectedIcon}
                  setHoveredIcon={setHoveredIcon}
                  selectedIcon={selectedIcon}
                  hoveredIcon={hoveredIcon}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

export default FilterComponent;
