import React from "react";
import ProfileOverview from "../../../components/profile/overview/ProfileOverview";
import { getlocales } from "../../actions";
import { Locale } from "@/i18n.config";

const page = async ({
  params: { lang }
}: {
  params: { lang: Locale };
}) => {
  const { overview } = await getlocales(lang);
  return <ProfileOverview overview={overview} />;
};

export default page;
