// CitySelectDialog.js
import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface CitySelectDialogProps {
    cities: string[];
    onCitySelect: (city: string) => void;
    onClose: () => void;
  }

const CitySelectDialog = ({ regionModalOpen, onCitySelect, onClose }: CitySelectDialogProps) => {
  return (
    <Dialog open={regionModalOpen}>
    <DialogTrigger asChild>
      <Button
        onClick={toggleRegionModal}
        variant="outline"
        size="icon"
        className="w-full p-2 items-center space-x-3 border-none shadow-none"
      >
        <MapPin width={16} height={16} />
        <Label className="text-foreground text-l">
          {location.city}
        </Label>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Choose a Country</DialogTitle>
      <div className="grid grid-cols-2 gap-4">
        {euCountries.map((country) => (
          <button
            key={country.code}
            onClick={() => setSelectedCountry(country.name)}
            className="p-2 border rounded hover:bg-gray-100"
          >
            {country.name}
          </button>
        ))}
      </div>
    </DialogContent>
  </Dialog>
  );
}
