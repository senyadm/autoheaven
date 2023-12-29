"use client";
import {
  fetchAllCars,
  fetchBrands,
} from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { brandInfo } from "@/interfaces/brandInfo";
import React, { useEffect } from "react";
import BrandsElement from "./BrandsElement";
import GradientHeading from "./GradientHeading";

const brandsData: string[] = [
  "Volkswagen",
  "Porsche",
  "Audi",
  "BMW",
  "Ford",
  "Mercedes-Benz",
  "Toyota",
];

interface Props {
  popularBrands: string;
}

const BrandsBlock = ({ popularBrands }: Props) => {
  const [store, dispatch] = useAppStore(
    (state) => state?.carFiltersAndResults.brandsWithModels
  );
  const [cars, dispatchCars] = useAppStore(
    (state) => state?.carFiltersAndResults.filteredCars
  );
  const [brandsDataState, setBrandsDataState] = React.useState<brandInfo[]>([]);
  useEffect(() => {
    if (!store?.brandsWithModels || !store.brandsWithModels.length) {
      dispatch(fetchBrands());
      dispatchCars(
        fetchAllCars({
          max_results: 100000,
          price_max: 1000000,
          price_min: 0,
          max_year: new Date().getFullYear(),
          min_year: 1980,
          mileage_max: 500000,
          mileage_min: 0,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, dispatchCars]);

  useEffect(() => {
    if (!store || !cars) return;
    const brandsResultData: brandInfo[] = brandsData.map((item: string) => {
      const brandInfo: brandInfo = {
        brandName: item,
        resultsCount: 0,
        models: [],
      };

      cars.forEach((carsList) => {
        carsList.forEach((car) => {
          if (car.make === item) {
            brandInfo.resultsCount += 1;
            if (!brandInfo.models.includes(car.model)) {
              brandInfo.models.push(car.model);
            }
          }
        });
      });
      return brandInfo;
    });

    setBrandsDataState(brandsResultData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars]);

  return (
    <section className="flex flex-col items-center border rounded-md bg-background w-full md:max-w-6xl my-16 py-8">
      <GradientHeading
        title={popularBrands || "Popular Brands"}
        className="mb-9"
      />
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {brandsDataState.map((brandsDataEl) => (
          <BrandsElement
            key={brandsDataEl.brandName}
            brandInfo={brandsDataEl}
          />
        ))}
      </div>
    </section>
  );
};

export default BrandsBlock;
