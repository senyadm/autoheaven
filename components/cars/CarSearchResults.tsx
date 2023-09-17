import { ResultCarCardInterface } from '@/interfaces/ResultCarCard'
import React from 'react'
import GradientHeading from '../landing/GradientHeading'
import { TypographyLarge } from '../ui/typography'
import ResultCarCard from './ResultCarCard'

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
    accidentFree: true,
    imageURL: "/img/cars/volkswagen3.png",
    id: 3,
   
}
const CarSearchResults = () => {
  return (
    <section>
        <div className='flex'>
            <GradientHeading title='143 364 offers found' />
            Standard sort
        </div>
        <div>
            <TypographyLarge>Top offers</TypographyLarge>
            <ResultCarCard {...volkswagenCar2} />
        </div>
        <div className='space-y-8'>
            <TypographyLarge>Main offers</TypographyLarge>
            <ResultCarCard {...volkswagenCar1}/>
            <ResultCarCard {...volkswagenCar3}/>
        </div>
    </section>
  )
}

export default CarSearchResults