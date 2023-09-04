"use client";
import { useState } from 'react';
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
import RangeSlider from "./RangeSlider"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { setActiveTransportCategory } from '@/app/GlobalRedux/Features/counter/transportCategorySlice';
const TRUCK_SUBCATEGORIES = [
    { name: 'Truck', component: Truck },
    { name: 'Commercial Vehicle', component: CommercialVehicle },
    { name: 'Truck Transport', component: TruckTransport },
    { name: 'Trailer', component: Trailer },
    { name: 'Semitrailer', component: SemiTrailer },
    { name: 'Tank Transport', component: TankTransport },
];



function FilterComponent() {
    const carMakes = useSelector((state: RootState) => state.carMakes.carMakes);
    const status = useSelector((state: RootState) => state.carMakes.status);
    const [selectedIcon, setSelectedIcon] = useState(-1);
    const [hoveredIcon, setHoveredIcon] = useState(-1);
    const dispatch = useDispatch();
    const handleFetch = () => {
    }
    const [filters, setFilters] = useState({
        price: [1000, 100000],
        milage: [0, 500000],
        year: [1975, 2023]
    });

    const handleSliderChange = (id: string, values: [number, number]) => {
        setFilters(prev => ({ ...prev, [id]: values }));
    };

  const handleTabClick = (value: number) => {
    dispatch(setActiveTransportCategory(value));
  };
    return (
        <div className="max-w-[1140px] w-full mb-36px z-10 mt-[19.8125rem]">
            <Card>
                <CardHeader>
                    <CardContent>
                        <Tabs defaultValue="cars">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger onClick={() => handleTabClick(0)} value="cars"><SvgIcon filepath='icons/Car.svg' alt='' width={16} height={16}/><span style={{ marginLeft: "5px" }}>Passenger Car</span></TabsTrigger>
                                <TabsTrigger onClick={() => handleTabClick(1)} value="moto"><SvgIcon filepath='icons/Bike.svg' alt='' width={16} height={16}/><span style={{ marginLeft: "5px" }}>Motorcycles</span> </TabsTrigger>
                                <TabsTrigger onClick={() => handleTabClick(2)} value="trucks"><SvgIcon filepath='icons/Truck.svg' alt='' width={16} height={16}/><span style={{ marginLeft: "5px" }}>Trucks</span> </TabsTrigger>
                                <TabsTrigger onClick={() => handleTabClick(3)} value="busses"><SvgIcon filepath='icons/CityBus.svg' alt='' width={16} height={16}/> <span style={{ marginLeft: "5px" }}>Busses</span></TabsTrigger>
                            </TabsList>

                            {/* Passenger Car Content */}
                            <TabsContent value="cars">
                                <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle style={{ fontSize: "14px" }}>Passenger Car Filters</CardTitle>
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
                                        <Button>100000 offers</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            {/* Motorcycles Content */}
                            <TabsContent value="moto">
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
                                        <Button>100000 offers</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Trucks Content */}
                            <TabsContent value="trucks">
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
                                                    className={`subcategory-icon w-32 h-11 flex items-center border border-solid rounded-md px-2 py-1.5 mr-6 text-sm transition-transform duration-300 ${selectedIcon === index ? 'your-selected-class' : ''}`}
                                                    style={hoveredIcon === index ? { background: 'linear-gradient(-90deg, #808080 0%, #808080 20%, #FFFFFF 100%)' } : {}}
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
                                                <Label htmlFor="filter1" style={{ fontSize: "14px" }}>Brand or model</Label>
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
                                                <Label htmlFor="filter2" style={{ fontSize: "14px" }}>Body</Label>
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
                                                <Label htmlFor="filter3" style={{ fontSize: "14px" }}>Fuel type</Label>
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
                                        <Button>100000 offers</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Busses Content */}
                            <TabsContent value="busses">
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
                                        <Button>100000 offers</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}

export default FilterComponent;