import { Metadata } from "next/types";
import ProfileSettings from "../../../../components/profile/settings/ProfileSettings";
import { getlocales } from "../../../actions";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Profile Settings",
};

const page = async ({ params }) => {
  console.log("🚀 ~ page ~ params:", params);
  const { profile } = await getlocales(params.lang);
  return <ProfileSettings lang={params.lang} dict={profile} />;
};

export default page;
