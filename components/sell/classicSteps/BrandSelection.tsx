import React from 'react'

interface VehicleCreateParams {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
}

const BrandSelection = ({ onNext, onPrevious }: {onNext: (param: keyof VehicleCreateParams, value: number | string) => void, onPrevious: () => void}) => {
  return (
    <div>BrandSelection</div>
  )
}

export default BrandSelection