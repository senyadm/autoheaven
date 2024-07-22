import {
    Table, 
    TableBody,
    TableCell,
    TableRow
    

 } from '@/components/ui/table'
import { getUserFriendlyVehicleDetails, VehicleAnyOnCard, vehicleDetailsToOmit } from '@/src/entities/vehicle'
import { useMemo } from 'react';

const userFriendlyVehicleKeys: Record<keyof VehicleAnyOnCard, string> = {
    year: 'Year',
    price: 'Price',
    fueltype: 'Fuel',
    mileage: 'Mileage',
    accidentfree: 'No Accidents',
    body_type: 'Body Type',
    gearbox: 'Gearbox',
    drivetrain: 'Drivetrain',
    make: 'Make',
    model: 'Model',
    type: 'Body Type',
    consumption_summer: 'Summer Consumption',
    consumption_winter: 'Winter Consumption',
    consumption_highway: 'Highway Consumption',
    origin: "Country of Origin",
    horse_power: "Horse Power",
    cubic_capacity: "Cubic Capacity",
    color: "Color",
    int_color: "Interior Color",
    ext_color: "Exterior Color",
    seats: "Seats",
  };

export default function DetailsTable({ vehicleDetails }) {
    const userFriendlyVehicleDetails = useMemo(() => getUserFriendlyVehicleDetails(vehicleDetails as VehicleAnyOnCard), [vehicleDetails]);
  return (
    <Table wrapperClassName='overflow-visible border-t' > 
    <TableBody >
                {Object.entries(userFriendlyVehicleDetails).map(([vehicleInfoKey, vehicleInfoValue]) => vehicleInfoValue && !vehicleDetailsToOmit.has(vehicleInfoKey) && <TableRow key={`${vehicleInfoKey}+${vehicleDetails.id} `}>
                  <TableCell className="font-medium">{userFriendlyVehicleKeys[vehicleInfoKey]}</TableCell>
                  <TableCell>{vehicleInfoValue}</TableCell>
                 
                </TableRow>)}
    </TableBody>
  </Table>
  )
}
