/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Truck } from '@/icons/truck';
import { CommercialVehicle } from '@/icons/commercial-vehicle';
import { TruckTransport } from '@/icons/truck-transport';
import { Trailer } from '@/icons/trailer';
import { SemiTrailer } from '@/icons/semi-trailer';
import { TankTransport } from '@/icons/tank-transport';
import SvgIcon from "../SvgIcon"
import { ChevronRight, Siren } from "lucide-react"
import RangeSlider from "./RangeSlider"
import { fetchData } from '@/app/GlobalRedux/slice';
import { RootState } from '@/app/GlobalRedux/store';
import { AppDispatch } from '@/app/GlobalRedux/store';
import { setActiveTransportCategory } from '@/app/GlobalRedux/Features/transportCategorySlice';
// import { fetchAllCars, selectCarBrands } from '@/app/GlobalRedux/Features/carFiltersAndResultsSlice';
import {useAppStore} from '@/app/GlobalRedux/useStore'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; 
import {tempData} from './tempData'
import {allData} from './allData'
import { 
    FilterStates,
    Filter, 
    TrucksComponentProps, 
    CarComponentProps, 
    tabsTriggersInfo, 
    PassengerCars,
    TabKeys,
    MotoComponentProps,
    BUS_SUBCATEGORIES, 
    TRUCK_SUBCATEGORIES,
    Car
} from './types';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


const filterDefault: Filter = {
    price: [1000, 1000000],
    milage: [0, 500000],
    year: [1975, 2023],
    brandAndModel: '',
    vehicleBody: '',
    fuelType: ''
};


const bodyTypes: string[] = [
    'All',
    'Sedan',
    'SUV',
    'Hatchback',
    'Pickup',
    'Example'
]

const fuelTypes: string[] = [
    'All',
    'Petrol',
    'Gas',
    'Electric',
    'Diesel',
    'Hybrid'
]


