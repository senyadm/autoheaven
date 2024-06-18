import React from "react";
import BrowseVehicle from "../../../../../src/app-pages/browse-vehicles/ui/BrowseVehicle";
import { VehicleType } from "../../../../../src/shared/model/params";
import { Metadata, ResolvingMetadata } from "next/types";
import { getLocationText } from "../../../../../src/entities/location";

type Props = {
  params: { country: string; city: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { country, city } = params;
  const text = getLocationText(country, city);
  return {
    title: `Car offers in ${text}`,
    description: `Find the best car offers in ${text}`,
  };
}

const page = (pageProps) => {
  return <BrowseVehicle {...pageProps} vehicleType={VehicleType.Car} />;
};

export default page;
