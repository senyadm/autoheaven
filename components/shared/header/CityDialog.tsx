// CitySelectDialog.js
import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface CitySelectDialogProps {
    cities: string[];
    onCitySelect: (city: string) => void;
    onClose: () => void;
  }

const CitySelectDialog = ({ cities, onCitySelect, onClose }: CitySelectDialogProps) => {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogTitle>Choose a City</DialogTitle>
        <div className="grid grid-cols-2 gap-4">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => { onCitySelect(city); onClose(); }}
              className="p-2 border rounded hover:bg-gray-100"
            >
              {city}
            </button>
          ))}
        </div>
        <Button
          onClick={onClose}
          variant="outline"
          className="mt-4"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
