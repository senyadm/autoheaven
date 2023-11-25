import { usePathname } from 'next/navigation';
import React from 'react'
const premiumThreshold = 250_000
const usePremiumStatus = () => {
    const pathname = usePathname();
    let isPremium = false;
    if(pathname==='/cars/premium'){
        isPremium = true;
    }
   return {
    isPremium: isPremium,
    premiumThreshold
   }
}

export default usePremiumStatus