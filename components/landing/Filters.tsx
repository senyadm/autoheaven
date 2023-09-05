"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '@/app/GlobalRedux/slice';
import { RootState } from '@/app/GlobalRedux/store';
import { AppDispatch } from '@/app/GlobalRedux/store';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Truck } from '@/icons/truck';
import { CommercialVehicle } from '@/icons/commercial-vehicle';
import { TruckTransport } from '@/icons/truck-transport';
import { Trailer } from '@/icons/trailer';
import { SemiTrailer } from '@/icons/semi-trailer';
import { TankTransport } from '@/icons/tank-transport';
import SvgIcon from "../SvgIcon"
import { Busses } from '@/icons/busses';
import { Trucks } from '@/icons/trucks';
import { Cars } from '@/icons/car';
import { Moto } from '@/icons/moto';
import { ChevronRight, Siren } from "lucide-react"
import RangeSlider from "./RangeSlider"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
const TRUCK_SUBCATEGORIES = [
    { name: 'Truck', component: Truck },
    { name: 'Commercial Vehicle', component: CommercialVehicle },
    { name: 'Truck Transport', component: TruckTransport },
    { name: 'Trailer', component: Trailer },
    { name: 'Semitrailer', component: SemiTrailer },
    { name: 'Tank Transport', component: TankTransport },
];

type CarComponentProps = {
    handleSliderChange: (type: string, values: [number, number]) => void;
};


export function CarComponent({ handleSliderChange }: CarComponentProps) { 
return (
    <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle style={{ fontSize: "14px" }}>Passenger Car Filters</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="filter1">Brand or model</Label>
                                                <Select >
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor="filter2">Body</Label>
                                                <Select>
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor="filter3">Fuel type</Label>
                                                <Select >
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            <RangeSlider id="price" min={1000} max={100000} step={1000} label="Price range" onValueChange={(values) => handleSliderChange("price", values)} />
                                            <RangeSlider id="milage" min={0} max={500000} step={10000} label="Milage" onValueChange={(values) => handleSliderChange("milage", values)} />
                                            <RangeSlider id="year" min={1975} max={2023} step={1} label="Year" onValueChange={(values) => handleSliderChange("year", values)} />
                                        </div>

                                    </CardContent>
                                    <CardFooter className="grid place-items-end">
                                        <Button>100000 offers<ChevronRight /></Button>
                                    </CardFooter>
                                </Card>
)
}
type MotoComponentProps = {
    handleSliderChange: (type: string, values: [number, number]) => void;
};
export function MotorcycleComponent({handleSliderChange} :MotoComponentProps ) { 
                          return (
                            <Card className="border-0">
                            <CardHeader>
                                <CardTitle style={{ fontSize: "14px" }}>Motorcycle Filters</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {/* ... (rest of the input components) */}

                                {/* New Selectors */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="filter1">Brand or model</Label>
                                        <Select >
                                            <SelectTrigger>Select an option</SelectTrigger>
                                            <SelectContent>
                                                {/* Add your SelectItems here */}
                                                <SelectItem value="option1">Option 1</SelectItem>
                                                <SelectItem value="option2">Option 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="filter2">Body</Label>
                                        <Select>
                                            <SelectTrigger>Select an option</SelectTrigger>
                                            <SelectContent>
                                                {/* Add your SelectItems here */}
                                                <SelectItem value="option1">Option 1</SelectItem>
                                                <SelectItem value="option2">Option 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="filter3">Fuel type</Label>
                                        <Select >
                                            <SelectTrigger>Select an option</SelectTrigger>
                                            <SelectContent>
                                                {/* Add your SelectItems here */}
                                                <SelectItem value="option1">Option 1</SelectItem>
                                                <SelectItem value="option2">Option 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* New Sliders */}
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <RangeSlider id="price" min={1000} max={100000} step={1000} label="Price range" onValueChange={(values) => handleSliderChange("price", values)} />
                                    <RangeSlider id="milage" min={0} max={500000} step={10000} label="Milage" onValueChange={(values) => handleSliderChange("milage", values)} />
                                    <RangeSlider id="year" min={1975} max={2023} step={1} label="Year" onValueChange={(values) => handleSliderChange("year", values)} />
                                </div>

                            </CardContent>
                            <CardFooter className="grid place-items-end">
                                <Button>100000 offers<ChevronRight /></Button>
                            </CardFooter>
                        </Card>
                          )
}

type TrucksComponentProps = {
    handleSliderChange: (type: string, values: [number, number]) => void;
    setSelectedIcon: React.Dispatch<React.SetStateAction<number>>;
    setHoveredIcon: React.Dispatch<React.SetStateAction<number>>;
    selectedIcon: number;
    hoveredIcon: number;
};