export function CarComponent({ handleSliderChange, filter, handleSelectorChange, handleOfferNumbers }: CarComponentProps) { 
    // const [carBrands, dispatch] = useAppStore((state) => state.carFiltersAndResults.carBrands),
    // [brands, setBrands] = useState<string[]>([]);
    const [carData, setCardata] = useState<Car[]>(allData);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [offers, setOffers] = useState<number>(0);
    const handlePopoverToggle = (state: boolean) => {
        setIsPopoverOpen(state);
    };

    const handleBrandClick = (brand: string) => {
        handleSelectorChange("cars", "brandAndModel", brand); // Calling the passed prop function
        setIsPopoverOpen(false);  // Close the popover
      };

const brands = tempData;
brands.push("All")
    // useEffect(() => {
    //     if (!carBrands) {
    //         dispatch(fetchAllCars());
    //     }
    // }, [dispatch, carBrands]);
  
    // useEffect(() => {
    //   if (carBrands) {
    //     setBrands(carBrands)
    //   }
    // }, [carBrands]);
    
    const mileageInRange = (car: Car, range: [number, number]) => car.mileage >= range[0] && car.mileage <= range[1];
    const priceInRange = (car: Car, range: [number, number]) => car.price >= range[0] && car.price <= range[1];
    const yearInRange = (car: Car, range: [number, number]) => car.year >= range[0] && car.year <= range[1];
    const isBrand = (car: Car, brand: string) => car.make === brand || brand === "All";
    const bodyMatch = (car: Car, body: string) => car.type === body || body === "All";
    // const fuelMatch = (car: Car, fuel: string) => car. === fuel || fuel === "All";

    const carMatchesFilters = (car: Car, filters: Filter) => {
        return mileageInRange(car, filters.milage) && 
               priceInRange(car, filters.price) && 
               yearInRange(car, filters.year) && 
               isBrand(car, filters.brandAndModel) &&
               bodyMatch(car, filter.vehicleBody);

    };
    
    useEffect(() => {
        if(carData && carMatchesFilters && filter) {
            const resData = carData.filter(car => carMatchesFilters(car, filter));
            handleOfferNumbers(resData.length)
            setOffers(resData.length)
            console.log(resData);
        }

    }, [carData, carMatchesFilters, filter]);


return (
    <Card className="border-0">
                                   
                                    <CardContent className="space-y-2 mt-8">
                                    <div className="grid grid-cols-3 gap-4 mt-4 mb-6">
                                    <RangeSlider value={filter.price} fixedLowerText="1000 $" fixedUpperText="1000000 $"  filename='banknote.svg' id="price" min={1000} max={1000000} step={1000} label="Price range" onValueChange={(values) => handleSliderChange("cars", "price", values)} />
                                            <RangeSlider value={filter.milage} fixedLowerText="0 km" fixedUpperText="500000 km"   filename='milage.svg' id="milage" min={0} max={500000} step={10000} label="Milage" onValueChange={(values) => handleSliderChange("cars","milage", values)} />
                                            <RangeSlider value={filter.year} fixedLowerText="1975" fixedUpperText="2023"  filename='calendar.svg' id="year" min={1975} max={2023} step={1} label="Year" onValueChange={(values) => handleSliderChange("cars","year", values)} />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2"> 
            <Label htmlFor="filter1">Brand and model</Label> 
            <SvgIcon filepath='icons/tick.svg' alt='' width={16} height={16}/>
        </div>
        <Popover open={isPopoverOpen} onOpenChange={handlePopoverToggle}>
                <PopoverTrigger>
                    <button>{filter.brandAndModel || 'Select a brand...'}</button>
                </PopoverTrigger>
                <PopoverContent className="grid grid-cols-6">
                    {brands.sort().map((brand, index) => (
                        <div 
                            key={index}
                            onClick={() => handleBrandClick(brand)}
                            className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                        >
                            {brand}
                        </div>
                    ))}
                </PopoverContent>
            </Popover>



                                            </div>

                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
            <Label htmlFor="filter2" >Vehicle body</Label>
            <SvgIcon filepath='icons/car.svg' alt='' width={16} height={16}/>
        </div>
                                                <Select onValueChange={(selectorValue) => handleSelectorChange("cars", "vehicleBody", selectorValue)} value={filter.vehicleBody}>
                            
                                                    <SelectTrigger currentValue={filter.vehicleBody}>Select body...</SelectTrigger>
                                                    <SelectContent>
                                                    {bodyTypes.map((item: string,index: number) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
            <Label htmlFor="filter3">Fuel type</Label>
            <SvgIcon filepath='icons/fuel.svg' alt='' width={16} height={16}/>
        </div>
                                                <Select onValueChange={(selectorValue) => handleSelectorChange("cars", "fuelType", selectorValue)} value={filter.fuelType}>
                                                    <SelectTrigger currentValue={filter.fuelType}>Select fuel...</SelectTrigger>
                                                    <SelectContent>
                                                    {fuelTypes.map((item: string,index: number) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
            

                                    </CardContent>
                                    <CardFooter className="grid place-items-end">
                                        <Button>{offers} offers<ChevronRight /></Button>
                                    </CardFooter>
                                </Card>
)
}

export function MotorcycleComponent({handleSliderChange, filter, handleSelectorChange} :MotoComponentProps ) { 
                          return (
                            <Card className="border-0">
                
                            <CardContent className="space-y-2 mt-8" >
                                {/* ... (rest of the input components) */}
      <div className="grid grid-cols-3 gap-4 mt-4 mb-6">
      <RangeSlider value={filter.price} fixedLowerText="1000 $" fixedUpperText="100000 $"  filename='banknote.svg' id="price" min={1000} max={100000} step={1000} label="Price range" onValueChange={(values) => handleSliderChange("moto", "price", values)} />
                                            <RangeSlider value={filter.milage} fixedLowerText="0 km" fixedUpperText="500000 km"   filename='milage.svg' id="milage" min={0} max={500000} step={10000} label="Milage" onValueChange={(values) => handleSliderChange("moto","milage", values)} />
                                            <RangeSlider value={filter.year} fixedLowerText="1975" fixedUpperText="2023"  filename='calendar.svg' id="year" min={1975} max={2023} step={1} label="Year" onValueChange={(values) => handleSliderChange("moto","year", values)} />
                                </div>
                                {/* New Selectors */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                    <div className="flex items-center space-x-2"> {/* Flex container */}
            <Label htmlFor="filter1">Brand and model</Label> 
            <SvgIcon filepath='icons/tick.svg' alt='' width={16} height={16}/>
        </div>
                                        <Select onValueChange={(selectorValue) => handleSelectorChange("moto", "brandAndModel", selectorValue)}>
                                            <SelectTrigger>Select brand...</SelectTrigger>
                                            <SelectContent>
                    
                                                <SelectItem value="option1">Option 1</SelectItem>
                                                <SelectItem value="option2">Option 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
            <Label htmlFor="filter2" >Vehicle body</Label>
            <SvgIcon filepath='icons/car.svg' alt='' width={16} height={16}/>
        </div>
                                        <Select onValueChange={(selectorValue) => handleSelectorChange("moto", "vehicleBody", selectorValue)} value = {filter.brandAndModel}>
                                            <SelectTrigger  currentValue={filter.vehicleBody}>Select body...</SelectTrigger>
                                            <SelectContent>
                                            {bodyTypes.map((item: string,index: number) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
            <Label htmlFor="filter3">Fuel type</Label>
            <SvgIcon filepath='icons/fuel.svg' alt='' width={16} height={16}/>
        </div>
                                        <Select onValueChange={(selectorValue) => handleSelectorChange("moto", "fuelType", selectorValue)} value={filter.fuelType}>
                                            <SelectTrigger currentValue={filter.fuelType}>Select fuel...</SelectTrigger>
                                            <SelectContent>
                                            {fuelTypes.map((item: string,index: number) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* New Sliders */}
                          

                            </CardContent>
                            <CardFooter className="grid place-items-end">
                                <Button>100000 offers<ChevronRight /></Button>
                            </CardFooter>
                        </Card>
                          )
}



export function TrucksComponent({handleSliderChange,
    setSelectedIcon,
    setHoveredIcon,
    selectedIcon,
    hoveredIcon,
    filter,
    handleSelectorChange
} :TrucksComponentProps) { 


    return (
        <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle className="text-sm mb-5">Truck Filters</CardTitle>

                                        <div className="flex items-center justify-center align-items-center">
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
                                                   <SvgIcon filepath={subcategory.icon} alt={subcategory.value}/>
                                                    <span className="ml-1.5">{subcategory.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                    <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
                                    <RangeSlider  value={filter.price}  fixedLowerText="1000 $" fixedUpperText="100000 $"  filename='banknote.svg' id="price" min={1000} max={100000} step={1000} label="Price range" onValueChange={(values) => handleSliderChange("trucks", "price", values)} />
                                            <RangeSlider value= {filter.milage} fixedLowerText="0 km" fixedUpperText="500000 km"   filename='milage.svg' id="milage" min={0} max={500000} step={10000} label="Milage" onValueChange={(values) => handleSliderChange("trucks","milage", values)} />
                                            <RangeSlider value={filter.year} fixedLowerText="1975" fixedUpperText="2023"  filename='calendar.svg' id="year" min={1975} max={2023} step={1} label="Year" onValueChange={(values) => handleSliderChange("trucks","year", values)} />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2"> {/* Flex container */}
            <Label htmlFor="filter1">Brand and model</Label> 
            <SvgIcon filepath='icons/tick.svg' alt='' width={16} height={16}/>
        </div>
                                                <Select onValueChange={(selectorValue) => handleSelectorChange("trucks", "brandAndModel", selectorValue)} >
                                                    <SelectTrigger>Select brand...</SelectTrigger>
                                                    <SelectContent>
                                                        {/* Add your SelectItems here */}
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
            <Label htmlFor="filter2" >Vehicle body</Label>
            <SvgIcon filepath='icons/car.svg' alt='' width={16} height={16}/>
        </div>
                                                <Select onValueChange={(selectorValue) => handleSelectorChange("trucks", "vehicleBody", selectorValue)} value={filter.fuelType}>
                                                    <SelectTrigger  currentValue={filter.vehicleBody}>Select body...</SelectTrigger>
                                                    <SelectContent>
                                                    {bodyTypes.map((item: string,index: number) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
            <Label htmlFor="filter3">Fuel type</Label>
            <SvgIcon filepath='icons/fuel.svg' alt='' width={16} height={16}/>
        </div>
                                                <Select onValueChange={(selectorValue) => handleSelectorChange("trucks", "fuelType", selectorValue)} value={filter.fuelType}>
                                                    <SelectTrigger  currentValue={filter.fuelType}>Select fuel...</SelectTrigger>
                                                    <SelectContent>
                                                    {fuelTypes.map((item: string,index: number) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* New Sliders */}
                                 

                                    </CardContent>
                                    <CardFooter className="grid place-items-end">
                                        <Button>100000 offers<ChevronRight /></Button>
                                    </CardFooter>
                                </Card>
    )
}



export function BusComponent({handleSliderChange,
    setSelectedIcon,
    setHoveredIcon,
    selectedIcon,
    hoveredIcon,
    filter,
    handleSelectorChange
    } :TrucksComponentProps) { 



return (
    <Card className="border-0">
                                    <CardHeader>
                                        <CardTitle className='mb-5' style={{ fontSize: "14px"}}>Bus Filters</CardTitle>
                                        <div className="ml-10 mr-10 flex items-center justify-between align-items-center">
                                            {BUS_SUBCATEGORIES.map((subcategory, index) => (
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
                                                        <SvgIcon alt={subcategory.value} filepath={subcategory.icon}/>
                                                    <span className="ml-1.5">{subcategory.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                    
                                    <div className="grid grid-cols-3 gap-6 mt-4 mb-6"> 
                                    <RangeSlider value={filter.price}   fixedLowerText="1000 $" fixedUpperText="100000 $"  filename='banknote.svg' id="price" min={1000} max={100000} step={1000} label="Price range" onValueChange={(values) => handleSliderChange("busses", "price", values)} />
                                            <RangeSlider value={filter.milage}  fixedLowerText="0 km" fixedUpperText="500000 km"   filename='milage.svg' id="milage" min={0} max={500000} step={10000} label="Milage" onValueChange={(values) => handleSliderChange("busses", "milage", values)} />
                                            <RangeSlider value = {filter.year} fixedLowerText="1975" fixedUpperText="2023"  filename='calendar.svg' id="year" min={1975} max={2023} step={1} label="Year" onValueChange={(values) => handleSliderChange("busses", "year", values)} />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2"> {/* Flex container */}
            <Label htmlFor="filter1">Brand and model</Label> 
            <SvgIcon filepath='icons/tick.svg' alt='' width={16} height={16}/>
        </div>
                                                <Select onValueChange={(selectorValue) => handleSelectorChange("busses", "brandAndModel", selectorValue)}>
                                                    <SelectTrigger>Select brand...</SelectTrigger>
                                                    <SelectContent>
                                          
                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
            <Label htmlFor="filter2" >Vehicle body</Label>
            <SvgIcon filepath='icons/car.svg' alt='' width={16} height={16}/>
        </div>
                                                <Select onValueChange={(selectorValue) => handleSelectorChange("busses", "vehicleBody", selectorValue)} value={filter.vehicleBody}>
                                                    <SelectTrigger  currentValue={filter.vehicleBody}>Select body...</SelectTrigger>
                                                    <SelectContent>
                                                    {bodyTypes.map((item: string,index: number) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
            <Label htmlFor="filter3">Fuel type</Label>
            <SvgIcon filepath='icons/fuel.svg' alt='' width={16} height={16}/>
        </div>
                                                <Select onValueChange={(selectorValue) => handleSelectorChange("busses", "fuelType", selectorValue)} value={filter.fuelType}>
                                                    <SelectTrigger  currentValue={filter.fuelType}>Select fuel...</SelectTrigger>
                                                    <SelectContent>

                                                    {fuelTypes.map((item: string,index: number) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
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
    }
    useEffect(() => {
        console.log(selectedIcon)
    }, [selectedIcon])
    const handleSliderChange = (tab: TabKeys, id: string, values: [number, number]) => {
        setFilters(prev => ({ ...prev, [tab]: {...prev[tab], [id]: values}}));
    };

    const handleSelectorChange = (tab: TabKeys, id: string, selectorValue: string) => {
        console.log(selectorValue)
        setFilters(prev => ({ ...prev, [tab]: {...prev[tab], [id]: selectorValue}}));
    };

    return (
        <div className={`max-w-[1140px] w-full mb-36px ${className}`}>
            <Card>
                <CardHeader>
                    <CardContent>
                        <Tabs defaultValue="cars">
                            <TabsList className="grid w-full grid-cols-4">
                                {tabsTriggersInfo.map((tab, index) => (
  <TabsTrigger key={tab.value} value={tab.value} onClick={()=>dispatch(setActiveTransportCategory(index))}>
    <SvgIcon filepath={tab.icon} alt="" width={16} height={16} />
    <span style={{ marginLeft: "5px" }}>{tab.label}</span>
  </TabsTrigger>
))}
                            </TabsList>
                            <TabsContent value="cars">
                                <CarComponent handleOfferNumbers={handleOfferNumbers} filter={filters.cars} handleSliderChange={handleSliderChange} handleSelectorChange={handleSelectorChange}/>
                            </TabsContent>
                            <TabsContent value="moto">
                                <MotorcycleComponent filter={filters.moto} handleSliderChange={handleSliderChange} handleSelectorChange={handleSelectorChange}/>
                            </TabsContent>
                            <TabsContent value="trucks">
                                <TrucksComponent filter={filters.trucks} handleSliderChange={handleSliderChange} handleSelectorChange={handleSelectorChange}
        setSelectedIcon={setSelectedIcon}
        setHoveredIcon={setHoveredIcon}
        selectedIcon={selectedIcon}
        hoveredIcon={hoveredIcon}/>
                            </TabsContent>

                          
                            <TabsContent value="busses">
                                <BusComponent filter={filters.busses} handleSliderChange={handleSliderChange} handleSelectorChange={handleSelectorChange}
        setSelectedIcon={setSelectedIcon}
        setHoveredIcon={setHoveredIcon}
        selectedIcon={selectedIcon}
        hoveredIcon={hoveredIcon}/>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}

export default FilterComponent;