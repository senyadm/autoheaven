import React from 'react'

interface VehicleCreateParams {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
}

const VehicleDetails = ({ onPrevious }: {onPrevious: () => void}) => {
  return (
    <div>VehicleDetails</div>
  )
}

export default VehicleDetails