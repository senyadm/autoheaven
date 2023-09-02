import Image from 'next/image'
import { Navbar } from '../components/Navbar'
import Body from '../components/landing/Body'
import Footer from '@/components/Footer'
import BrandsBlock from '@/components/landing/BrandsBlock'
import TipsBlock from '@/components/landing/TipsBlock'
import FilterComponent from '@/components/landing/Filters'


export default function Home() {
  return <div>
    <Navbar />
    <Body />
    <BrandsBlock />
    <Footer />

  </div>
}
