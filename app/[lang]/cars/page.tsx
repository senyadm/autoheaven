import CarSearchResults from "@/components/cars/CarSearchResults";
import CarSortDropdown from "../../../components/cars/CarSortDropdown";
import GradientHeading from "../../../components/landing/GradientHeading";
import CarSidebar from "@/src/widgets/car-filters/ui/CarSidebar";
import { getlocales } from "../../actions";
import { Metadata } from "next/types";
import { Locale } from "@/src/app/i18n.config";
import {
  fetchVehicleUIData,
  fetchVehiclesByParams,
} from "../../../src/entities/vehicle";
import { WishlistProvider } from "../../../src/entities/user";
const premiumThreshold = 250_000;

// revalidate cache after an hour
export const revalidate = 3600;
interface CarsProps {
  params: { lang: Locale };
  isPremium?: boolean;
  children?: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Cars on AutoHeaven",
  description: "Find your dream car today on AutoHeaven",
};

const page = async ({ params, searchParams }) => {
  const { type } = searchParams;
  const filtersText = (await getlocales(params.lang)).filters;
  // maps car make to car models array
  const carResults = await fetchVehiclesByParams(searchParams);
  const vehicleUIData = await fetchVehicleUIData(type);
  const { offerCount, pageCount } = carResults;
  return (
    <main className="flex flex-1 items-start bg-primary-foreground py-6">
      <div className="flex flex-col lg:flex-row mt-10 max-w-screen-2xl w-full mx-auto">
        <div className="w-full lg:w-1/4">
          <CarSidebar
            pageText={filtersText}
            offerNumber={offerCount}
            vehicleUIData={vehicleUIData}
          />
        </div>
        <div className="w-full lg:w-3/4">
          <section className="mx-4 md:mx-8">
            <div className="flex justify-between mt-8 md:mt-8">
              <GradientHeading title={`${offerCount} offers found`} />
              <CarSortDropdown />
            </div>
            <WishlistProvider>
              <CarSearchResults
                lang={params.lang}
                searchParams={searchParams}
                carResultsData={carResults}
                pageCount={pageCount}
              />
            </WishlistProvider>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
