import { Navbar } from "../../components/shared/header/Navbar";
import Body from "../../components/landing/Body";
import Footer from "@/components/Footer";
import { Locale, defaultLocale } from "@/i18n.config";

export default function Home({ params }: { params: { lang: Locale } }) {
  return <Body lang={params.lang ?? defaultLocale} />;
}
