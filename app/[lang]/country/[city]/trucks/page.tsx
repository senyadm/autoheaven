import React from "react";
import BrowseVehicle from "../../../../../src/app-pages/browse-vehicles/ui/BrowseVehicles";
import { VehicleType } from "../../../../../src/shared/model/params";

const page = (pageProps) => {
  return <BrowseVehicle {...pageProps} vehicleType={VehicleType.Truck} />;
};

export default page;
