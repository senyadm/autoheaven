import Link from 'next/link'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SocialMediaIcons from './SocialMediaIcons'
import SvgIcon from './SvgIcon'

const Footer = () => {
  return (
    <footer className='flex justify-around py-10 bg-secondary'>
        <div>
            <SvgIcon filepath='autoheven_logo.svg' width={188} height={87} alt='' className="mb-9"></SvgIcon>
            <SocialMediaIcons />
        </div>
        <div className='flex flex-col'>
            <div><strong>Company</strong></div>
            <Link href=''>About us</Link>
            <Link href=''>Careers</Link>
            <Link href=''>Advertising</Link>
            <Link href=''>Help & Contact</Link>
        </div>
         <div className='flex flex-col'>
            <div><strong>Information</strong></div>
            <Link href=''>Terms and Conditions</Link>
            <Link href=''>Price List</Link>
            <Link href=''>Privacy Policy</Link>
        </div>
        <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="English" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="English">English</SelectItem>
    <SelectItem value="Lang 1">Lang 1</SelectItem>
    <SelectItem value="Lang 2">Lang 2</SelectItem>
  </SelectContent>
</Select>
    </footer>
  )
}

export default Footer