"use server";
import { FilterPayload } from "../app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { clientCars } from "../app/GlobalRedux/client";
import { cache } from "react";

export const fetchBrands = cache(async () => {
  const response = await clientCars.get(`/api/car_models`);
  return response.data;
});

export const fetchAllCars = cache(async (filters: FilterPayload) => {
  try {
    if (Object.keys(filters).length === 0) return {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        delete filters[key as keyof typeof filters];
      }
    });
    const response = await clientCars.get(`/api/cars/fetch`, {
      params: filters,
    });
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
});

export const countBrands = async (brands: {}) => {
  const cars = await fetchAllCars({
    max_results: 100000,
    price_max: 1000000,
    price_min: 0,
    max_year: new Date().getFullYear(),
    min_year: 1980,
    mileage_max: 500000,
    mileage_min: 0,
  });

  const brandsData = {};
  for (const brand of Object.keys(brands)) {
    brandsData[brand] = {
      resultsCount: 0,
      models: new Set(),
    };
  }
  Object.values(cars).forEach((carsList) => {
    carsList.forEach((car) => {
      if (brandsData[car.make]) {
        brandsData[car.make].resultsCount += 1;
        if (!brandsData[car.make].models.has(car.model)) {
          brandsData[car.make].models.add(car.model);
        }
      }
    });
  });
  const res = [];
  for (const brand in brandsData) {
    if (brandsData[brand].resultsCount) {
      res.push({
        brandName: brand,
        resultsCount: brandsData[brand].resultsCount,
        models: Array.from(brandsData[brand].models),
      });
    }
  }
  return res;

  // old code

  //   const brandsResultData: brandInfo[] = Object.keys(brands).map(
  //     (item: string) => {
  //       const brandInfo: brandInfo = {
  //         brandName: item,
  //         resultsCount: 0,
  //         models: [],
  //       };

  //       Object.values(cars).forEach((carsList) => {
  //         carsList.forEach((car) => {
  //           if (car.make === item) {
  //             brandInfo.resultsCount += 1;
  //             if (!brandInfo.models.includes(car.model)) {
  //               brandInfo.models.push(car.model);
  //             }
  //           }
  //         });
  //       });
  //       return brandInfo;
  //     }
  //   );
  //   return brandsResultData;
};
