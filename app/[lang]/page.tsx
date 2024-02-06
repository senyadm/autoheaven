import { getlocales } from "@/app/actions";
import { Locale, defaultLocale } from "@/i18n.config";
import { FiltersDictionary, PageData, TipsBlockDictionary } from "@/types";
import { useEffect, useState } from "react";
import BrandsBlock from "../../components/landing/BrandsBlock";
import Carousel from "../../components/landing/Carousel";
import FilterComponent from "../../components/landing/Filters";
import TipsBlock from "../../components/landing/TipsBlock";

const Home = async ({ params }: { params: { lang: Locale } }) => {
  const lang = params.lang ?? defaultLocale;

  const { dict, tipsBlock, brands, carousel } = await getlocales(lang);

  return (
    <main className="body-container flex flex-col items-center bg-topography-light relative">
      <Carousel lang={lang} menu={carousel} />
      <FilterComponent lang={lang} dict={dict} className="mt-[19.5rem] z-10" />
      <TipsBlock tipsBlock={tipsBlock} />
      <BrandsBlock popularBrands={brands} />
    </main>
  );
};

export default Home;
