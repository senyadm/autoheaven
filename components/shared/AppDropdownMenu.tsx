import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export type SortValue =
  | "newestFirst"
  | "oldestFirst"
  | "priceHighestFirst"
  | "priceLowestFirst"
  | "mileageHighestFirst"
  | "mileageLowestFirst";

const sortingMenuDisplayMap: Record<string, SortValue> = {
  "Listing (Newest first)": "newestFirst",
  "Listing (Oldest first)": "oldestFirst",
  "Price (Highest first)": "priceHighestFirst",
  "Price (Lowest first)": "priceLowestFirst",
  "Mileage (Highest first)": "mileageHighestFirst",
  "Mileage (Lowest first)": "mileageLowestFirst",
};

type AppDropdownMenuProps = {
  sort: SortValue;
  setSort: (value: SortValue) => void;
};

const AppCarDropdown = ({ sort, setSort }: AppDropdownMenuProps) => {
  const [position, setPosition] = useState<SortValue>(sort); // default to "newestFirst" or another value if you wish

  const handleChange = (displayValue: string) => {
    const sortValue = Object.keys(sortingMenuDisplayMap).find(
      (key) => sortingMenuDisplayMap[key] === displayValue
    );
    if (sortValue) {
      setPosition(sortingMenuDisplayMap[sortValue]);
      setSort(sortingMenuDisplayMap[sortValue]);
    } else {
      console.error(`Invalid sort value: ${displayValue}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-background">
        <Button variant="outline">
          {Object.keys(sortingMenuDisplayMap).find(
            (key) => sortingMenuDisplayMap[key] === position
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleChange as any}
        >
          {Object.entries(sortingMenuDisplayMap).map(([display, value]) => (
            <DropdownMenuRadioItem value={value} key={value}>
              {display}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppCarDropdown;
