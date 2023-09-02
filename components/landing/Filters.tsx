"use client";
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
                                                <Label htmlFor="filter1">Filter 1</Label>
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
                                                <Label htmlFor="filter2">Filter 2</Label>
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
                                                <Label htmlFor="filter3">Filter 3</Label>
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
                                            <div>
                                                <Label htmlFor="slider1">Slider 1</Label>
                                                <Slider id="slider1" min={0} max={100} step={1} />
                                            </div>
                                            <div>
                                                <Label htmlFor="slider2">Slider 2</Label>
                                                <Slider id="slider2" min={0} max={200} step={2} />
                                            </div>
                                            <div>
                                                <Label htmlFor="slider3">Slider 3</Label>
                                                <Slider id="slider3" min={0} max={300} step={3} />
                                            </div>
                                        </div>

                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
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