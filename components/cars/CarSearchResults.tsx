import { ResultCarCardInterface } from '@/interfaces/ResultCarCard'
import React from 'react'
import GradientHeading from '../landing/GradientHeading'
import { TypographyLarge } from '../ui/typography'
import ResultCarCard from './ResultCarCard'
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
const volkswagenCar1: ResultCarCardInterface = {
    title: 'Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio',
    price: 21500,
    releaseYear: 2014,
    mileage: 10000,
    fuelType: 'petrol',
    drivetrain: 'fwd',
    bodyStyle: 'sedan',
    gear: 'automatic',
    accidentFree: true,
    imageURL: "/img/cars/volkswagen.png",
    id:1
}
const volkswagenCar2: ResultCarCardInterface = {
     title: 'Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio',
    price: 21500,
    releaseYear: 2014,
    mileage: 10000,
    fuelType: 'petrol',
    drivetrain: 'fwd',
    bodyStyle: 'sedan',
    gear: 'automatic',
    accidentFree: true,
    imageURL: "/img/cars/volkswagen2.png",
    id: 2,
     isTop: true
}
const volkswagenCar3: ResultCarCardInterface = {
     title: 'Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio',
    price: 21500,
    releaseYear: 2014,
    mileage: 10000,
    fuelType: 'petrol',
    drivetrain: 'fwd',
    bodyStyle: 'sedan',
    gear: 'automatic',
    accidentFree: false,
    imageURL: "/img/cars/volkswagen3.png",
    id: 3,
   
}
const CarSearchResults = () => {
      const [position, setPosition] = React.useState("Standard Sort")
  const paginationIconProps = {
    width: "16",
    height: "16"
  }
  const myChevronRight = <ChevronRight  key={"cr"} {...paginationIconProps}/>;
  const paginationButtonLabels = [<ChevronsLeft key={"csl"} {...paginationIconProps}/>, <ChevronLeft  key={"cl"} {...paginationIconProps}/>, "...", 22, 23, "...", 99, myChevronRight, <ChevronsRight  key={"csr"} {...paginationIconProps}/>]
  return (
    <section className='mr-8'>
        <div className='flex overflow overflow-y justify-between'>
            <GradientHeading title='143 364 offers found' />
           <DropdownMenu >
      <DropdownMenuTrigger asChild className='bg-background'>
        <Button variant="outline">{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="Standard Sort">Standard Sort</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
        <div className='space-y-8'>
          <div className="overflow-y-auto max-h-[calc(100vh-4rem)] space-y-8"> {/* Added scrollable wrapper here */}
          <div className='space-y-8'>
              <TypographyLarge className='mt-8'>Top offers</TypographyLarge>
              <ResultCarCard {...volkswagenCar2} />
          </div>
          <div className='space-y-8'>
              <TypographyLarge className='mt-8'>Main offers</TypographyLarge>
              <ResultCarCard {...volkswagenCar1}/>
              <ResultCarCard {...volkswagenCar3}/>
              <ResultCarCard {...volkswagenCar3}/>
              <ResultCarCard {...volkswagenCar3}/>
              <ResultCarCard {...volkswagenCar3}/>
          </div>
      </div>
      <div className='flex justify-end'>
        <Button>See more {myChevronRight}</Button>
      </div>
      <div  className='flex w-full justify-center space-x-2'>
        {paginationButtonLabels.map((label, index )=> <Button className={`${index===3?"bg-primary text-primary-foreground":"bg-background text-secondary-foreground"} `} key={index}>{label}</Button>)}
      </div>
        </div>
        
    </section>
  )
}

export default CarSearchResults