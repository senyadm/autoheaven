import { getFilterData } from "@/src/features/search-vehicles";
import ListHeavenClient from "./ListHeavenClient";
import { VehicleType } from "../../../shared/model/params";
import { AllParams } from "../../../shared/utils/params";
import { ReadonlyURLSearchParams } from "next/navigation";
import { fetchVehiclesByParams, fetchVehiclesWithTypes } from "../../../entities/vehicle";
import { getNormalizedParams } from "../../../shared/api";

interface ListHeavenProps {
  params: AllParams;
  searchParams: ReadonlyURLSearchParams;
}

const ListHeaven = async ({ params, searchParams }: ListHeavenProps) => {
  const filterData = await getFilterData(params.vehicleType, params.lang);
  const normalizedParams = getNormalizedParams(params);
  const carResults = await fetchVehiclesWithTypes(normalizedParams, filterData.vehicleUIData);

  return (
    <ListHeavenClient
      filterData={filterData}
      carResults={carResults}
      params={params}
    />
  );
};

export default ListHeaven;
