import React from 'react';
import CarSearchFilter from './CarSearchFilter'; // Adjust the path accordingly

const CarSidebar = () => {
  return (
    <div className="flex-none h-full p-4 bg-white shadow-lg">
      <CarSearchFilter />
      {/* If you have other sections or filters to add, you can do so below */}
    </div>
  );
}

export default CarSidebar;
