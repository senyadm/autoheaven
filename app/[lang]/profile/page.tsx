import React from "react";
import ProfileOverview from "../../../components/profile/overview/ProfileOverview";
import { getlocales } from "../../actions";
import { Metadata } from "next";
import { Locale } from '@/src/app/i18n.config';
import { staticParams } from '@/src/app/static-params';

export const metadata: Metadata = {
  title: "Profile Overview",
  description: "Profile Overview",
};

// requries auth
// export function generateStaticParams() {
//   return staticParams.default;
// }

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { overview } = await getlocales(lang);
  return <ProfileOverview overview={overview} />;
};

export default page;
