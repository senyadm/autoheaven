import { getlocales } from "@/app/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n.config";
import Link from "next/link";
import SocialMediaIcons from "./SocialMediaIcons";
import SvgIcon from "./SvgIcon";

const Footer = async ({ lang }: { lang: Locale }) => {
  const { footer } = await getlocales(lang);
  return (
    <footer className=" py-10 bg-secondary">
      <div className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto px-4 lg:px-0">
        <div className="flex items-start flex-col">
          <SvgIcon
            filepath="/autoheven_logo.svg"
            width={132}
            height={61}
            alt=""
            className="mb-9"
          ></SvgIcon>

          <SocialMediaIcons />
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <strong>{footer?.company}</strong>
          </div>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footer?.aboutUs}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footer?.careers}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footer?.advertising}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footer?.helpContact}
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <strong>{footer?.information}</strong>
          </div>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footer?.termsConditions}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footer?.priceList}
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={`/${lang}`}
          >
            {footer?.privacyPolicy}
          </Link>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="English" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Lang 1">Czech</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </footer>
  );
};

export default Footer;
