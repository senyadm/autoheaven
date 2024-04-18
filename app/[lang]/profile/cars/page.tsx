import React from "react";
import ProfileCars from "../../../../components/profile/cars/ProfileCars";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Your cars",
  description: "Your cars",
};

const page = () => {
  return <ProfileCars />;
};

export default page;
