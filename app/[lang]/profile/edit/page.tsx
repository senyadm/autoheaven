"use client";
import React from "react";
import { Locale } from "../../../../i18n.config";
import ProfileEdit from "../../../../components/profile/edit/ProfileEdit";

const page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  return <ProfileEdit lang={lang} />;
};

export default page;
