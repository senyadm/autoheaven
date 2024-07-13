"use server";
import { getlocales } from "../../../../app/actions";
import { Locale } from "../../../app/i18n.config";
import { FiltersDictionary } from "../../../../types";
import { fetchVehicleUIData } from "../../../entities/vehicle";
import { Car } from "../../../entities/vehicle/model/car";
import { VehicleType } from "../../../shared/model/params";

interface filterData {
  filtersText: FiltersDictionary;
  // carResults: {
  //   topVehicles: {
  //     title: string;
  //     data: Car[];
  //   };
  //   nonTopVehicles: {
  //     title: string;
  //     data: Car[];
  //   };
  //   offerCount: number;
  //   pageCount: number;
  // };
  vehicleUIData: {
    models: any;
    types: any;
    carModelsById: any;
  };
}

async function getFilterData(
  type: VehicleType,
  lang: Locale = "en"
): Promise<filterData> {
  const filtersText = (await getlocales(lang)).filters;
  // maps car make to car models array
  const vehicleUIData = await fetchVehicleUIData(type);
  return { filtersText, vehicleUIData };
}

export { getFilterData, type filterData };
