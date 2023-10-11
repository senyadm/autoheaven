import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "../ui/button";

const AppDropdownMenu = ({ options }) => {
  const [position, setPosition] = React.useState(options[0]);

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
