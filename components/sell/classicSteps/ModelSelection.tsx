import React from 'react'

interface VehicleCreateParams {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
}

const ModelSelection = ({ onNext, onPrevious }: {onNext: (param: keyof VehicleCreateParams, value: number | string) => void, onPrevious: () => void}) => {
  return (
    <div>ModelSelection</div>
  )
}

export default ModelSelection