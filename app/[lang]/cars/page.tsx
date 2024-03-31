import CarSearchResults from "@/components/cars/CarSearchResults";
import CarSortDropdown from "../../../components/cars/CarSortDropdown";
import GradientHeading from "../../../components/landing/GradientHeading";
import CarSidebar from "../../../components/cars/CarSidebar/CarSidebar";
import { getlocales } from "../../actions";
import { clientCars, fetchCars, getCars } from "../../GlobalRedux/client";
import { FilterParams } from "../../../interfaces/cars/cars";
import { getNormalizedParams } from "../../../utils/cars";
import { Car } from "../../../interfaces/shared/Car";
import { Metadata } from "next/types";
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

async function getCarResults(searchParams: FilterParams) {
  const normalizedParams = getNormalizedParams(searchParams);
  const topCars = {
      title: "Top offers",
      data: [] as Car[],
    },
    nonTopCars = {
      title: "Main offers",
      data: [] as Car[],
    };
  try {
    // TODO optimize such that next page does not fetch the same data
    const carResults: Record<number, Car[]> = (
      await clientCars.get("/api/cars/fetch", {
        params: normalizedParams,
      })
    )?.data;
    const pageCount = Object.keys(carResults).length;
    // if page is greater or equal (starts with 0) than pageCount, return first page
    const currentPage =
      normalizedParams.page >= pageCount ? 0 : normalizedParams.page;
    const carResultsForPage = carResults[currentPage];
    const offerCount = Object.values(carResults).reduce(
      (acc, curr) => acc + curr.length,
      0
    );
    for (const carResult of carResultsForPage) {
      if (carResult.istop) {
        topCars.data.push(carResult);
      } else {
        nonTopCars.data.push(carResult);
      }
    }
    return { topCars, nonTopCars, offerCount, pageCount };
  } catch (e) {
    console.error("🚀 ~ getCarResults ~ e", e);
    return { topCars, nonTopCars, offerCount: 0, pageCount: 0 };
  }
}
const page = async ({ params, searchParams }) => {
  const filtersText = (await getlocales(params.lang)).filters;
  // maps car make to car models array
  const carModels: Record<string, string[]> = await getCars("/api/car_models");
  const carResults = await getCarResults(searchParams);
  const { topCars, nonTopCars, offerCount, pageCount } = carResults;
  return (
    <main className="flex flex-1 items-start bg-primary-foreground py-6">
      <div className="flex flex-col lg:flex-row mt-10 max-w-screen-2xl w-full mx-auto">
        <div className="w-full lg:w-1/4">
          <CarSidebar
            pageText={filtersText}
            offerNumber={offerCount}
            carModels={carModels}
          />
        </div>
        <div className="w-full lg:w-3/4">
          <section className="mx-8">
            <div className="flex justify-between mt-8 md:mt-8">
              <GradientHeading title={`${offerCount} offers found`} />
              <CarSortDropdown />
            </div>
            <CarSearchResults
              lang={params.lang}
              searchParams={searchParams}
              carResultsData={carResults}
              pageCount={pageCount}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
