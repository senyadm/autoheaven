import { Metadata } from "next/types";
import ProfileMessages from "../../../../components/profile/messages/ProfileMessages";

export const metadata: Metadata = {
  title: "Profile Messages",
  description: "Profile messages",
};
const page = () => {
  return <ProfileMessages></ProfileMessages>;
};

export default page;
