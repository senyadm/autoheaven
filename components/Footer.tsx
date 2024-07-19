"use client";
import { getlocales } from "@/app/actions";

import { Locale } from "@/src/app/i18n.config";
import Link from "next/link";
import SocialMediaIcons from "./SocialMediaIcons";
import LanguageSelect from "./shared/LanguageSelect";
import { useEffect, useState } from "react";
import Logo from "@/public/img/logo/AutoHeaven.svg";
const Footer = ({ lang }: { lang: Locale }) => {
const [footerDict, setFooterDict] = useState<any>(null);
const [profileDict, setProfileDict] = useState<any>(null);

  useEffect(() => {
    const getLocalesFunc = async () => {
      const { footer, profile } = await getlocales(lang);

      setProfileDict(profile);
      setFooterDict(footer);
    }
    
    getLocalesFunc();
  }, [lang])

  return (
    <footer className=" py-10 bg-secondary">
      <div className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto px-4 lg:px-0">
        <div className="flex items-start flex-col">
          <Logo
            width={132}
            height={61}
            alt=""
            className="mb-9" />

          <SocialMediaIcons />
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <strong>{footerDict?.company}</strong>
          </div>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footerDict?.aboutUs}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footerDict?.careers}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footerDict?.advertising}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footerDict?.helpContact}
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <strong>{footerDict?.information}</strong>
          </div>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footerDict?.termsConditions}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footerDict?.priceList}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footerDict?.privacyPolicy}
          </Link>
        </div>
        <LanguageSelect langStr={profileDict?.language} currentLang={lang} />
      </div>
    </footer>
  );
};

export default Footer;
