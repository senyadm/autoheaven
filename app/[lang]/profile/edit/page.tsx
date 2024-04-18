import { Locale } from "../../../../i18n.config";
import ProfileEdit from "../../../../components/profile/edit/ProfileEdit";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Edit Your Profile",
  description: "Edit Your Profile",
};

const page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  return <ProfileEdit lang={lang} />;
};

export default page;
