import { brandInfo } from '@/interfaces/brandInfo'
import React from 'react'
import { TypographyList } from '../ui/typography';
import { ExternalLink } from 'lucide-react';

interface BrandsElementProps {
  brandInfo: brandInfo; // Make sure brandInfo is properly imported
}

const BrandsElement = ({brandInfo}: BrandsElementProps) => {
     const { brandName, resultsCount, models } = brandInfo;
  return (
    <div>
        <div className='flex'>
            <div className='font-bold mr-4'>{brandName}</div >
            <div className='flex opacity-50 items-center'>
                <div className='mr-1'>{resultsCount}</div>
                <ExternalLink className='h-3 w-3'/>
            </div>
        </div>
        <TypographyList listItems={models}/>
    </div>
  )
}

export default BrandsElement