import React from 'react';
import RangeSlider from '../landing/RangeSlider';
import * as Collapsible from '@radix-ui/react-collapsible';
import { RowSpacingIcon } from '@radix-ui/react-icons';

const CarSearchFilter = () => {
  return (
    <div className="p-6 w-80 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Filter Options</h2>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-800">Price Range</span>
          <RowSpacingIcon className="text-gray-500"/>
        </div>
        <RangeSlider 
          min={0} 
          max={100000} 
          step={1000} 
          id="price" 
          label="Price Range" 
          filename="price-icon.svg"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-800">Mileage Range</span>
          <RowSpacingIcon className="text-gray-500"/>
        </div>
        <RangeSlider 
          min={0} 
          max={300000} 
          step={1000} 
          id="milage" 
          label="Mileage Range" 
          filename="mileage-icon.svg"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-800">Year Range</span>
          <RowSpacingIcon className="text-gray-500"/>
        </div>
        <RangeSlider 
          min={1980} 
          max={new Date().getFullYear()} 
          step={1} 
          id="year" 
          label="Year Range" 
          filename="year-icon.svg"
        />
      </div>
    </div>
  );
}

export default CarSearchFilter;
