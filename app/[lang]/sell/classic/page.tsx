import React, { useEffect, useState } from "react";

import { getlocales } from "@/app/actions";

import MultiStepForm from "../../../../components/sell/classicSteps/MultiStepForm";
import { fetchCars, getCars } from "../../../../src/shared/api/client";
import { access } from "fs";
import path from "path";
import { fetchVehicleUIData } from "../../../../src/entities/vehicle";

const vehicleAccessorNames = [
  "moto_type",
  "make_name",
  "make_name",
  "bus_type",
];
const dataStructure = {
  moto: {
    type: {
      accessor: "moto_type",
      name: "moto_type",
      path: "/api/moto_types/",
    },
    make: {
      accessor: "make_name",
      name: "make_name",
      path: "/api/moto_makes/",
    },
  },
  bus: {
    make: {
      accessor: "make_name",
      name: "make_name",
      path: "/api/bus_makes/",
    },
    type: {
      accessor: "bus_type",
      name: "bus_type",
      path: "/api/bus_types/",
    },
  },
};

async function getStaticVehicleData() {
  const fetchPaths = [
    dataStructure.moto.type.path,
    dataStructure.moto.make.path,
    dataStructure.bus.make.path,
    dataStructure.bus.type.path,
  ];
  const fetchPromises = fetchPaths.map((url) => getCars(url));
  const fetchResponse = await Promise.all(fetchPromises);
  const filteredResponse = {
    moto: {
      type: fetchResponse[0].map((item) => item.moto_type),
      make: fetchResponse[1].map((item) => item.make_name),
    },
    bus: {
      make: fetchResponse[2].map((item) => item.make_name),
      type: fetchResponse[3].map((item) => item.bus_type),
    },
  };
  dataStructure.moto.type.data = fetchResponse[0];
  dataStructure.moto.make.data = fetchResponse[1];
  dataStructure.bus.make.data = fetchResponse[2];
  dataStructure.bus.type.data = fetchResponse[3];
  return dataStructure;
}

const page = async ({ params, searchParams }) => {
  const sellText = (await getlocales(params.lang)).sell;
  const classicText = sellText.classic;

  return <MultiStepForm dict={classicText} />;
};

export default page;
