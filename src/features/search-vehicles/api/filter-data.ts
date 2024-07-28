"use server";
import { getlocales } from "../../../../app/actions";
import { Locale } from "../../../app/i18n.config";
import { FiltersDictionary } from "../../../shared/types/page-data";
import { fetchVehicleUIData } from "../../../entities/vehicle";
import { Car } from "../../../entities/vehicle/model/car";
import { VehicleType } from "../../../shared/model/params";

interface filterData {
  vehicleUIData: {
    models: any;
    types: any;
    carModelsById: any;
  };
}

async function getFilterData(
  type: VehicleType,
): Promise<filterData> {
  // maps car make to car models array
  const vehicleUIData = await fetchVehicleUIData(type);
  return { vehicleUIData };
}

export { getFilterData, type filterData };
