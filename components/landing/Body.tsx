'use client'


import { Locale } from "@/i18n.config";
import BrandsBlock from "./BrandsBlock";
import Carousel from "./Carousel";
import FilterComponent from "./Filters";
import TipsBlock from "./TipsBlock";
import { useEffect, useState } from "react";
import { getlocales } from "@/app/actions";
import { FiltersDictionary, TipsBlockDictionary } from "@/types";
function Body({ lang }: { lang: Locale }) {
    const [dict, setDict] = useState<FiltersDictionary | null>(null)
    const [tipsBlock, setTipsBlock] = useState<TipsBlockDictionary | null>(null)
    const [brands, setBrands] = useState('');

    useEffect(() => {
      async function fetchData() {
        try {
          const { filters, tipsBlock, popularBrands } = await getlocales(lang)
          setBrands(popularBrands)
          setDict(filters)
          setTipsBlock(tipsBlock)
        } catch (error) {
          console.error('Error fetching tools data:', error)
        }
      }
  
      if (!dict) {
        fetchData()
      }
    }, [lang, dict])
    
    return (
        <main className="body-container flex flex-col items-center bg-topography-light relative">
        <Carousel lang={lang}/>
        <FilterComponent dict={dict} className="mt-[19.5rem] z-10" />
        <TipsBlock tipsBlock={tipsBlock}/>
        <BrandsBlock popularBrands={brands}/>
    </main>
    );
}

export default Body;