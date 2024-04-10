import React from "react";
import ProfileAds from "../../../../components/profile/ads/ProfileAds";
import { Locale, defaultLocale } from "@/i18n.config";

const page = ({ params }: { params: { lang: Locale } }) => {
  const lang = params.lang ?? defaultLocale;

  return <ProfileAds lang={lang}/>;
};

export default page;
