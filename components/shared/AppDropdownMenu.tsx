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

const AppDropdownMenu = ({ options }) => {
  const [position, setPosition] = useState(options[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-background">
        <Button variant="outline">{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
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
