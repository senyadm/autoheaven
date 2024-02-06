import { useAppStore } from "@/app/GlobalRedux/useStore";
import { brandInfo } from "@/interfaces/brandInfo";
import React, { useEffect } from "react";
import BrandsElement from "./BrandsElement";
import GradientHeading from "./GradientHeading";
import { countBrands, fetchBrands } from "../../actions/cars";

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

const BrandsBlock = async ({ popularBrands }: Props) => {
  const brands = await fetchBrands();
  const brandsDataState = await countBrands(brands);

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
