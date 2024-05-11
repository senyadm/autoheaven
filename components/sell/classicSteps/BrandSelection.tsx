import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, SearchIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { fetchBrands } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { useAppStore } from "@/app/GlobalRedux/useStore";
interface VehicleCreateParams {
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
}
import {
  setBrand,
  setModels,
} from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
import { InputField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SellClassicTranslations } from "@/types";
import { VehicleType } from "../../../src/shared/model/params";

const BrandSelection = ({
  onNext,
  onPrevious,
  dict,
  staticVehicleData,
}: {
  onNext: () => void;
  onPrevious: () => void;
  dict: SellClassicTranslations | null;
}) => {
  const [search, setSearch] = useState<string>("");
  const [showSimplified, setShowSimplified] = useState<boolean>(false);
  const [carBrands, dispatchBrands] = useAppStore(
    (state) => state?.carFiltersAndResults?.brandsWithModels
  );
  const [carType] = useAppStore((state) => state?.createCarProgress?.carType);

  const BrandsByCarType = {
    [VehicleType.Car]: {
      modelList: carBrands,
      brandList: Object.keys(carBrands || {}),
    },
    [VehicleType.Moto]: {
      modelList: staticVehicleData.moto.type.data.map((item) => item.moto_type),
      brandList: staticVehicleData.moto.make.data.map((item) => item.make_name),
    },
    [VehicleType.Bus]: {
      modelList: staticVehicleData.bus.type.data.map((item) => item.bus_type),
      brandList: staticVehicleData.bus.make.data.map((item) => item.make_name),
    },
  };
  const brands = carBrands;
  const brandList = BrandsByCarType[carType].brandList;
  const modelList = BrandsByCarType[carType].modelList;
  console.log("🚀 ~ BrandsByCarType[carType]:", BrandsByCarType[carType]);

  const sortedBrandsWithHeadings = useMemo(() => {
    if (!brands) return [];

    const sortedBrands: string[] = [...brandList].sort();
    let lastLetter = "";
    let groupedBrands: string[][] = []; // An array of arrays of strings

    sortedBrands.forEach((brand) => {
      const firstLetter = brand[0].toUpperCase();
      if (firstLetter !== lastLetter) {
        groupedBrands.push([firstLetter]);
        lastLetter = firstLetter;
      }
      groupedBrands[groupedBrands.length - 1].push(brand);
    });
    if (search) {
      groupedBrands = groupedBrands.filter((grouped) =>
        grouped.some((brand) =>
          brand.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    return groupedBrands;
  }, [brands, brandList, search]);

  const sortedAndGroupedBrands = useMemo(() => {
    if (!brands) return {};

    const sortedBrands: string[] = [...brandList].sort();

    const grouped = sortedBrands.reduce(
      (acc: Record<string, string[]>, brand) => {
        const firstLetter = brand[0].toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [brand];
        } else {
          acc[firstLetter].push(brand);
        }
        return acc;
      },
      {}
    );
    return grouped;
  }, [brands, brandList]);

  const [store, dispatch] = useAppStore((state) => state?.createCarProgress);
  useEffect(() => {
    dispatchBrands(fetchBrands());
  }, [dispatchBrands]);

  const handleBrand = (brand: string) => {
    if (!brands) return;

    dispatch(setBrand(brand));
    dispatch(
      setModels(carType === "Passenger car" ? brands[brand] : modelList)
    );
  };

  return (
    <Card className="w-full h-full mx-auto bg-white border-none shadow-none">
      <CardHeader>
        <div className="flex items-center border rounded-md pl-2 h-10 w-full">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <InputField
            className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md text-muted-foreground"
            placeholder={dict?.brand || "Search a brand"}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </CardHeader>
      <CardContent
        className={`border shadow-md border-rounded w-full p-4 ${
          showSimplified ? "" : "column-container"
        }`}
      >
        {showSimplified
          ? Object.keys(sortedAndGroupedBrands)
              .sort()
              .slice(0, 6)
              .map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`simple-${brand}`}
                    name="brand"
                    checked={store?.brand === brand}
                    onChange={() => dispatch(setBrand(brand))}
                    className="mr-2"
                  />
                  <label htmlFor={`simple-${brand}`}>{brand}</label>
                </div>
              ))
          : sortedBrandsWithHeadings.map((group, index) => (
              <div key={index} className="break-inside-avoid mb-4">
                {group.map((brand, index) => (
                  <>
                    {!index ? (
                      <Label className="text-xl font-bold text-primary">
                        {group[0]}
                      </Label>
                    ) : (
                      <div key={brand} className="my-1">
                        <Checkbox
                          isRounded={true}
                          id={`brand-${brand}`}
                          name="brand"
                          checked={store?.brand === brand}
                          onClick={() => handleBrand(brand)}
                          className="mr-2"
                        />
                        <label htmlFor={`brand-${brand}`}>{brand}</label>
                      </div>
                    )}
                  </>
                ))}
              </div>
            ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={onPrevious}
          className="mt-4 bg-white text-primary border-primary"
        >
          {dict?.previous || "Previous"}
        </Button>
        <Button
          disabled={!store?.brand}
          onClick={() => onNext()}
          className="mt-4 bg-primary text-white disabled:opacity-50"
        >
          {dict?.continue || "Continue"}
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrandSelection;
