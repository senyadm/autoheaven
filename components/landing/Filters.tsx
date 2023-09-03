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
import RangeSlider from "./RangeSlider"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"




function FilterComponent() {
    const carMakes = useSelector((state: RootState) => state.carMakes.carMakes);
    const status = useSelector((state: RootState) => state.carMakes.status);

    const dispatch: AppDispatch = useDispatch();

    const handleFetch = () => {
        dispatch(fetchData());
    }
    const [filters, setFilters] = useState({
        price: [1000, 100000],
        milage: [0, 500000],
        year: [1975, 2023]
    });

    const handleSliderChange = (id: string, values: [number, number]) => {
        setFilters(prev => ({ ...prev, [id]: values }));
    };
    return (
        <div className="min-w-[1140px] w-full">
            <Card>
                <CardHeader>
                    <CardContent>
                        <Tabs defaultValue="cars">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="cars">Passenger Car</TabsTrigger>
                                <TabsTrigger value="moto">Motorcycles</TabsTrigger>
                                <TabsTrigger value="trucks">Trucks</TabsTrigger>
                                <TabsTrigger value="busses">Busses</TabsTrigger>
                            </TabsList>

                            {/* Passenger Car Content */}
                            <TabsContent value="cars">
                                <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle>Passenger Car Filters</CardTitle>
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
                                        <CardTitle>Motorcycle Filters</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {/* Replace with the required controls for the motorcycle tab */}
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Trucks Content */}
                            <TabsContent value="trucks">
                                <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle>Truck Filters</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {/* Replace with the required controls for the trucks tab */}
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Busses Content */}
                            <TabsContent value="busses">
                                <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle>Bus Filters</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {/* Replace with the required controls for the busses tab */}
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
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