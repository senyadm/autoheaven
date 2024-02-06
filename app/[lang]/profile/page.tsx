import React from "react";
import ProfileOverview from "../../../components/profile/overview/ProfileOverview";
import { getlocales } from "../../actions";

const page = async ({
  params: { lang },
  children,
}: {
  params: { lang: Locale };
}) => {
  const { overview } = await getlocales(lang);
  return <ProfileOverview overview={overview} />;
};

export default page;
