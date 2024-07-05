import { VehicleTypePage, vehicleTypePages } from "../../../entities/vehicle";
import { vehicleTypeByPage } from "../../../entities/vehicle/model/vehicle";
import { VehicleType } from "../../../shared/model/params";

export interface PageWithLocationParams {
  country?: string;
  city?: string;
  vehicleType?: VehicleType;
  make?: string;
  model?: string;
  isListHeaven?: boolean;
}

// italy/rome/cars/audi/a4 => { country: 'italy', city: 'rome', vehicleType: 'cars', make: 'audi', model: 'a4' }
// italy/rome/cars/listheaven/audi/a4 => { isListHeaven: true, country: 'italy', city: 'rome', vehicleType: 'cars', make: 'audi', model: 'a4' }

// cars/audi/a4 => { vehicleType: 'cars', make: 'audi', model: 'a4' }
// cars => { vehicleType: 'cars' }
// null => {}
// italy/rome => { country: 'italy', city: 'rome' }

const paramOrder: (keyof PageWithLocationParams)[] = [
  "vehicleType",
  "make",
  "model",
];

export function parsePageParams(params: string[]) {
  let res: PageWithLocationParams = {};
  if (!params) return res;
  let vehicleTypeFound = false;
  let paramsOrderIndex = 0;
  for (let i = 0; i < params.length; i++) {
    const p = decodeURIComponent(params[i]);
    if (!p) break;
    const isSlugVehicleType = vehicleTypePages.includes(p as VehicleTypePage);

    if (vehicleTypeFound || isSlugVehicleType) {
      if (p === "listheaven") {
        res.isListHeaven = true;
        continue;
      }
      const paramKey = paramOrder[paramsOrderIndex++];
      if (!paramKey) return res;
      if (paramKey === "vehicleType") {
        res[paramKey] = vehicleTypeByPage[p];
      } else {
        res[paramKey] = p;
      }
      vehicleTypeFound = true;
      // if (params[i + 1]) res.make = params[i + 1];
      // if (params[i + 2]) res.model = params[i + 2];
      return res;
    } else {
      // if the word is not a vehicle type
      if (i === 0) {
        res.country = p;
      } else if (i === 1) {
        res.city = p;
      }
    }
  }

  return res;
}
