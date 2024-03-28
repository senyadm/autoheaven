import React from "react";
import CarSearchResults from "@/components/cars/CarSearchResults";
import CarSortDropdown from "../../../components/cars/CarSortDropdown";
import GradientHeading from "../../../components/landing/GradientHeading";
import CarSidebar from "../../../components/cars/CarSidebar/CarSidebar";
import { getlocales } from "../../actions";
import { clientCars, fetchCars, getCars } from "../../GlobalRedux/client";
import { FilterParams } from "../../../interfaces/cars/cars";
import { getNormalizedParams } from "../../../utils/cars";
import { Car } from "../../../interfaces/shared/Car";
const premiumThreshold = 250_000;

// revalidate cache after an hour
export const revalidate = 3600;
interface CarsProps {
  params: { lang: Locale };
  isPremium?: boolean;
  children?: React.ReactNode;
}

async function getCarResults(searchParams: FilterParams) {
  const normalizedParams = getNormalizedParams(searchParams);
  const currentPage = normalizedParams.page;
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
    const carResultsForPage = carResults[currentPage];
    const pageCount = Object.keys(carResults).length;
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
  // const [sort, setSort] = useState<
  //   | "newestFirst"
  //   | "oldestFirst"
  //   | "priceHighestFirst"
  //   | "priceLowestFirst"
  //   | "mileageHighestFirst"
  //   | "mileageLowestFirst"
  // >("newestFirst");
  // const [store, dispatch] = useAppStore(
  //   (state) => state?.carFiltersAndResults.filteredCars
  // );
  // const storeIsEmpty = !store || store.length === 0;
  // const [filters, setFilters] = useState<FilterPayload>({} as FilterPayload);

  // useEffect(() => {
  //   const defaultQueryParams: FilterPayload = {
  //     max_results: 0,
  //     type: "",
  //     make: "",
  //     model: "",
  //     fueltype: "",
  //     body_type: "",
  //     price_max: 1000000,
  //     price_min: isPremium ? premiumThreshold : 1000,
  //     min_year: 1975,
  //     max_year: 2023,
  //     mileage_min: 0,
  //     mileage_max: 500000,
  //     sortBy: "newestFirst",
  //     drivetrain: "",
  //   };
  //   const queryParamsObj: Partial<FilterPayload> = {};
  //   if (!query) return;

  //   query.forEach((value, key) => {
  //     (queryParamsObj as any)[key] = value;
  //   });
  //   queryParamsObj.max_results = Number(queryParamsObj.max_results);
  //   queryParamsObj.price_max = Number(queryParamsObj.price_max);
  //   queryParamsObj.price_min = Number(queryParamsObj.price_min);
  //   queryParamsObj.min_year = Number(queryParamsObj.min_year) || 1975;
  //   queryParamsObj.max_year = Number(queryParamsObj.max_year) || 2023;
  //   queryParamsObj.mileage_min = Number(queryParamsObj.mileage_min);
  //   queryParamsObj.mileage_max = Number(queryParamsObj.mileage_max);
  //   queryParamsObj.sortBy = sort;
  //   const finalQueryParams = {
  //     ...defaultQueryParams,
  //     ...queryParamsObj,
  //   };

  //   setFilters(finalQueryParams);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [query, sort]);

  // useEffect(() => {
  //   if (store && store.length === 0) {
  //     dispatch(fetchAllCars(filters));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filters, storeIsEmpty]);

  // const [offers, setOffers] = useState<number>(0);

  // useEffect(() => {
  //   if (!store) return;

  //   let totalElements = 0;

  //   store.forEach((list) => {
  //     totalElements += list.length;
  //   });

  //   setOffers(totalElements);
  // }, [store]);
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
