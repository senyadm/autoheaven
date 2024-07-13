"use client";

import { useState } from "react";
import { Slider } from "../../../widgets/listheaven/ui/Slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { SlidersHorizontal, Undo2 } from "lucide-react";
import LocaleLink from "../../../shared/ui/LocaleLink";
import { filterData } from "../../../features/search-vehicles";
import { CarSidebar } from "../../../widgets/car-filters";
import { VehicleType } from "../../../shared/model/params";
import { useWishlist } from "@/src/entities/user";
import { getPathnameFromParams } from "../../../shared/utils/params";

interface ListHeavenProps {
  filterData: filterData;
  carResults: any;
  params: AllParams;
}

const ListHeavenClient = ({
  filterData: { filtersText, vehicleUIData },
  carResults,
  params,
}: ListHeavenProps) => {
  const { lang, vehicleType } = params;
  const [wishlist, dispatch] = useWishlist(true);
  const allResults = [
    ...carResults.topVehicles.data,
    ...carResults.nonTopVehicles.data,
  ].filter((car) => !wishlist?.includes(car.id));
  const offerCount = allResults.length;
  const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <section className="min-h-[calc(100vh-64px)] w-full p-2 bg-black text-white ">
      <div className="flex flex-col max-w-[400px] h-full mx-auto">
        <div className="flex justify-between p-6">
          <LocaleLink
            href={getPathnameFromParams({
              ...params,
              vehicleType: null,
              make: null,
              model: null,
              model: null,
            })}
            lang={"en"}
          >
            <Undo2 width={16} height={16} />
          </LocaleLink>
          <p>{offerCount} offers found</p>
          <Popover
            open={filtersOpen}
            onOpenChange={() => setFiltersOpen(!filtersOpen)}
          >
            <PopoverTrigger className="bg-primary p-1 rounded-lg">
              <SlidersHorizontal width={16} height={16} />
            </PopoverTrigger>
            <PopoverContent className="p-0 mx-auto">
              <CarSidebar
                offerNumber={offerCount}
                pageText={filtersText}
                vehicleUIData={vehicleUIData}
                params={params}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Slider carResults={allResults} vehicleUIData={vehicleUIData} />
      </div>
    </section>
  );
};

export default ListHeavenClient;
