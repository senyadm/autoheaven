"use client";
import {
  FC,
  useState,
  useEffect,
  useRef,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";
import { Label } from "../../ui/label";
import CarSearchFilter from "./CarSearchFilter";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  HelpCircle,
  PlusCircle,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { FilterPayload } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import {
  types,
  typeProps,
  bodyTypes,
  Trucks,
  Busses,
} from "../../landing/types";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import CarBodyType from "../CarBodyType";
import ModelSelector from "./ModelSelector";
import { FiltersDictionary } from "@/types";
import { Checkbox } from "../../ui/checkbox";
import { Filter } from "../../../interfaces/cars/cars";
import { useRouter, useSearchParams } from "next/navigation";
import { getNormalizedParams } from "../../../utils/cars";
type CarSidebarProps = {
  offerNumber: number;
  pageText: FiltersDictionary;
  carModels: Record<string, string[]>;
};

const CarSidebar: FC<CarSidebarProps> = ({
  offerNumber,
  pageText,
  carModels,
}) => {
  // const [pageText, setMenu] = useState<FiltersDictionary | null>(null);
  // const searchParams = useSearchParams();
  // const paramFilters = getNormalizedParams(searchParams);
  // const dispatch = useAppDispatch();
  // const { replace } = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   console.log(lang);
  //   async function fetchData() {
  //     try {
  //       const { filters } = await getlocales(lang);
  //       setMenu(filters);
  //     } catch (error) {
  //       console.error("Error fetching tools data:", error);
  //     }
  //   }

  //   if (!pageText) {
  //     fetchData();
  //   }
  // }, [lang, pageText]);

  // const { isPremium, premiumThreshold } = usePremiumStatus();
  // const variablePriceMin = isPremium ? premiumThreshold : 1000;

  // const [offers, setOffers] = useState<number>(0);
  // const [filterBrands, setFilterBrands] = useState<brandsWithModelsData[]>([]);
  // const [filters, setFilters] = useState<Filter>(paramFilters);
  // const [maximumFilters, setMaximumFilters] = useState<boolean>(false);
  // const [exists, setExists] = useState<boolean>(false);
  // const [carBrands] = useAppStore(
  //   (state) => state?.carFiltersAndResults.brandsWithModels
  // );

  // useEffect(() => {
  //   if (!carBrands) return;
  //   Object.entries(carBrands).map(([key, value]) => {
  //     if (key === paramFilters?.make) {
  //       setFilterBrands((prev) => {
  //         const newBrands = [...prev];
  //         newBrands.push({
  //           brand: key,
  //           checkedAll: false,
  //           models: value.map((model) => ({
  //             name: model,
  //             checked: false,
  //           })),
  //         });
  //         return newBrands;
  //       });
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [carBrands]);

  // useEffect(() => {
  //   dispatch(fetchBrands());

  //   const tempFilters = { ...filters };
  //   tempFilters["brandAndModel"] =
  //     paramFilters?.make + " - " + paramFilters.model;
  //   tempFilters["type"] = paramFilters.type;
  //   tempFilters["vehicleBody"] = paramFilters.body_type || "";
  //   tempFilters["fuelType"] = paramFilters.fueltype || "";
  //   tempFilters["price"] = [
  //     paramFilters.price_min || 1000,
  //     paramFilters.price_max || 1000000,
  //   ];
  //   tempFilters["milage"] = [
  //     paramFilters.mileage_min || 0,
  //     paramFilters.mileage_max || 500000,
  //   ];
  //   tempFilters["year"] = [paramFilters.min_year, paramFilters.max_year];
  //   tempFilters["accidentFree"] = paramFilters.accidentfree || false;
  //   tempFilters["sortBy"] = paramFilters.sortBy || "newestFirst";
  //   console.log(tempFilters);
  //   setFilters(tempFilters);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [paramFilters]);

  // const handleOfferNumbers = (offerNumber: number) => {
  //   setOffers(offerNumber);
  // };
  // const handleSliderChange = (id: string, values: [number, number]) => {
  //   setFilters((prev) => ({ ...prev, [id]: values }));
  // };

  // const handleSelectorChange = (id: string, selectorValue: string) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [id]: selectorValue,
  //   }));
  // };
  // const handleBrandCheckboxChange = (brand: brandsWithModelsData) => {
  //   const updatedBrands = filterBrands.map((b) => {
  //     if (b.brand === brand.brand) {
  //       return {
  //         ...b,
  //         checkedAll: !b.checkedAll,
  //         models: b.models.map((m) => ({ ...m, checked: !b.checkedAll })),
  //       };
  //     }
  //     return b;
  //   });
  //   setFilterBrands(updatedBrands);
  // };

  // const handleModelCheckboxChange = (
  //   brand: brandsWithModelsData,
  //   model: modelType
  // ) => {
  //   const updatedBrands = filterBrands.map((b) => {
  //     if (b.brand === brand.brand) {
  //       const updatedModels = b.models.map((m) => {
  //         if (m.name === model.name) {
  //           return { ...m, checked: !m.checked };
  //         }
  //         return m;
  //       });
  //       const areAllModelsChecked = updatedModels.every((m) => m.checked);
  //       return { ...b, models: updatedModels, checkedAll: areAllModelsChecked };
  //     }
  //     return b;
  //   });
  //   setFilterBrands(updatedBrands);
  // };

  // useEffect(() => {
  //   if (exists) {
  //     setTimeout(() => {
  //       setExists(false);
  //     }, 3000);
  //   }
  // }, [exists]);

  // useEffect(() => {
  //   if (maximumFilters) {
  //     setTimeout(() => {
  //       setMaximumFilters(false);
  //     }, 3000);
  //   }
  // }, [maximumFilters]);

  // // const [payloadFilters, setPayloadFilters] = useState<string>("");
  // useEffect(() => {
  //   let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  //   const sendRequest = () => {
  // const splitData = filters.brandAndModel?.split(" - ") || [];
  // console.log("🚀 ~ sendRequest ~ filters:", filters);
  // const make = splitData[0];
  // const model = splitData[1];
  //     const payloadFilter = {
  //       from_dealer: filters.fromDealer || false,
  //       max_results: 100000,
  //       body_type: filters.vehicleBody || "",
  //       make: "",
  //       model: "",
  //       fueltype: filters.fuelType || "",
  //       price_min: filters.price[0] || variablePriceMin,
  //       price_max: filters.price[1] || 1000000,
  //       mileage_min: filters.milage[0] || 0,
  //       mileage_max: filters.milage[1] || 500000,
  //       min_year: filters.year[0] || 1975,
  //       max_year: filters.year[1] || 2023,
  //       accident_free: filters.accidentFree || false,
  //       sortBy: filters.sortBy || "newestFirst",
  //     };
  //     const newSearchParams = new URLSearchParams(payloadFilter);
  //     console.log("🚀 ~ sendRequest ~ newSearchParams:", newSearchParams);
  //     replace(`${pathname}?${newSearchParams.toString()}`);
  // const queryParam = Object.keys(payloadFilter)
  //   .map(
  //     (key) =>
  //       `${key}=${encodeURIComponent((payloadFilter as any)[key] || "")}`
  //   )
  //   .join("&");
  // setPayloadFilters(queryParam);
  // dispatch(fetchAllCars(payloadFilter));
  //   };

  //   if (filters) {
  //     clearTimeout(debounceTimer);
  //     debounceTimer = setTimeout(sendRequest, 1000);
  //   }

  //   return () => {
  //     clearTimeout(debounceTimer);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filters, filterBrands]);

  // const [currentModels, setCurrentModels] = useState<number>(10);
  // const showMore = () => {
  //   setCurrentModels((prev) => prev + 10);
  // };
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const paramFilters = getNormalizedParams(
    Object.fromEntries(searchParams.entries()) as Filter
  );
  const [filters, setFilters] = useState<Filter>(paramFilters);
  console.log("🚀 ~ filters:", filters);
  const setFiltersAndRedirect = (newFilters: Filter) => {
    setFilters(newFilters);
    const normalizedFilters = getNormalizedParams(newFilters);
    normalizedFilters.makeModels = ["M5", "M6"];
    const newURLParams = new URLSearchParams(normalizedFilters);
    console.log("🚀 ~ setFiltersAndRedirect ~ newURLParams:", newURLParams);
    replace(`cars?${newURLParams.toString()}`);
  };
  const handleSliderChange = (
    ids: [string, string],
    values: [number, number]
  ) => {
    const newFilters = { ...filters, [ids[0]]: values[0], [ids[1]]: values[1] };
    setFiltersAndRedirect(newFilters as Filter);
  };

  const handleSelectorChange = (id: keyof Filter, selectorValue: string) => {
    const newFilters = { ...filters, [id]: selectorValue };
    setFiltersAndRedirect(newFilters as Filter);
  };
  const handleCheckboxToggle = (id: keyof Filter) => {
    const newFilters = { ...filters, [id]: !filters[id] };
    setFiltersAndRedirect(newFilters as Filter);
  };
  // TODO: change so that URL can look like
  // https://www.aaaauto.eu/used-cars#makes=15-75&models-15=1437-2128-2214&models-75=33
  const addModel = (make: string, model: string) => {
    const currentModels = filters.makeModels?.[make] || [];
    currentModels.push(model);
    const newFilters = {
      ...filters,
      makeModels: {
        [make]: currentModels,
      },
    };
    setFiltersAndRedirect(newFilters as Filter);
  };
  // useEffect(() => {
  //   // rerender when filters change
  //   const newURLParams = new URLSearchParams(getNormalizedParams(filters));
  //   console.log("🚀 ~ useEffect ~ filters", filters);
  //   console.log("🚀 ~ newURLParams:", newURLParams.toString());
  //   const newURLStr = newURLParams.toString();
  //   const currentURLStr = new URLSearchParams(searchParams).toString();
  //   if (currentURLStr !== newURLStr) {
  //     console.log("🚀 ~ useEffect ~ newURLStr:", newURLStr);
  //     console.log("🚀 ~ useEffect ~ currentURLStr:", currentURLStr);
  //     // replace(`cars?${newURLStr}`);
  //     //   if (newURLStr !== currentURLStr) {
  //     //     replace(`cars?${newURLStr}`);
  //     //   }
  //     // }
  //     // replace(newURLParams.toString());
  //   }
  // }, [filters, paramFilters, replace, searchParams]);
  return (
    <div className="flex flex-col space-y-4 w-full p-4 px-6 bg-primary-foreground border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      <Label htmlFor="filter1" className="font-bold">
        Type
      </Label>
      <Select
        onValueChange={(selectorValue) =>
          handleSelectorChange("type", selectorValue)
        }
      >
        <SelectTrigger className="mb-2" currentValue={filters.type}>
          Choose Type
        </SelectTrigger>
        <SelectContent>
          {types.map((item: typeProps, index: number) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CarBodyType
        vehicleType={filters.type}
        currentVehicleBody={filters.body_type}
        handleSelectorChange={handleSelectorChange}
      />

      <CarSearchFilter
        dict={pageText}
        filters={filters}
        handleSliderChange={handleSliderChange}
      />

      <Separator />

      <div className="flex items-center justify-between">
        <div className="relative">
          <Label className="text-l font-semibold flex flex-row">
            {pageText?.fromDealer || "From Dealer"}
            <div className="group inline-block ml-2 relative">
              <HelpCircle
                width={16}
                height={16}
                className="hover:cursor-pointer"
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs px-2 py-1 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity  w-48 break-words">
                This is some info about the From Dealer option.
              </span>
            </div>
          </Label>
        </div>

        <Checkbox
          className="mr-2"
          checked={filters.fromDealer}
          onCheckedChange={(e) => handleCheckboxToggle("fromDealer")}
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="relative">
          <Label className="text-l font-semibold flex flex-row">
            {pageText?.accidentFree || "Accident Free"}
            <div className="group inline-block ml-2 relative">
              <HelpCircle
                width={16}
                height={16}
                className="hover:cursor-pointer"
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs px-2 py-1 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity  w-48 break-words">
                This is some info about the Accident free option.
              </span>
            </div>
          </Label>
        </div>

        <Checkbox
          className="mr-2"
          checked={filters.accidentfree}
          onCheckedChange={(e) => handleCheckboxToggle("accidentfree")}
        />
      </div>

      <Separator />

      <ModelSelector
        pageText={pageText}
        carModels={carModels}
        addModel={addModel}
        offerNumber={offerNumber}
      />
    </div>
  );
};

export default CarSidebar;
