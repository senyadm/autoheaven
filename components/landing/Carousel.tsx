"use client"
import React from 'react'
import { TypographyH1, TypographyH4 } from '../ui/typography'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'

const carouselBgs = ["waqas-sultan.png", "scooter.png", "truck 1.png", "markus-winkler.png"];
const Carousel = () => {
    const activeTransportCategory = useSelector((state: RootState) => state.transportCategory.activeCategory);
  return (
    <div className="w-full h-[22.1875rem] bg-center bg-cover absolute text-primary-foreground flex flex-col items-center justify-end" style={{
        boxShadow: "inset 0 -10em 15em black",
        backgroundImage: `url('/img/${carouselBgs[activeTransportCategory]}`
    }}>
        <TypographyH1>Cruise in Comfort</TypographyH1>
        <TypographyH4 className='mt-2.5'>Discover Cars Tailored to Your Lifestyle</TypographyH4>
        <div className='mb-[4.2rem] mt-[1.25rem]'> . . .</div>
    </div>
  )
}

export default Carousel