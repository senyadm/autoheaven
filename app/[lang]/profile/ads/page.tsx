import React from "react";
import ProfileAds from "../../../../components/profile/ads/ProfileAds";
import { Locale, defaultLocale } from "@/i18n.config";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Liked Ads",
  description: "Liked ads",
};

const page = ({ params }: { params: { lang: Locale } }) => {
  const lang = params.lang ?? defaultLocale;

  return <ProfileAds lang={lang} />;
};

export default page;
