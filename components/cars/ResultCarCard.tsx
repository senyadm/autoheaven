import { ResultCarCardInterface } from '@/interfaces/ResultCarCard'
import React from 'react'

const ResultCarCard = ({title,
    price,
    releaseYear,
    mileage,
    fuelType,
    drivetrain,
    bodyStyle,
    gear,
    accidentFree}: ResultCarCardInterface) => {
  return (
    <div>{title}</div>
  )
}

export default ResultCarCard