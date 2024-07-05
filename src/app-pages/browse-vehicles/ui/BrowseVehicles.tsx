import CarSearchResults from "@/components/cars/CarSearchResults";
import CarSortDropdown from "@/components/cars/CarSortDropdown";
import GradientHeading from "@/components/landing/GradientHeading";
import CarSidebar from "@/src/widgets/car-filters/ui/CarSidebar";
import { getlocales } from "@/app/actions";
import { Metadata, ResolvingMetadata } from "next/types";
import { Locale } from "@/src/app/i18n.config";
import {
  fetchVehicleUIData,
  fetchVehiclesByParams,
} from "@/src/entities/vehicle";
import { WishlistProvider } from "@/src/entities/user";
import { ReadonlyURLSearchParams } from "next/navigation";
import { VehicleType } from "../../../shared/model/params";
import { getFilterData } from "../../../features/search-vehicles";
import { getLocationText } from "../../../entities/location";
import Link from "next/link";
const premiumThreshold = 250_000;

// revalidate cache after an hour
export const revalidate = 3600;
interface BrowseVehicleProps {
  params: { lang: Locale; country: string; city: string };
  searchParams: ReadonlyURLSearchParams;
  vehicleType: VehicleType;
}

const BrowseVehicles = async ({
  params: { lang, country, city },
  searchParams,
  vehicleType,
}: BrowseVehicleProps) => {
  //
  const { filtersText, carResults, vehicleUIData } = await getFilterData(
    vehicleType,
    searchParams,
    lang
  );
  const { offerCount, pageCount } = carResults;

  return (
    <main className=" bg-primary-foreground py-6">
      <div className="flex flex-col flex-1 items-center">
        <Link href={`listheaven`} className=" text-primary">
          Try out the ListHeaven Feature!
        </Link>
        <div className="flex flex-col lg:flex-row mt-10 max-w-screen-2xl w-full mx-auto">
          <div className="w-full lg:w-1/4">
            <CarSidebar
              pageText={filtersText}
              offerNumber={offerCount}
              vehicleUIData={vehicleUIData}
              vehicleTypeState={{ isParam: false, type: vehicleType }}
            />
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
