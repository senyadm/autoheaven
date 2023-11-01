"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";

type AppDropdownMenuProps = {
  options: string[];
  setSort: (value: string) => void;
};

const AppDropdownMenu = ({ options, setSort }: AppDropdownMenuProps) => {
  const [position, setPosition] = useState(options[0]);
  const handleChange = (value: string) => {
    setPosition(value);
    setSort(value);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-background">
        <Button variant="outline">{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
          {options.map((option: string) => (
            <DropdownMenuRadioItem value={option} key={option}>
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppDropdownMenu;
