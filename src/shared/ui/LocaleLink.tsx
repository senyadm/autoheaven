import Link from "next/link";
import React from "react";

const LocaleLink = ({ lang, children, href }) => {
  return <Link href={`/${lang}/${href}`}>{children}</Link>;
};

export default LocaleLink;
