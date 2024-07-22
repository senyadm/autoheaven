import React, {  } from "react";

import { getlocales } from "@/app/actions";

import MultiStepForm from "../../../../components/sell/classicSteps/MultiStepForm";



const page = async ({ params, searchParams }) => {
  const sellText = (await getlocales(params.lang)).sell;
  const classicText = sellText.classic;

  return <MultiStepForm dict={classicText} />;
};

export default page;
