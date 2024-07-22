import { VehicleType } from '@/src/entities/filters';
import { findMakeById, findTypeById, Vehicle, VehicleOnCard, VehicleV2 } from '@/src/entities/vehicle';

export function addTypesAndMakes(vehicles: Vehicle[], vehicleUiData: any, vehicleType: VehicleType) {
    const newVehicles = vehicles as VehicleOnCard[];
    for (const vehicle of newVehicles) {
        vehicle.type = findTypeById(vehicleUiData.types, vehicle.type_id, vehicleType);
        if(vehicleType !== VehicleType.Car){
            vehicle.make = findMakeById(vehicleUiData.makes, (vehicle as VehicleV2).make_id);
        }
    }
   return newVehicles;
}