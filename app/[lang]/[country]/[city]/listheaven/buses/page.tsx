import { ListHeaven } from "@/src/widgets/listheaven";
import { getFilterData } from "@/src/features/search-vehicles";
import { VehicleType } from "@/src/shared/model/params";

const page = async ({ params, searchParams }) => {
  const results = await getFilterData(
    VehicleType.Bus,
    searchParams,
    params.lang
  );
  return (
    <ListHeaven
      lang={params.lang}
      filterData={results}
      vehicleType={VehicleType.Bus}
    />
  );
};

export default page;
