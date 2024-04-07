import ProfileSettings from "../../../../components/profile/settings/ProfileSettings";
import { getlocales } from "../../../actions";

const page = async ({ params }) => {
  console.log("🚀 ~ page ~ params:", params);
  const { profile } = await getlocales(params.lang);
  return <ProfileSettings lang={params.lang} dict={profile} />;
};

export default page;
