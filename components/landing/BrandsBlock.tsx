'use client';
import BrandsElement from "./BrandsElement";
import GradientHeading from "./GradientHeading";
import { countBrands, fetchBrands } from "../../actions/cars";
import { useAppSelector } from '@/app/GlobalRedux/store';
import { useEffect, useState } from 'react';
import { brandInfo } from '@/interfaces/brandInfo';


const BrandsBlock = () => {
  const [makes, setMakes] = useState<brandInfo[] | null>(null);
  useEffect(() => {
    countBrands().then((res) => {
      setMakes(res);
    })
  }, []);
 
  const text = useAppSelector((state) => state.pageData.dict?.popularBrands);
  return (
    <section className="flex flex-col items-center border rounded-md bg-background w-full md:max-w-6xl my-16 py-8">
      <GradientHeading
        title={text || "Popular Brands"}
        className="mb-9"
      />
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {makes?.map((brandsDataEl: any) => (
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
