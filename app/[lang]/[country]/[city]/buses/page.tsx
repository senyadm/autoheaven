import React from "react";
import BrowseVehicle from "../../../../../src/app-pages/browse-vehicles/ui/BrowseVehicle";
import { VehicleType } from "../../../../../src/shared/model/params";

const page = (pageProps) => {
  return <BrowseVehicle {...pageProps} vehicleType={VehicleType.Bus} />;
};

export default page;
