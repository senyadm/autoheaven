"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/autoheven_logo.svg";
import { Button } from "@/components/ui/button";
import { useSearchParams } from 'next/navigation';
import { Navbar } from "@/components/shared/header/Navbar";
import Footer from "@/components/Footer";
import CarSearchResults from "@/components/cars/CarSearchResults";
import CarSidebar from "@/components/cars/CarSidebar";
import { FilterPayload, fetchAllCars } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { Locale } from "@/i18n.config";

const premiumThreshold = 250_000;


interface CarsProps{
  params: { lang: Locale }
  isPremium?: boolean;
}

const Cars = ({params, isPremium=false}:CarsProps) => {
  const query  = useSearchParams()
  const [filters, setFilters] = useState<FilterPayload>({} as FilterPayload);
  const [sort, setSort] = useState<"newestFirst" | "oldestFirst" | "priceHighestFirst" | "priceLowestFirst" | "mileageHighestFirst" | "mileageLowestFirst">("newestFirst");
  const [store, dispatch] = useAppStore(
    (state) => state?.carFiltersAndResults.filteredCars  
  );
  const storeIsEmpty = !store || store.length === 0;

  useEffect(() => { 
    const defaultQueryParams: FilterPayload = {
      max_results: 0,     
      type: "",
      make: "",
      model: "",
      fueltype: "",
      body_type: "",
      price_max: 1000000,
      price_min: isPremium ? premiumThreshold : 1000,
      min_year: 1975,
      max_year: 2023,
      mileage_min: 0,
      mileage_max: 500000,
      sortBy: "newestFirst",
      drivetrain: "",
      
    };
    const queryParamsObj: Partial<FilterPayload> = {};
    if (!query) return;

    query.forEach((value, key) => {
      (queryParamsObj as any)[key] = value;
    });
    queryParamsObj.max_results = Number(queryParamsObj.max_results)
    queryParamsObj.price_max = Number(queryParamsObj.price_max)
    queryParamsObj.price_min = Number(queryParamsObj.price_min)
    queryParamsObj.min_year = Number(queryParamsObj.min_year) || 1975
    queryParamsObj.max_year = Number(queryParamsObj.max_year) || 2023
    queryParamsObj.mileage_min = Number(queryParamsObj.mileage_min)
    queryParamsObj.mileage_max = Number(queryParamsObj.mileage_max)
    queryParamsObj.sortBy = sort
    const finalQueryParams = {
      ...defaultQueryParams,
      ...queryParamsObj
    };

    setFilters(finalQueryParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sort])

  useEffect(() => {
    if (store && store.length === 0) {
      dispatch(fetchAllCars(filters));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, storeIsEmpty]);

  const [offers, setOffers] = useState<number>(0);

  useEffect(() => {
    if (!store) return; // Exit early if store is falsy
  
    let totalElements = 0;
  
    store.forEach((list) => {
      totalElements += list.length;
    });
  
    setOffers(totalElements);
  }, [store]);

  return (
  
      <main className="flex flex-1 items-start bg-indigo-50 py-6">
        <div className="flex flex-row mt-10 space-x-10 max-w-screen-2xl mx-auto">
          <div className="w-full lg:w-1/4">
            <CarSidebar lang={params.lang} offerNumber={offers}  paramFilters={filters} dispatch={dispatch}/>
          </div>
          <div className="w-full lg:w-3/4">
            <CarSearchResults lang={params.lang} store={store} setSort={setSort}/>
          </div>
        </div>
      </main>

    
  );
};

export default Cars;
