import React, {  } from "react";

import { getlocales } from "@/app/actions";

import MultiStepForm from "../../../../components/sell/classicSteps/MultiStepForm";
import { staticParams } from '@/src/app/static-params';
import { Metadata } from 'next';

export function generateStaticParams() {
  return staticParams.default;
}

export const metadata: Metadata = {
  title: "Sell your car on AutoHeaven by placing an ad listing",
  description: "Sell your car on AutoHeaven and get the best price",
};

const page = async ({ params, searchParams }) => {
  const sellText = (await getlocales(params.lang)).sell;
  const classicText = sellText.classic;

  return <MultiStepForm dict={classicText} />;
};

export default page;
