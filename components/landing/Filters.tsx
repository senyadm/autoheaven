/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIcon from "../SvgIcon";
import { Card, CardContent, CardHeader } from "../ui/card";

import { setActiveTransportCategory } from "@/app/GlobalRedux/Features/transportCategorySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";

import {
  Filter,
  FilterBusses,
  FilterMoto,
  FilterStates,
  TabKeys,
  busType,
  motoMake,
  motoType,
  tabsTriggersInfo,
} from "./types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusComponent } from "./filterComponents/BusComponent";
import { CarComponent } from "./filterComponents/CarComponent";
import { MotorcycleComponent } from "./filterComponents/MotoComponent";
import { TrucksComponent } from "./filterComponents/TrucksComponent";
import { clientCars } from "@/src/shared/api/client";
import { capitalizeFirstLetter } from "../../src/shared/utils/text";
import { getLocationText } from "../../src/entities/location";

const filterDefault: Filter = {
  type: "cars",
  price: [1000, 1000000],
  milage: [0, 500000],
  year: [1975, 2023],
  brandAndModel: "",
  vehicleBody: "",
  fuelType: "",
};

const filterDefaultMoto: FilterMoto = {
  price: [1000, 1000000],
  milage: [0, 500000],
  year: [1975, 2023],
  model: "",
  brand: "",
  type: "motos",
  vehicleBody: "",
  fuelType: "",
};

const filterDefaultBus: FilterBusses = {
  price: [1000, 1000000],
  milage: [0, 500000],
  year: [1975, 2023],
  model: "",
  brand: "",
  type: "busses",
  vehicleBody: "",
  fuelType: "",
};

function FilterComponent({ className, dict, lang, location }: any) {
  const carMakes = useSelector((state: RootState) => state.carMakes.carMakes);
  const status = useSelector((state: RootState) => state.carMakes.status);
  const [selectedIcon, setSelectedIcon] = useState(-1);
  const [hoveredIcon, setHoveredIcon] = useState(-1);
  const [offers, setOffers] = useState<number>(0);
  const [busList, setBusList] = useState<motoMake[]>([]);
  const [truckList, setTruckList] = useState<motoMake[]>([]);
  const [busTypes, setBusTypes] = useState<busType[]>([]);
  const [motoList, setMotoList] = useState<motoMake[]>([]);
  const [motoTypes, setMotoTypes] = useState<motoType[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const initialFilterStates: FilterStates = {
    cars: filterDefault,
    motos: filterDefaultMoto,
    trucks: filterDefaultBus,
    busses: filterDefaultBus,
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

  // useEffect(() => {
  //   console.log(filters.motos)
  // }, [filters])

  useEffect(() => {
    const fetchTruckList = async () => {
      try {
        const res = await clientCars.get("/api/truck_makes");
        const truckList = res.data;
        setTruckList(truckList);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBusList = async () => {
      try {
        const res = await clientCars.get("/api/bus_makes");
        const busList = res.data;
        setBusList(busList);
      } catch (error) {
        console.error(error);
      }
    };

    const getBusTypes = async () => {
      try {
        const res = await clientCars.get("/api/bus_types");
        const busTypes = res.data;
        setBusTypes(busTypes);
      } catch (error) {
        console.error(error);
      }
    };

    const getMotoTypes = async () => {
      try {
        const res = await clientCars.get("/api/moto_types");
        const motoTypes = res.data;
        setMotoTypes(motoTypes);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMotoList = async () => {
      try {
        const res = await clientCars.get("/api/moto_makes");

        const sortedList = (res.data as motoMake[]).sort((a, b) =>
          a["make_name"].localeCompare(b["make_name"])
        );

        setMotoList(sortedList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTruckList();

    fetchBusList();
    getBusTypes();

    fetchMotoList();
    getMotoTypes();
  }, []);

  return (
    <div className={`md:max-w-[1140px] w-full mb-9 md:mb-36px ${className}`}>
      <Card className="bg-background">
        <CardHeader className="md:pb-0 text-md">
          <h2>
            Find vehicles in {getLocationText(location.country, location.city)}
          </h2>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cars">
            <TabsList className="grid w-full grid-cols-4 gap-4">
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
                motoList={motoList}
                motoTypes={motoTypes}
                filter={filters.motos}
                lang={lang}
                dict={dict}
                handleSliderChange={handleSliderChange}
                handleSelectorChange={handleSelectorChange}
              />
            </TabsContent>
            <TabsContent value="trucks">
              <TrucksComponent
                lang={lang}
                dict={dict}
                busList={truckList}
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
                busList={busList}
                lang={lang}
                dict={dict}
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
      </Card>
    </div>
  );
}

export default FilterComponent;
