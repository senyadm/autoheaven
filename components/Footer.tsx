import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SocialMediaIcons from './SocialMediaIcons'
import SvgIcon from './SvgIcon'
import { Locale } from '@/i18n.config'
import { getlocales } from '@/app/actions'

const Footer = async ({ lang }: { lang: Locale }) => {

  const { footer } = await getlocales(lang)
  return (
    <footer className=' py-10 bg-secondary'>
      <div className='flex justify-between max-w-[1140px] mx-auto'>
 <div>
            <SvgIcon filepath='/autoheven_logo.svg' width={132} height={61} alt='' className="mb-9"></SvgIcon>
            <SocialMediaIcons />
        </div>
        <div className='flex flex-col'>
            <div><strong>{footer?.company}</strong></div>
            <Link href={`/${lang}`}>{footer?.aboutUs}</Link>
            <Link href={`/${lang}`}>{footer?.careers}</Link>
            <Link href={`/${lang}`}>{footer?.advertising}</Link>
            <Link href={`/${lang}`}>{footer?.helpContact}</Link>
        </div>
         <div className='flex flex-col'>
            <div><strong>{footer?.information}</strong></div>
            <Link href={`/${lang}`}>{footer?.termsConditions}</Link>
            <Link href={`/${lang}`}>{footer?.priceList}</Link>
            <Link href={`/${lang}`}>{footer?.privacyPolicy}</Link>
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
  )
}

export default Footer