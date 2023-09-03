import Image from 'next/image'
import {Navbar} from '../components/Navbar'
import Footer from '@/components/Footer'
import BrandsBlock from '@/components/landing/BrandsBlock'
import TipsBlock from '@/components/landing/TipsBlock'



export default function Home() {
  return <main>
    <Navbar/>
    <TipsBlock/>
    <BrandsBlock/>
    <Footer/>
  </main>
}
