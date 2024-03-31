import React, { useEffect } from "react";
import Cars from "../page";
import { Locale, defaultLocale } from "@/i18n.config";
import { Metadata } from "next/types";
// export const metadata: Metadata = {
//   title: "AutoHeaven - Premium Cars",
//   description:
//     "Discover our curated selection of luxury cars, featuring exquisite craftsmanship, cutting-edge technology, and unparalleled performance.",
// };
const page = ({ params }: { params: { lang: Locale } }) => {
  return <Cars params={params} isPremium={true} />;
};

export default page;
