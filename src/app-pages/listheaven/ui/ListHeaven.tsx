import { getFilterData } from "@/src/features/search-vehicles";
import { VehicleType } from "@/src/shared/model/params";
import ListHeavenClient from "./ListHeavenClient";

const ListHeaven = async ({ params, searchParams }) => {
  const { vehicleType } = params;
  const results = await getFilterData(
    VehicleType.Bus,
    searchParams,
    params.lang
  );
  return (
    <ListHeavenClient
      lang={params.lang}
      filterData={results}
      vehicleType={vehicleType}
    />
  );
};

export default ListHeaven;
