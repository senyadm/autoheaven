import React from "react";
import {
  fetchCarById,
  fetchVehicleUIData,
} from "../../../../../../src/entities/vehicle";
import { Locale } from "../../../../../../src/app/i18n.config";
import { getlocales } from "../../../../../actions";
import { VehicleType } from "../../../../../../src/entities/filters";
import MultiStepForm from "../../../../../../components/sell/classicSteps/MultiStepForm";
import VehicleSetter from "../../../../../../src/features/edit-vehicle/ui/VehicleSetter";

interface PageParans {
  params: {
    productId: number;
    lang: Locale;
  };
}

const page = async ({ params }: PageParans) => {
  const car = await fetchCarById(params.productId);
  console.log("🚀 ~ page ~ car:", car);

  const sellText = (await getlocales(params.lang)).sell;
  const classicText = sellText.classic;
  const staticVehicleData = fetchVehicleUIData(VehicleType.Car);

  return (
    <VehicleSetter car={car}>
      <MultiStepForm
        dict={classicText}
        staticVehicleData={staticVehicleData}
        action="edit"
      />
    </VehicleSetter>
  );
};

export default page;
