'use client'
import { Locale } from "@/src/app/i18n.config";
import Link from "next/link";
import SocialMediaIcons from "../../../../components/SocialMediaIcons";
import LanguageSelect from "../../../../components/shared/LanguageSelect";
import Logo from "@/public/img/logo/AutoHeaven.svg";
import { useAppSelector } from '@/app/GlobalRedux/store';
const Footer = ({ lang }: { lang: Locale }) => {
  const dict = useAppSelector((state) => state.pageData.dict);
  const footerDict = dict?.footer, profileDict = dict?.profile;

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
            href={'documents/tos.pdf'}
            target='_blank'
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
               href={'documents/privacy_policy.pdf'}
            target='_blank'
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
