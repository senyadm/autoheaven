"use client"
import React from 'react'
import { TypographyH1, TypographyH4 } from '../ui/typography'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'

const carouselBgs = ["waqas-sultan.png", "scooter.png", "truck 1.png", "markus-winkler.png"];
const Carousel = ({ className }: any) => {
    const activeTransportCategory = useSelector((state: RootState) => state.transportCategory.activeCategory);
  return (
   <div className={`w-full h-[22.1875rem] bg-center bg-cover absolute text-primary-foreground flex flex-col items-center justify-end ${className}`} style={{
    boxShadow: "inset 0 -10em 15em black",
    backgroundImage: `url('/img/${carouselBgs[activeTransportCategory]}')`, // Add the missing closing parenthesis
    WebkitTransition: "background-image 1000ms linear", // Capitalize WebkitTransition
    msTransition: "background-image 1000ms linear", // Capitalize MSTransition
    transition: "background-image 1000ms linear"
}}>
        <TypographyH1>Cruise in Comfort</TypographyH1>
        <TypographyH4 className='mt-2.5'>Discover Cars Tailored to Your Lifestyle</TypographyH4>
        <div className='mb-[4.2rem] mt-[1.25rem] flex'>
          
            {
                // get an array of 4 elements to draw the dots
                Array.from({ length: 4 }, (_, i) => i).map( index => 
                     <div className={`h-2 rounded-full mr-2 ${activeTransportCategory === index ? "w-6 bg-gray-50" : "w-2 bg-gray-300"}`} key={index}>
            </div> 
                    )
            }
        </div>
    </div>
  )
}

export default Carousel