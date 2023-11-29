"use client";
import React, { useEffect } from 'react'
import BrandsElement from './BrandsElement';
import { brandInfo } from '@/interfaces/brandInfo';
import GradientHeading from './GradientHeading';
import { useAppStore } from '@/app/GlobalRedux/useStore';
import { fetchAllCars, fetchBrands } from '@/app/GlobalRedux/Features/carFiltersAndResultsSlice';


const brandsData: string[] = ['Volkswagen','Porsche', 'Audi', 'BMW', 'Ford', 'Mercedes-Benz', 'Toyota']

const BrandsBlock = () => {
  const [store, dispatch] = useAppStore(
    (state) => state?.carFiltersAndResults.brandsWithModels
  )
const [cars, dispatchCars] = useAppStore(
  (state) => state?.carFiltersAndResults.filteredCars
)
const [brandsDataState, setBrandsDataState] = React.useState<brandInfo[]>([]);
useEffect(() => {
    if (!store?.brandsWithModels || !store.brandsWithModels.length) {
      dispatch(fetchBrands());
      dispatchCars(fetchAllCars({
        max_results: 100000,
        price_max: 1000000,
        price_min: 0,
        max_year: new Date().getFullYear(),
        min_year: 1980,
        mileage_max: 500000,
        mileage_min: 0,
      }));
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dispatch, dispatchCars])


useEffect(() => {
  if (!store || !cars) return;
  const brandsResultData: brandInfo[] = brandsData.map((item: string) => {
    const brandInfo: brandInfo = {
      brandName: item,
      resultsCount: 0,
      models: [],
    }
    
    cars.forEach((carsList) => {
      carsList.forEach((car) => {
        if (car.make === item) {
          brandInfo.resultsCount += 1;
          if (!brandInfo.models.includes(car.model)) {
            brandInfo.models.push(car.model);
          }
        }
      })

    })
    return brandInfo;

  })

  setBrandsDataState(brandsResultData);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [cars])

  return (
    <section className='flex flex-col items-center border mx-17.5 my-9 py-10 px-6 rounded-lg bg-background'>
      <GradientHeading title='Popular Brands' className='mb-9'/>     
      <div className='grid grid-cols-5 gap-y-4 gap-x-5 w-full'>
        {brandsDataState.map(brandsDataEl => (
          <BrandsElement key={brandsDataEl.brandName} brandInfo={brandsDataEl} />
        ))}
      </div>
    </section>
  )
}

export default BrandsBlock