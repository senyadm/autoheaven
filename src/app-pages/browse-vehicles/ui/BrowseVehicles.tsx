import CarSearchResults from "@/components/cars/CarSearchResults";
import CarSortDropdown from "@/components/cars/CarSortDropdown";
import GradientHeading from "@/components/landing/GradientHeading";
import CarSidebar from "@/src/widgets/car-filters/ui/CarSidebar";
import {
  fetchCarTypeByParams,
  fetchVehiclesByParams,
  fetchVehiclesWithTypes,
  fetchVehicleUIData,
} from "@/src/entities/vehicle";
import { WishlistProvider } from "@/src/entities/user";
import { ReadonlyURLSearchParams } from "next/navigation";
import { VehicleType } from "../../../shared/model/params";
import { getFilterData } from "../../../features/search-vehicles";
import {
  getLocationRedirectURL,
  getLocationText,
} from "../../../entities/location";
import Link from "next/link";
import {
  FullPageParams,
  getPathnameFromParams,
} from "@/src/shared/utils/params";
import { AllParams } from "../../../shared/utils/params";
import { getNormalizedParams } from "../../../shared/api";
const premiumThreshold = 250_000;

// revalidate cache after an hour
export const revalidate = 3600;
interface BrowseVehicleProps {
  pathParams: FullPageParams;
  searchParams: ReadonlyURLSearchParams;
  vehicleType: VehicleType;
}

const BrowseVehicles = async ({
  pathParams,
  searchParams,
  vehicleType,
}: BrowseVehicleProps) => {
  //

  const allParams: AllParams = { ...pathParams, ...searchParams };
  const normalizedParams = getNormalizedParams(allParams);
  const vehicleUiData = await fetchVehicleUIData(allParams.vehicleType);
  const carResults = await fetchVehiclesWithTypes(normalizedParams, vehicleUiData);

  const { offerCount, pageCount } = carResults;
  const { country, city, lang } = pathParams;
  return (
    <main className=" bg-primary-foreground py-6">
      <div className="flex flex-col flex-1 items-center">
        <Link
          href={`/${lang}${getPathnameFromParams({
            ...allParams,
            isListHeaven: true,
          })}`}
          className=" text-primary"
        >
          Try out the ListHeaven Feature!
        </Link>
        <div className="flex flex-col lg:flex-row mt-10 max-w-screen-2xl w-full mx-auto">
          <div className="w-full lg:w-1/4">
            <CarSidebar params={pathParams} offerNumber={offerCount} />
          </div>
          <div className="w-full lg:w-3/4">
            <section className="mx-4 md:mx-8">
              <div className="flex justify-between mt-8 md:mt-8">
                <GradientHeading
                  title={`${offerCount} offers found in ${getLocationText(
                    country,
                    city
                  )}`}
                />
                <CarSortDropdown />
              </div>
              <WishlistProvider>
                <CarSearchResults
                  lang={lang}
                  searchParams={searchParams}
                  carResultsData={carResults}
                  pageCount={pageCount}
                  vehicleUiData={vehicleUiData}
                  allParams={allParams}
                />
              </WishlistProvider>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BrowseVehicles;