export function TrucksComponent({    handleSliderChange,
    setSelectedIcon,
    setHoveredIcon,
    selectedIcon,
    hoveredIcon} :TrucksComponentProps) { 
    return (
        <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle className="text-sm">Truck Filters</CardTitle>

                                        <div className="flex items-center">
                                            {TRUCK_SUBCATEGORIES.map((subcategory, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedIcon(index)}
                                                    onMouseEnter={() => setHoveredIcon(index)}
                                                    onMouseLeave={() => setHoveredIcon(-1)}
                                                    className={`subcategory-icon w-32 h-11 flex items-center rounded-md px-2 py-1.5 mr-6 text-sm transition-transform duration-300 
        ${selectedIcon === index ? 'border-2 border-gray-600' : 'border border-gray-300'} 
        ${hoveredIcon === index ? 'bg-gray-300' : 'bg-white'}
    `}
                                                >
                                                    <subcategory.component className="w-8 h-8 mr-4" />
                                                    <span className="ml-1.5">{subcategory.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="filter1" style={{ fontSize: "16px" }}>Brand or model</Label>
                                                <Select >
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>
                                                        {/* Add your SelectItems here */}
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor="filter2" style={{ fontSize: "16px" }}>Body</Label>
                                                <Select>
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>
                                                        {/* Add your SelectItems here */}
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor="filter3" style={{ fontSize: "16px" }}>Fuel type</Label>
                                                <Select >
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>
                                                        {/* Add your SelectItems here */}
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* New Sliders */}
                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            <RangeSlider id="price" min={1000} max={100000} step={1000} label="Price range" onValueChange={(values) => handleSliderChange("price", values)} />
                                            <RangeSlider id="milage" min={0} max={500000} step={10000} label="Milage" onValueChange={(values) => handleSliderChange("milage", values)} />
                                            <RangeSlider id="year" min={1975} max={2023} step={1} label="Year" onValueChange={(values) => handleSliderChange("year", values)} />
                                        </div>

                                    </CardContent>
                                    <CardFooter className="grid place-items-end">
                                        <Button>100000 offers<ChevronRight /></Button>
                                    </CardFooter>
                                </Card>
    )
}

type BusComponentProps = {
    handleSliderChange: (type: string, values: [number, number]) => void;
};

export function BusComponent({handleSliderChange} :BusComponentProps ) { 
return (
    <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle style={{ fontSize: "14px" }}>Bus Filters</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {/* ... (rest of the input components) */}

                                        {/* New Selectors */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="filter1">Brand or model</Label>
                                                <Select >
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>
                                                        {/* Add your SelectItems here */}
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor="filter2">Body</Label>
                                                <Select>
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>
                                                        {/* Add your SelectItems here */}
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor="filter3">Fuel type</Label>
                                                <Select >
                                                    <SelectTrigger>Select an option</SelectTrigger>
                                                    <SelectContent>

                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>


                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            <RangeSlider id="price" min={1000} max={100000} step={1000} label="Price range" onValueChange={(values) => handleSliderChange("price", values)} />
                                            <RangeSlider id="milage" min={0} max={500000} step={10000} label="Milage" onValueChange={(values) => handleSliderChange("milage", values)} />
                                            <RangeSlider id="year" min={1975} max={2023} step={1} label="Year" onValueChange={(values) => handleSliderChange("year", values)} />
                                        </div>

                                    </CardContent>
                                    <CardFooter className="grid place-items-end">
                                        <Button>100000 offers<ChevronRight /></Button>
                                    </CardFooter>
                                </Card>
)
}


function FilterComponent({ className }: any) {
    const carMakes = useSelector((state: RootState) => state.carMakes.carMakes);
    const status = useSelector((state: RootState) => state.carMakes.status);
    const [selectedIcon, setSelectedIcon] = useState(-1);
    const [hoveredIcon, setHoveredIcon] = useState(-1);
    const dispatch: AppDispatch = useDispatch();
    const [filters, setFilters] = useState({
        price: [1000, 100000],
        milage: [0, 500000],
        year: [1975, 2023]
    });
    useEffect(() => {
        console.log(selectedIcon)
    }, [selectedIcon])
    const handleSliderChange = (id: string, values: [number, number]) => {
        setFilters(prev => ({ ...prev, [id]: values }));
    };
    return (
        <div className={`max-w-[1140px] w-full mb-36px ${className}`}>
            <Card>
                <CardHeader>
                    <CardContent>
                        <Tabs defaultValue="cars">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="cars"><SvgIcon filepath='icons/Car.svg' alt='' width={16} height={16}/><span style={{ marginLeft: "5px" }}>Passenger Car</span></TabsTrigger>
                                <TabsTrigger value="moto"><SvgIcon filepath='icons/Bike.svg' alt='' width={16} height={16}/><span style={{ marginLeft: "5px" }}>Motorcycles</span> </TabsTrigger>
                                <TabsTrigger value="trucks"><SvgIcon filepath='icons/Truck.svg' alt='' width={16} height={16}/><span style={{ marginLeft: "5px" }}>Trucks</span> </TabsTrigger>
                                <TabsTrigger value="busses"><SvgIcon filepath='icons/CityBus.svg' alt='' width={16} height={16}/> <span style={{ marginLeft: "5px" }}>Busses</span></TabsTrigger>
                            </TabsList>
                            <TabsContent value="cars">
                                <CarComponent handleSliderChange={handleSliderChange}/>
                            </TabsContent>
                            <TabsContent value="moto">
                                <MotorcycleComponent handleSliderChange={handleSliderChange}/>
                            </TabsContent>
                            <TabsContent value="trucks">
                                <TrucksComponent    handleSliderChange={handleSliderChange}
        setSelectedIcon={setSelectedIcon}
        setHoveredIcon={setHoveredIcon}
        selectedIcon={selectedIcon}
        hoveredIcon={hoveredIcon}/>
                            </TabsContent>

                          
                            <TabsContent value="busses">
                                <BusComponent handleSliderChange={handleSliderChange}/>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}

export default FilterComponent;