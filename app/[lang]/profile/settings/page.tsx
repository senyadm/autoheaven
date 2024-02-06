import React from "react";
import ProfileSettings from "../../../../components/profile/settings/ProfileSettings";

const page = (params: { lang }) => {
  return <ProfileSettings lang={params.lang} />;
};

export default page;
