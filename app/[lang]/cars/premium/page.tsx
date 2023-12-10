import React, { useEffect } from 'react'
import Cars from '../page'
import { Locale, defaultLocale } from '@/i18n.config'

const page = ({
  params
}: {
  params: { lang: Locale }
}) => {

  return <Cars params={params} isPremium={true}/>
}

export default page